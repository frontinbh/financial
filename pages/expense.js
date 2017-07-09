import Link from 'next/link'
import Modal from 'react-modal'

import Helpers from '../utils/string'
import Head from '../components/head'
import Nav from '../components/nav'
import Chart from '../components/dashboard/chart'
import 'whatwg-fetch'

export default class Dashboard extends React.Component {
  state = { expenses: [], formValues: [] }

  componentDidMount() {
    this.getRevenues()
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })
  
  handleChangeForm = (category, key, event) => this.setState({ [key]: event.target.value })

  getRevenues = () => {
    fetch('/api/forecast/expenses').then(response => {
      return response.json()
    }).then(expenses => {
      this.setState({ expenses })
    })
  }

  addCategory = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    
    fetch('/api/forecast/categories-expenses', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: this.state.newCategory })
    }).then(res => {
      return res.json()
    }).then(body => {
      if (body.status) {
        this.getRevenues()
        setTimeout(() => {
          this.setState({ categoryModal: false, loading: false })
        }, 900);
      } else {
        alert('Erro, verifique se não existe essa categoria')
      }
    })
  }

  insertItens = (category) => {
    const data = {
      category,
      value: {
        name: this.state[`${category}-new-input-name`],
        quantity: this.state[`${category}-new-input-quantity`],
        pricing: this.state[`${category}-new-input-pricing`],
        expenses: (parseInt(this.state[`${category}-new-input-quantity`], 10) * parseInt(this.state[`${category}-new-input-pricing`], 10)),
        revenue: this.state[`${category}-new-input-revenue`] || 0
      }
    }

    fetch('/api/forecast/expenses', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      return res.json()
    }).then(body => {
      if (body.status) {
        this.getRevenues()
      } else {
        alert('Erro, tente novamente')
      }
    })
  }

  renderAddCategory = (expense) => (
    this.setState({ categoryModal: true, categoryId: expense })
  )

  renderInputs = (expense, item) => {
    const key = `${expense.id}-${item.id}`
    return (
      <div key={item.name}>
        <label htmlFor={`${key}-name`}>
          nome iten
          <input
            type="text"
            id={`${key}-name`}
            name={`${key}-name`}
            defaultValue={item.name}
            value={this.state[`${key}-name`]}
            onChange={this.handleChangeForm.bind(this, expense.id, `${key}-name`)}
          />
        </label>
        <label htmlFor={`${key}-quantity`}>
          quantidade
          <input
            type="number"
            id={`${key}-quantity`}
            name={`${key}-quantity`}
            defaultValue={item.quantity}
            value={this.state[`${key}-quantity`]}
            onChange={this.handleChangeForm.bind(this, expense.id, `${key}-quantity`)}
          />
        </label>
        <label htmlFor={`${key}-pricing`}>
          preço unitario
          <input
            type="number"
            id={`${key}-pricing`}
            name={`${key}-pricing`}
            defaultValue={item.pricing}
            value={this.state[`${key}-pricing`]}
            onChange={this.handleChangeForm.bind(this, expense.id, `${key}-pricing`)}
          />
        </label>
        <label htmlFor={`${key}-expenses`}>
          valor previsto
          <input
            type="number"
            id={`${key}-expenses`}
            name={`${key}-expenses`}
            value={(parseInt(item.quantity) * parseInt(item.pricing))}
            onChange={this.handleChangeForm.bind(this, expense.id, `${key}-expenses`)}
            disabled={true}
          />
        </label>
        <label htmlFor={`${key}-revenue`}>
          valor total
          <input
            type="number"
            id={`${key}-revenue`}
            name={`${key}-revenue`}
            defaultValue={item.revenue}
            value={this.state[`${key}-revenue`]}
            onChange={this.handleChangeForm.bind(this, expense.id, `${key}-revenue`)}
          />
        </label>
      </div>
    )
  }
  
  renderNewInputs = (expense) => {
    const key = `${expense.id}-new-input`
    return (
      <div key={key}>
        <label htmlFor={`${key}-name`}>
          name
          <input
            type="text"
            id={`${key}-name`}
            name={`${key}-name`}
            defaultValue=""
            value={this.state[`${key}-name`]}
            onChange={this.handleChangeForm.bind(this, expense.id, `${key}-name`)}
          />
        </label>
        <label htmlFor={`${key}-quantity`}>
          quantity
          <input
            type="number"
            id={`${key}-quantity`}
            name={`${key}-quantity`}
            defaultValue=""
            value={this.state[`${key}-quantity`]}
            onChange={this.handleChangeForm.bind(this, expense.id, `${key}-quantity`)}
          />
        </label>
        <label htmlFor={`${key}-pricing`}>
          pricing
          <input
            type="number"
            id={`${key}-pricing`}
            name={`${key}-pricing`}
            defaultValue=""
            value={this.state[`${key}-pricing`]}
            onChange={this.handleChangeForm.bind(this, expense.id, `${key}-pricing`)}
          />
        </label>
        <label htmlFor={`${key}-expenses`}>
          expenses
          <input
            type="number"
            id={`${key}-expenses`}
            name={`${key}-expenses`}
            value={(parseInt(this.state[`${key}-quantity`]) * parseInt(this.state[`${key}-pricing`]))}
            onChange={this.handleChangeForm.bind(this, expense.id, `${key}-expenses`)}
            disabled={true}
          />
        </label>
        <label htmlFor={`${key}-revenue`}>
          revenue
          <input
            type="number"
            id={`${key}-revenue`}
            name={`${key}-revenue`}
            defaultValue=""
            value={this.state[`${key}-revenue`]}
            onChange={this.handleChangeForm.bind(this, expense.id, `${key}-revenue`)}
          />
        </label>
        <button onClick={() => { this.insertItens(expense.id) }}>isert values</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Head title="Dasboard" />
        <Nav />

        <div className="hero">
          <h1 className="title">Despesas</h1>

          {
            this.state.categoryModal &&
              <Modal
                isOpen
                onRequestClose={() => this.setState({ categoryModal: false })}
                contentLabel="Modal"
              >
                <h2>Nova Categoria</h2>
                <form id="add-category-form">
                  {
                    !this.state.loading &&
                      <div>
                        <input
                          type="text" 
                          placeholder="Ex: Consumo" 
                          name="newCategory" 
                          value={this.state.newCategory}
                          onChange={this.handleChange} 
                        />
                        <button onClick={(e) => this.addCategory(e)}>adicionar</button>
                      </div>
                  }
                  {
                    this.state.loading &&
                      <h1>Enserindo nova categoria</h1>
                  }
                </form>
              </Modal>
          }

          <div className="row">
            {
              this.state.expenses.map(expense => {
                return (
                  <div key={expense.category}>
                    <h3>{expense.category}</h3>
                    {expense.itens.map(item => this.renderInputs(expense, item))}
                    <br />
                    {this.renderNewInputs(expense)}

                    <br /><br />
                    <div>
                      <p>Total Previsto: {expense.total_revenue}</p>
                      <p>Total Previsto: {expense.total_expenses}</p>
                    </div>
                  </div>
                )
              })
            }
            <button onClick={() => this.renderAddCategory()}>adicionar categoria</button>
          </div>

        </div>

        <style jsx>{`
          .card {
            width: 48%;
            float: left;
            margin: 0 0 30px 0;
          }
          .card.full {
            width: 100%;
          }
        `}</style>
      </div>
    )
  } 
}

import Link from 'next/link'
import Modal from 'react-modal'

import Helpers from '../utils/string'
import Head from '../components/head'
import Nav from '../components/nav'
import Chart from '../components/dashboard/chart'
import 'whatwg-fetch'

export default class Dashboard extends React.Component {
  state = { revenues: [], formValues: [] }

  componentDidMount() {
    this.getRevenues()
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })
  
  handleChangeForm = (category, key, event) => this.setState({ [key]: event.target.value })

  getRevenues = () => {
    fetch('/api/forecast/revenue').then(response => {
      return response.json()
    }).then(revenues => {
      this.setState({ revenues })
    })
  }

  addCategory = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    
    fetch('/api/forecast/categories', {
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
        expenses: this.state[`${category}-new-input-expenses`],
        revenue: this.state[`${category}-new-input-revenue`]
      }
    }

    fetch('/api/forecast/revenue', {
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

  renderAddCategory = (revenue) => (
    this.setState({ categoryModal: true, categoryId: revenue })
  )

  renderInputs = (revenue, item) => {
    const key = `${revenue.id}-${item.id}`
    return (
      <div key={item.name}>
        <label htmlFor={`${key}-name`}>
          <input
            type="text"
            id={`${key}-name`}
            name={`${key}-name`}
            defaultValue={item.name}
            value={this.state[`${key}-name`]}
            onChange={this.handleChangeForm.bind(this, revenue.id, `${key}-name`)}
          />
        </label>
        <label htmlFor={`${key}-quantity`}>
          <input
            type="number"
            id={`${key}-quantity`}
            name={`${key}-quantity`}
            defaultValue={item.quantity}
            value={this.state[`${key}-quantity`]}
            onChange={this.handleChangeForm.bind(this, revenue.id, `${key}-quantity`)}
          />
        </label>
        <label htmlFor={`${key}-pricing`}>
          <input
            type="number"
            id={`${key}-pricing`}
            name={`${key}-pricing`}
            defaultValue={item.pricing}
            value={this.state[`${key}-pricing`]}
            onChange={this.handleChangeForm.bind(this, revenue.id, `${key}-pricing`)}
          />
        </label>
        <label htmlFor={`${key}-expenses`}>
          <input
            type="number"
            id={`${key}-expenses`}
            name={`${key}-expenses`}
            defaultValue={item.expenses}
            value={this.state[`${key}-expenses`]}
            onChange={this.handleChangeForm.bind(this, revenue.id, `${key}-expenses`)}
          />
        </label>
        <label htmlFor={`${key}-revenue`}>
          <input
            type="number"
            id={`${key}-revenue`}
            name={`${key}-revenue`}
            defaultValue={item.revenue}
            value={this.state[`${key}-revenue`]}
            onChange={this.handleChangeForm.bind(this, revenue.id, `${key}-revenue`)}
          />
        </label>
      </div>
    )
  }
  
  renderNewInputs = (revenue) => {
    const key = `${revenue.id}-new-input`
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
            onChange={this.handleChangeForm.bind(this, revenue.id, `${key}-name`)}
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
            onChange={this.handleChangeForm.bind(this, revenue.id, `${key}-quantity`)}
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
            onChange={this.handleChangeForm.bind(this, revenue.id, `${key}-pricing`)}
          />
        </label>
        <label htmlFor={`${key}-expenses`}>
          expenses
          <input
            type="number"
            id={`${key}-expenses`}
            name={`${key}-expenses`}
            defaultValue=""
            value={this.state[`${key}-expenses`]}
            onChange={this.handleChangeForm.bind(this, revenue.id, `${key}-expenses`)}
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
            onChange={this.handleChangeForm.bind(this, revenue.id, `${key}-revenue`)}
          />
        </label>
        <button onClick={() => { this.insertItens(revenue.id) }}>isert values</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Head title="Dasboard" />
        <Nav />

        <div className="hero">
          <h1 className="title">Dashboard</h1>

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
              this.state.revenues.map(revenue => {
                return (
                  <div key={revenue.category}>
                    <h3>{revenue.category}</h3>
                    {revenue.itens.map(item => this.renderInputs(revenue, item))}
                    <br />
                    {this.renderNewInputs(revenue)}

                    <br /><br />
                    <div>
                      <p>Total Previsto: {revenue.total_revenue}</p>
                      <p>Total Previsto: {revenue.total_expenses}</p>
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

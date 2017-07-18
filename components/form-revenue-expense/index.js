import Link from 'next/link'
import Modal from 'react-modal'

import Helpers from '../../utils/string'
import Chart from '../dashboard/chart'
import 'whatwg-fetch'

export default class Dashboard extends React.Component {
  state = { itens: [], formValues: [] }

  componentDidMount() {
    this.getRevenues()
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })
  
  handleChangeForm = (category, key, event) => this.setState({ [key]: event.target.value })

  getRevenues = () => {
    fetch(`/api/forecast/${this.props.iten}`).then(response => {
      return response.json()
    }).then(itens => {
      this.setState({ itens })
    })
  }

  addCategory = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    
    fetch(`/api/forecast/categories-${this.props.iten}`, {
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
        expenses: (parseFloat(this.state[`${category}-new-input-quantity`]) * parseFloat(this.state[`${category}-new-input-pricing`])),
        revenue: this.state[`${category}-new-input-revenue`] || 0
      }
    }

    fetch(`/api/forecast/${this.props.iten}`, {
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

  update = (category, key, id) => {
    const revenue = document.querySelector(`#revenue-${key}`).value
    const data = {
      category,
      value: {
        name: document.querySelector(`#name-${key}`).value,
        quantity: document.querySelector(`#quantity-${key}`).value,
        pricing: document.querySelector(`#pricing-${key}`).value,
        expenses: (parseInt(document.querySelector(`#quantity-${key}`).value, 10) * parseInt(document.querySelector(`#pricing-${key}`).value, 10)),
        revenue: revenue === '' ? 0 : revenue
      }
    }

    fetch(`/api/forecast/${this.props.iten}/${id}`, {
      method: 'put',
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

  renderAddCategory = (iten) => (
    this.setState({ categoryModal: true, categoryId: iten })
  )

  renderInputs = (category, item) => {
    const key = `${category.id}-${item.id}`
    const quantity = this.state[`quantity-${key}`] || item.quantity
    const pricing = this.state[`pricing-${key}`] || item.pricing
    const total = (parseFloat(quantity) * parseFloat(pricing)).toLocaleString('pt-BR', {
      style: 'currency', currency: 'BRL',
    })
    return (
      <tr key={item.id}>
        <th>
          <input
            className="form-control"
            type="text"
            id={`name-${key}`}
            name={`name-${key}`}
            defaultValue={item.name}
            value={this.state[`name-${key}`]}
            onChange={this.handleChangeForm.bind(this, category.id, `name-${key}`)}
          />
        </th>
        <td>
          <input
            className="form-control"
            type="number"
            id={`quantity-${key}`}
            name={`quantity-${key}`}
            defaultValue={item.quantity}
            value={this.state[`quantity-${key}`]}
            onChange={this.handleChangeForm.bind(this, category.id, `quantity-${key}`)}
          />
        </td>
        <td>
          <input
            className="form-control"
            type="number"
            id={`pricing-${key}`}
            name={`pricing-${key}`}
            defaultValue={item.pricing}
            value={this.state[`pricing-${key}`]}
            onChange={this.handleChangeForm.bind(this, category.id, `pricing-${key}`)}
          />
        </td>
        <td>
          <input
            className="form-control"
            type="text"
            id={`expenses-${key}`}
            name={`expenses-${key}`}
            value={total}
            disabled={true}
          />
        </td>
        <td>
          <input
            className="form-control"
            type="number"
            id={`revenue-${key}`}
            name={`revenue-${key}`}
            defaultValue={item.revenue}
            value={this.state[`revenue-${key}`]}
            onChange={this.handleChangeForm.bind(this, category.id, `revenue-${key}`)}
          />
        </td>
        <td>
          <button
            onClick={() => this.update(category.id, key, item.id)}
            className="btn btn-secondary"
          >
            atualizar
          </button>
        </td>
      </tr>
    )
  }
  
  renderNewInputs = (category) => {
    const key = `${category.id}-new-input`
    return (
      <tr key={key}>
        <td>
          <input
            className="form-control"
            type="text"
            id={`${key}-name`}
            name={`${key}-name`}
            defaultValue=""
            value={this.state[`${key}-name`]}
            placeholder="Ex: item"
            onChange={this.handleChangeForm.bind(this, category.id, `${key}-name`)}
          />
        </td>
        <td>
          <input
            className="form-control"
            type="number"
            id={`${key}-quantity`}
            name={`${key}-quantity`}
            defaultValue=""
            value={this.state[`${key}-quantity`]}
            placeholder="Ex: 1"
            onChange={this.handleChangeForm.bind(this, category.id, `${key}-quantity`)}
          />
        </td>
        <td>
          <input
            className="form-control"
            type="number"
            id={`${key}-pricing`}
            name={`${key}-pricing`}
            defaultValue=""
            value={this.state[`${key}-pricing`]}
            placeholder="Ex: 100"
            onChange={this.handleChangeForm.bind(this, category.id, `${key}-pricing`)}
          />
        </td>
        <td>
          <button
            onClick={() => { this.insertItens(category.id) }}
            className="btn btn-primary"
          >
            adicionar iten
          </button>
        </td>
      </tr>
    )
  }

  render() {
    return (
      <div className="container">
        <div className="row align-items-center">
          <h1>
            {this.props.title} <br />
            <button
              onClick={() => this.renderAddCategory()}
              className="btn btn-secondary"
            >
              adicionar categoria
            </button>
          </h1>

          {
            this.state.categoryModal &&
              <Modal
                isOpen
                onRequestClose={() => this.setState({ categoryModal: false })}
                contentLabel="Modal"
                style={{
                  content : {
                    height: 200
                  }
                }}
              >
                <h2>Nova Categoria</h2>
                <form id="add-category-form">
                  {
                    !this.state.loading &&
                      <div>
                        <input
                          className="form-control"
                          type="text" 
                          placeholder="Ex: Consumo" 
                          name="newCategory" 
                          value={this.state.newCategory}
                          onChange={this.handleChange} 
                        />
                        <button
                          onClick={(e) => this.addCategory(e)}
                          className="btn btn-primary"
                        >
                          adicionar
                        </button>
                      </div>
                  }
                  {
                    this.state.loading &&
                      <h1>Enserindo nova categoria</h1>
                  }
                </form>
              </Modal>
          }

          {
            this.state.itens.map(iten => {
              return (
                <div key={iten.category} className="col-12" style={{ marginTop: 30, borderTop: '1px solid #999', paddingTop: 20 }}>
                  <h3>{iten.category}</h3>
                  <div>
                    <p>Total Real: <strong>{iten.total_revenue}</strong></p>
                    <p>Total Previsto: <strong>{iten.total_expenses}</strong></p>
                  </div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Iten</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Valor previsto</th>
                        <th>Valor total</th>
                        <th>Atualizar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {iten.itens.map(obj => this.renderInputs(iten, obj))}
                      {this.renderNewInputs(iten)}
                    </tbody>
                  </table>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  } 
}

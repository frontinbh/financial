import React from 'react'

export default class extends React.Component {
  state = { 
    results: [
      {
        name: 'Receitas',
        tr: 0,
        tp: 0
      },
      {
        name: 'Despesas',
        tr: 0,
        tp: 0
      },
      {
        name: 'Reembolsos',
        tr: 0,
        tp: 0
      }
    ],
    countStaff: 4 
  }

  componentDidMount() {
    fetch('/api/dashboard').then(response => {
      return response.json()
    }).then(data => {
      const { results } = data
      this.setState({ results })
    })
  }

  handleChange = (e) => {
    const countStaff = e.target.value
    this.setState({ countStaff })
  }

  render() {
    const revenues = this.state.results.filter(r => r.name === 'Receitas')
    const expenses = this.state.results.filter(r => r.name === 'Despesas')
    const cashback = this.state.results.filter(r => r.name === 'Reembolsos')
    const totalSplitReal = (revenues[0].tr - cashback[0].tr) - expenses[0].tr
    const totalSplit = (revenues[0].tp - cashback[0].tp) - expenses[0].tp
    return (
      <div>
        <input type="number" value={this.state.countStaff} onChange={this.handleChange} />
        <p>
          Real <br /> 
          {(totalSplitReal / this.state.countStaff)
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
        <p>
          Previsto <br />
          {(totalSplit / this.state.countStaff)
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
      </div>
    )
  } 
}

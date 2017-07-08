import Link from 'next/link'

import Head from '../components/head'
import Nav from '../components/nav'
import Chart from '../components/dashboard/chart'

export default class Dashboard extends React.Component {
  state = { results: [], revenueForecasts: [], expensesForecast: [] }

  componentDidMount() {
    fetch('/api/dashboard').then(response => {
      return response.json()
    }).then(data => {
      const { results, revenueForecasts, expensesForecast } = data
      this.setState({ results, revenueForecasts, expensesForecast })
    })
  }

  render() {
    return (
      <div>
        <Head title="Dasboard" />
        <Nav />

        <div className="hero">
          <h1 className="title">Dashboard</h1>

          <div className="row">
            <div className="card full">
              <Chart name="Resultados" data={this.state.results} />
            </div>
            <div className="card">
              <Chart name="Previsão de Receitas" data={this.state.revenueForecasts} />
            </div>
            <div className="card">
              <Chart name="Previsão de Despesas" data={this.state.expensesForecast} />
            </div>
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
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

        <div className="container">
          <div className="row">
            <div className="col-12">
              <Chart name="Resultados" data={this.state.results} />
            </div>
            <div className="col-6">
              <Chart name="Previsão de Receitas" data={this.state.revenueForecasts} />
            </div>
            <div className="col-6">
              <Chart name="Previsão de Despesas" data={this.state.expensesForecast} />
            </div>
          </div>

        </div>
      </div>
    )
  } 
}

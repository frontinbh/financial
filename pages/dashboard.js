import Link from 'next/link'

import Head from '../components/head'
import Nav from '../components/nav'
import Chart from '../components/dashboard/chart'
import StaffSplit from '../components/staff-split'

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
          <div className="row" style={{ marginTop: 30 }}>
            <div className="col-9" style={{ marginBottom: 40 }}>
              <Chart name="Resultados" data={this.state.results} />
            </div>
            <div className="col-3" style={{ marginBottom: 40 }}>
              <h2>Lucro staff</h2>
              <StaffSplit />
            </div>
            <div className="col-6">
              <Chart name="Receitas" data={this.state.revenueForecasts} />
            </div>
            <div className="col-6">
              <Chart name="Despesas" data={this.state.expensesForecast} />
            </div>
            <div className="col-6">
              <Chart name="Reembolsos" data={this.state.cashbacks} />
            </div>
          </div>

        </div>
      </div>
    )
  } 
}

import React from 'react'

import Head from '../components/head'
import Nav from '../components/nav'
import Form from '../components/form-revenue-expense'

export default class Expenses extends React.Component {
  render() {
    return (
      <div>
        <Head title="Financial Expenses" />
        <Nav />
        <Form iten='expenses' title='Despesas' />
      </div>
    )
  }
}

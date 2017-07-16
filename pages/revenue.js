import React from 'react'

import Head from '../components/head'
import Nav from '../components/nav'
import Form from '../components/form-revenue-expense'

export default class Revenues extends React.Component {
  render() {
    return (
      <div>
        <Head title="Dasboard" />
        <Nav />
        <Form iten='revenue' title='Receitas' />
      </div>
    )
  }
}

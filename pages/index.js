import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

export default () => (
  <div>
    <Head title="Home" />

    <div className="hero">
      <h1 className="title">Front in BH Panel</h1>

      <div className="row">
        <Link prefetch href="/dashboard">
          <a className="card">
            <h3>Dashboard &rarr;</h3>
            <p>Analisar custos e gastos do evento</p>
          </a>
        </Link>
        <Link href="/expense">
          <a className="card">
            <h3>Visualizar/Adicionar Despesas &rarr;</h3>
            <p>custos palestrantes, infraestrutra, etc.</p>
          </a>
        </Link>
        <Link href="/revenue">
          <a className="card">
            <h3>Visualizar/Adicionar Receita &rarr;</h3>
            <p>custos palestrantes, infraestrutra, etc.</p>
          </a>
        </Link>
      </div>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
        font-family: 'Helvetica';
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title, .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9B9B9B;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
)

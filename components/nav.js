import Head from './head'
import Link from 'next/link'

const Nav = () => (
  <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <a className="navbar-brand" href="#">FrontInBH Financial</a>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <Link prefetch className="nav-item" href="/dashboard">
          <a className="nav-link">Dashboard</a>
        </Link>
        <Link prefetch className="nav-item" href="/revenue">
          <a className="nav-link">Receita</a>
        </Link>
        <Link prefetch className="nav-item" href="/expense">
          <a className="nav-link">Despesas</a>
        </Link>
        <Link prefetch className="nav-item" href="/staff">
          <a className="nav-link">Organizadores</a>
        </Link>
      </ul>
    </div>
  </nav>
)

export default Nav

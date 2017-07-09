import Head from './head'
import Link from 'next/link'

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/dashboard">
          <a>Dashboard</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/expense">
          <a>Despesas</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/revenue">
          <a>Receitas</a>
        </Link>
      </li>
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system,BlinkMacSystemFont,Avenir Next,Avenir,Helvetica,sans-serif;
      }
      :global(input) {
        display: inline-block;
        margin: 0 5px;
      }
      :global(label) {
        font-size: 14px;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
)

export default Nav

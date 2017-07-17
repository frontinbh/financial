# Front in BH Management 

## Folder Structure

After creating an app, it should look something like:

```
my-app/
  README.md
  package.json
  next.config.js
  components/
    head.js
    nav.js
  pages/
    index.js
  static/
    favicon.ico
```

Routing in Next.js is based on the file system, so `./pages/index.js` maps to the `/` route and
`./pages/about.js` would map to `/about`.

The `./static` directory maps to `/static` in the `next` server, so you can put all your
other static resources like images or compiled CSS in there.

Out of the box, we get:

- Automatic transpilation and bundling (with webpack and babel)
- Hot code reloading
- Server rendering and indexing of `./pages`
- Static file serving. `./static/` is mapped to `/static/`

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:80](http://localhost:80) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any errors in the console.

### `npm run build`

Builds the app for production to the `.next` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run start`

Starts the application in production mode.
The application should be compiled with \`next build\` first.

## Using CSS

[`styled-jsx`](https://github.com/zeit/styled-jsx) is bundled with next to provide support for isolated scoped CSS. The aim is to support "shadow CSS" resembling of Web Components, which unfortunately [do not support server-rendering and are JS-only](https://github.com/w3c/webcomponents/issues/71).

```jsx
export default () => (
  <div>
    Hello world
    <p>scoped!</p>
    <style jsx>{`
      p {
        color: blue;
      }
      div {
        background: red;
      }
      @media (max-width: 600px) {
        div {
          background: blue;
        }
      }
    `}</style>
  </div>
)
```

Read more about [Next's CSS features](https://github.com/zeit/next.js#css).

## Adding Components

We recommend keeping React components in `./components` and they should look like:

### `./components/simple.js`

```jsx
const Simple = () => (
  <div>Simple Component</div>
)

export default Simple // don't forget to export default!
```

### `./components/complex.js`

```jsx
import { Component } from 'react'

class Complex extends Component {
  state = {
    text: 'World'
  }

  render () {
    const { text } = this.state
    return <div>Hello {text}</div>
  }
}

export default Complex // don't forget to export default!
```

## Syntax Highlighting

To configure the syntax highlighting in your favorite text editor, head to the [relevant Babel documentation page](https://babeljs.io/docs/editors) and follow the instructions. Some of the most popular editors are covered.

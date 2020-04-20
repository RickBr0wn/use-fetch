# @rickbrown/use-fetch

[![NPM](https://img.shields.io/npm/v/@rickbrown/use-fetch.svg)](https://www.npmjs.com/package/@rickbrown/use-fetch) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)]() [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) <span class="badge-npmdownloads"><a href="https://api.npmjs.org/downloads/point/last-month/@rickbrown/use-fetch" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/badges.svg" alt="NPM downloads" /></a></span> [![codecov.io Code Coverage](https://img.shields.io/codecov/c/github/dwyl/hapi-auth-jwt2.svg?maxAge=2592000)](https://github.com/RickBr0wn/use-fetch?branch=master)

<span class="badge-buymeacoffee"><a href="https://www.buymeacoffee.com/RickBrown" title="Donate to this project using Buy Me A Coffee"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg" alt="Buy Me A Coffee donate button" /></a></span>

> A custom React hook to simplify the fetch API. This has been created as part of a blog post series. Part one can be seen [here](https://www.self-taught-and-fraught.com/react/use-fetch/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To get this boilerplate running locally you will need:

- a node package manager (yarn or npm)
- a command line terminal (iTerm or bash)
- your favorite IDE (vscode, sublime)

## Install

```bash
npm install --save @rickbrown/use-fetch
```

## Usage

```js
import React from 'react'
import { useFetch } from '@rickbrown/use-fetch'

const App = () => {
  const [response, error, isLoading] = useFetch(
    `https://jsonplaceholder.typicode.com/users/5`
  )

  if (isLoading) {
    // can be used for loading indicator/spinner etc.
    return <h1>Loading..</h1>
  }

  if (error) {
    // handle any error
    console.log(error.message)
  }

  // if the code reaches this point, loading has been completed and there is no error
  // you have been returned a `response` object
  return (
    <>
      <pre>response: {JSON.stringify(response, null, 2)}</pre>
    </>
  )
}

export default App
```

## The `response` object

```js
{
  'end-point': String,
  status: Number,
  error: Boolean,
  'data-type': String,
  'data-length': Number,
  data: Object
}
```

So, if you wanted to remove all the extra information, and you only want the `data` object, and you are only using the `use-fetch` hook once in your component, your API could look like this:

```js
const [{ data }, error, isLoading] = useFetch(
  `https://jsonplaceholder.typicode.com/users/5`
)
```

## Chaining Multiple Requests

`use-fetch` will also accept a conditional statement. I will give an example by checking the URL. If there is no URL, we return, and the hook does nothing. This conditional allows us to use our hook multiple times in the same component, by using a ternary operator in the fetch call like this:

```js
const [weatherData, weatherError, weatherIsLoading] = useFetch(
  coords.lat && coords.long
    ? `http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&APPID=${WEATHER_API_KEY}&units=metric`
    : null
)

const [forecastData, forecastError, forecastIsLoading] = useFetch(
  weatherData.data
    ? `http://api.openweathermap.org/data/2.5/forecast/daily?id=${weatherData.data.id}&appid=${WEATHER_API_KEY}`
    : null
)
```

## Running the tests

Available scripts:

```bash
yarn test
yarn test:watch
yarn test:coverage
```

## Built With

- [create-react-hook](https://github.com/hermanya/create-react-hook) - CLI for creating reusable React hooks using Rollup and create-react-app.
- [react](https://reactjs.org/docs/getting-started.html) - A JavaScript library for building user interfaces.
- [rollup](https://rollupjs.org/guide/en/) - Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application.
- [react-hooks-testing-library](https://react-hooks-testing-library.com) - Simple and complete React hooks testing utilities that encourage good testing practices.
- [node-fetch](https://www.npmjs.com/package/node-fetch) - A light-weight module that brings window.fetch to Node.js

## Contributing

[CONTRIBUTING.md](/CONTRIBUTING.md)

## Author(s)

- **Rick Brown** - _Initial work_ - [RickBr0wn](https://github.com/RickBr0wn)

## License

This project is licensed under the MIT License - see the [LICENSE.md](<[LICENSE.md](https://gist.github.com/RickBr0wn/5f95ee6118bb32034e2b94acbd88a99d)>) file for details

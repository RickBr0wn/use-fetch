import React from 'react'
import { useFetch } from '@rickbrown/use-fetch'

const App = () => {
  const [response, error, isLoading] = useFetch(
    `https://jsonplaceholder.typicode.com/users/`
  )
  return (
    <>
      <pre>LOADING: {isLoading.toString()}</pre>
      <pre>ERROR: {error.toString()}</pre>
      <pre>response: {JSON.stringify(response, null, 2)}</pre>
    </>
  )
}

export default App

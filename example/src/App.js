import React from 'react'
import { useFetch } from '@rickbrown/use-fetch'

const App = () => {
  const [response, error, isLoading] = useFetch(
    `https://jsonplaceholder.typicode.com/users/`
  )

  if (isLoading) {
    // can be used for loading indicator/spinner etc.
    return <h1>Loading..</h1>
  }

  if (error) {
    // handle any error
    console.log(error.message)
  }

  return (
    <>
      <pre>response: {JSON.stringify(response, null, 2)}</pre>
    </>
  )
}

export default App

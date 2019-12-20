import React from 'react'
import { useMyHook } from '@rickbrown/use-fetch'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
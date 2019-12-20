# @rickbrown/use-fetch

> A custom React hook to simplify the fetch API.

[![NPM](https://img.shields.io/npm/v/@rickbrown/use-fetch.svg)](https://www.npmjs.com/package/@rickbrown/use-fetch) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @rickbrown/use-fetch
```

## Usage

```jsx
import React, { Component } from 'react'

import { useMyHook } from '@rickbrown/use-fetch'

const Example = () => {
  const example = useMyHook()
  return (
    <div>{example}</div>
  )
}
```

## License

MIT © [RickBr0wn](https://github.com/RickBr0wn)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).

import * as React from 'react'

const useFetch = (url, options = {}) => {
  const [data, setData] = React.useState()

  React.useEffect(() => {
    const fetchData = async function() {
      const resp = await fetch(url, options)
        .then(res => res.json())
        .then(jsonData => {
          setData(jsonData)
        })
        .catch(err => [{ status: 500, error: true, errorMessage: err.message }])
    }
    fetchData()
  }, [])

  if (Array.isArray(data)) {
    return [
      {
        'end-point': url,
        status: 200,
        error: false,
        'data-type': 'array',
        'data-length': data.length,
        data,
      },
    ]
  } else {
    return [
      {
        status: 200,
        error: false,
        'end-point': url,
        'data-type': typeof data,
        data,
      },
    ]
  }
}

// TODO: fix use case for a body being supplied to useFetch
useFetch.GET = (url, options = {}) => useFetch(url, options)

useFetch.POST = (url, options = {}) =>
  useFetch(url, Object.assign({}, options, { method: 'post' }))

useFetch.PATCH = (url, options = {}) =>
  useFetch(url, Object.assign({}, options, { method: 'patch' }))

useFetch.DELETE = (url, options = {}) =>
  useFetch(url, Object.assign({}, options, { method: 'delete' }))

export { useFetch }

import * as React from 'react'

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'BEGIN_FETCHING_DATA':
      return Object.assign({}, state, { isLoading: true })
    case 'SUCCESS_FETCHING_DATA':
      return Object.assign({}, state, {
        response: payload.response,
        isLoading: payload.isLoading,
        error: payload.error,
      })
    default:
      return state
  }
}

const initialState = {
  response: null,
  error: false,
  isLoading: false,
}

const useFetch = (url, options) => {
  if (!url) {
    return
  }

  const isMounted = React.useRef(true)
  const [state, dispatch] = React.useReducer(reducer, initialState)

  function beginFetchingData() {
    return { type: 'BEGIN_FETCHING_DATA' }
  }

  function successFetchingData() {
    return {
      type: 'SUCCESS_FETCHING_DATA',
      payload: {
        response: {
          'end-point': url,
          status: 200,
          error: false,
          'data-type': Array.isArray(jsonData) ? 'array' : typeof jsonData,
          'data-length': jsonData.length,
          data: jsonData,
        },
        isLoading: true,
        error: null,
      },
    }
  }

  function errorFetchingData() {
    return {
      type: 'ERROR_FETCHING_DATA',
      payload: {
        response: null,
        isLoading: false,
        error: {
          status: true,
          message: 'error during fetch',
        },
      },
    }
  }

  React.useEffect(() => {
    if (isMounted.current) {
      dispatch(beginFetchingData())
      const fetchData = async function() {
        const resp = await fetch(url, options)
          .then(res => res.json())
          .then(jsonData => {
            dispatch(successFetchingData())
          })
          .catch(err => {
            dispatch(errorFetchingData())
          })
      }
      fetchData()
    }

    return () => {
      isMounted.current = false
    }
  }, [url, options])

  return [state.response, state.error, state.isLoading]
}

export { useFetch }

import { useFetch } from './'
import { renderHook, cleanup } from '@testing-library/react-hooks'
import fetchMock from 'fetch-mock'

const consoleError = console.error

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (
      !args[0].includes(
        'Warning: An update to %s inside a test was not wrapped in act'
      )
    ) {
      consoleError(...args)
    }
  })
})

beforeEach(() => {
  fetchMock.mock('test.com', () => ({
    data: 'foo'
  }))
})

afterEach(() => {
  fetchMock.restore()
  cleanup()
})

describe('useFetch()', () => {
  it('should return an array with a length of 3', async () => {
    const { result } = renderHook(() => useFetch('test.com'))
    expect(result.current.length).toBe(3)
    expect(result.current).toHaveLength(3)
  })

  it('should return an array containing the correct types after initial render', () => {
    const { result } = renderHook(() => useFetch('test.com'))
    expect(typeof result.current[0]).toBe('object')
    expect(typeof result.current[1]).toBe('boolean')
    expect(typeof result.current[2]).toBe('boolean')
  })

  it('should return an array containing the correct types after resolving', () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch('test.com'))
    waitForNextUpdate()
    expect(typeof result.current[0]).toBe('object')
    expect(typeof result.current[1]).toBe('boolean')
    expect(typeof result.current[2]).toBe('boolean')
  })

  it('should set loading to true after initial call', () => {
    const { result } = renderHook(() => useFetch('test.com'))
    expect(result.current[2]).toBe(true)
  })

  it('should set error to null after initial call', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch('test.com'))
    await waitForNextUpdate()
    expect(result.current[1]).toBe(false)
  })

  it('should set a response when resolved', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch('test.com'))
    await waitForNextUpdate()
    expect(result.current[0].data.data).toBe('foo')
  })

  it('should set isLoading to false when resolved', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch('test.com'))
    await waitForNextUpdate()
    expect(result.current[2]).toBe(false)
  })

  it('should return error as true if there is a error', async () => {
    // eslint-disable-next-line prefer-promise-reject-errors
    fetchMock.mock('failed.com', Promise.reject({ error: true }))
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('failed.com')
    )
    await waitForNextUpdate()
    expect(result.current[1].error).toBe(true)
  })
})

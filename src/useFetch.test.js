import { useFetch } from './'
import { renderHook, cleanup, act } from '@testing-library/react-hooks'

afterEach(cleanup)

describe('useFetch()', () => {
  it('should return an array with a length of 3', () => {
    const { result } = renderHook(useFetch)
    expect(result.current).toHaveLength(3)
  })

  it('should set loading to true after initial call', () => {
    const { result } = renderHook(() =>
      useFetch('https://jsonplaceholder.typicode.com/users/1')
    )
    expect(result.current[2]).toBe(true)
  })
})

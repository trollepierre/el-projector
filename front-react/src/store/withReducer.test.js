import { withReducer } from './withReducer'

describe('WithReducer function', () => {
  const OLD_VALUE = 'oldValue'
  const NEW_VALUE = 'newValue'

  const initialState = {
    property: OLD_VALUE,
  }

  const actions = {
    UPDATE_STATE: (state, action) => ({ property: action.value }),
  }

  const reducer = withReducer(initialState, actions)

  it('should return the initialState on INIT', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toBe(initialState)
  })

  it('should return new state when action is handled', () => {
    const stateWithProperty = { property: NEW_VALUE }

    const reducerWithAction = reducer(initialState, {
      type: 'UPDATE_STATE',
      value: NEW_VALUE,
    })

    expect(reducerWithAction).toEqual(stateWithProperty)
  })

  it('should return initial state when calling action is not in the handled actions of the reducer', () => {
    const reducerWithAction = reducer(initialState, {
      type: 'NON_EXIST_ACTION',
    })

    expect(reducerWithAction).toEqual(initialState)
  })
})

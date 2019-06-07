import createStore from './createStore';
jest.mock('redux');

describe('createStore', () => {
  it('should add redux devtools', () => {
    global.__REDUX_DEVTOOLS_EXTENSION__ = jest.fn();
    const mockedReducer = jest.fn();

    createStore(mockedReducer);

    expect(global.__REDUX_DEVTOOLS_EXTENSION__.mock.calls).toHaveLength(1);
  });

  it('should not crash', () => {
    global.__REDUX_DEVTOOLS_EXTENSION__ = undefined;
    const mockedReducer = jest.fn();

    createStore(mockedReducer);
  });
});


expect.extend({
  toHaveBeenCalledOnceWith(received, ...args) {
    expect(received).toHaveBeenCalledTimes(1)
    expect(received).toHaveBeenCalledWith(...args)
    return { pass: true }
  },
})

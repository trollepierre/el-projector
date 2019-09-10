const { estimateOptimalDelay } = require('./estimate-optimal-delay')

describe('Unit | Domain | estimate-optimal-delay', () => {
  describe('#estimateOptimalDelay()', () => {
    it('should validate some values', () => {
      // Then
      expect(estimateOptimalDelay(999)).toEqual(1)
      expect(estimateOptimalDelay(500)).toEqual(15)
      expect(estimateOptimalDelay(200)).toEqual(36)
      expect(estimateOptimalDelay(100)).toEqual(60)
      expect(estimateOptimalDelay(50)).toEqual(94)
      expect(estimateOptimalDelay(10)).toEqual(209)
      expect(estimateOptimalDelay(1)).toEqual(365)
    })
  })
})

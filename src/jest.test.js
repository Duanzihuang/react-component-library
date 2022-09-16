// 测试
test('test common matcher', () => {
  expect(2 + 3).toBe(5)
  expect(2 + 3).not.toBe(6)
})

// 测试boolean
test('test to be true or false', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

// 测试number
test('test number', () => {
  expect(4).toBeGreaterThan(3)
  expect(2).toBeLessThan(3)
})

// 测试object
test('test object', () => {
  // expect({ name: '段子黄' }).toBe({ name: '段子黄' }) // 引用地址相等
  expect({ name: '段子黄' }).toEqual({ name: '段子黄' }) // 值相等
})

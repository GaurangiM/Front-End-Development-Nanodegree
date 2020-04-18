const { getDaysDiff } = require('./app');
test('test function values', () => {
  const date1 = 10;
  const date2 = 15;
  expect(getDaysDiff(date1, date2)).toBe(5);
})
const {getApiInfo} = require('./server');
test('test api values', () => {
    
    expect(getApiInfo().pixaBay.baseUrl).toBe('https://pixabay.com/api');
  })
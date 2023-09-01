// * 在不同的环境下会有不同的值 // * 推荐

// * 根据process.env.NODE_ENV
// 开发环境: development
// 生产环境: production
// 测试环境: test
let BASE_URL = '';
const TIME_OUT = 10000;

if (process.env.NODE_ENV === 'development') {
    BASE_URL = '/api';
} else if (process.env.NODE_ENV === 'production') {
    // BASE_URL = 'http://www.xrxrweb.com/prod';
} else {
    // BASE_URL = 'http://www.xrxrweb.com/test';
}

export { TIME_OUT, BASE_URL };

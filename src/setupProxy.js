const { createProxyMiddleware,  fixRequestBody } = require('http-proxy-middleware');
 
module.exports = function (app) {   
  app.use(
    createProxyMiddleware('/api1', {
      target: 'https://playdata.io', // API endpoint 1
      changeOrigin: true,
      pathRewrite: {
        "^/api1": "",
      },
      headers: {
        Connection: "keep-alive"
      },
      onProxyReq: fixRequestBody
    })
  )

  
  app.use(
    createProxyMiddleware('/api2', {
      target: 'https://www.naver.com', // API endpoint 1
      changeOrigin: true,
      pathRewrite: {
        "^/api2": "",
      },
      headers: {
        Connection: "keep-alive"
      },
      onProxyReq: fixRequestBody
    })
  )

  app.use(
    createProxyMiddleware('/api3', {
      target: "https://kapi.kakao.com/v1", // API endpoint 1
      changeOrigin: true,
      pathRewrite: {
        "^/api3": "",
      },
      headers: {
        Connection: "keep-alive"
      },
      onProxyReq: fixRequestBody
    })
  )

  app.use(
    createProxyMiddleware('/api4', {
      target: 'http://13.209.116.8:8080', // API endpoint 1
      changeOrigin: true,
      pathRewrite: {
        "^/api4": "",
      },
      headers: {
        Connection: "keep-alive"
      },
      onProxyReq: fixRequestBody
    })
  )


  
}
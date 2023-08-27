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
    createProxyMiddleware('/spring', {
      target: 'http://localhost:8080', // API endpoint 1
      changeOrigin: true,
      pathRewrite: {
        "^/spring": "",
      },
      headers: {
        Connection: "keep-alive"
      },
      onProxyReq: fixRequestBody
    })
  )


  
}
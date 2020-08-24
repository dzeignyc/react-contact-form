const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/contact',
    createProxyMiddleware({
      target: 'http://[::1]:3000/',
      secure: false,
      changeOrigin: true
    })
  )
}

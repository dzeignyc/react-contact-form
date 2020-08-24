const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/contact',
    createProxyMiddleware({
      target: 'http://localhost:3000/',
      changeOrigin: true,
      onError(err) {
          console.log('HPM ERROR:', err);
        },
    })
  )
}

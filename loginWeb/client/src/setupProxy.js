const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://13.59.215.241:8080',
      changeOrigin: true,
      })
    );
};
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://cnpmmnhom14.onrender.com",
      changeOrigin: true,
    })
  );
};

const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const open = require('open');

const cliParams = process.argv.slice(2);
const rewritePaths = cliParams.includes('--rewrite-paths');

const port = 8899;
const app = express();

const ROUTER = {
    '/react': 'http://localhost:3000',
    '/vue': 'http://localhost:8081',
    '/svelte': 'http://localhost:8181',
};

const proxyMiddleware = createProxyMiddleware({
    target: 'http://please-ignore-this-hostname', // must be set even when router is used
    router: ROUTER,
    changeOrigin: true,
    pathRewrite: rewritePaths ? {
        '^/apps/[^\\/]+': ''
    } : undefined
});
app.use('/apps', proxyMiddleware);
app.use(express.static(__dirname));


app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`HTTP server is running on ${url}`);
    open(`${url}/index.html`);
});
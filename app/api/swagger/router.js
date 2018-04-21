const rootPath = require('app-root-path');
const compose = require('composable-middleware');
const express = require('express');
const path = require('path')
const router = express.Router();

router.get('/document', (req, res) => res.status(200).send(require('./document.js')));

router.use('/', compose().use((req, res, next) => {
    if (req.url === '/') res.redirect('/swagger?url=document');
    else next();
}).use(express.static(path.join(rootPath.path, '/node_modules/swagger-ui/dist'))));

module.exports = router;

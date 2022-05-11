const express = require('express');
const urlController = require('../controllers/urlController');

const router = express.Router();

router.route('/shorturl').post(urlController.postUrl);

router.route('/shorturl/:short_url').get(urlController.getUrl);

module.exports = router;

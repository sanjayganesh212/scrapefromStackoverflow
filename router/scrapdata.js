const express = require('express');
const scrapController = require('../controller/scrapController.js');

const router = express.Router();





router.get('/scraptagData', scrapController.scraptagData);

router.get('/gettags', scrapController.gettags);

router.post('/gettagsById', scrapController.gettagsById);










module.exports = router;

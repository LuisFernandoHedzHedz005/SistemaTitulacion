const express = require('express');
const router = express.Router();


router.get('/planes', (req, res) => {
    res.render('planes');
});

module.exports = router;
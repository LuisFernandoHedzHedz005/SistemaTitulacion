// routes/planes.js
const express = require('express');
const router = express.Router();

// Rutas para la página de planes
router.get('/planes', (req, res) => {
    res.render('planes');
});

module.exports = router;
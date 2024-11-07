const express = require('express');
const router = express.Router();

// Ruta para la página de registro
router.get('/', (req, res) => {
    res.render('registro'); // Verifica que tienes `registro.ejs` en `views`
});

module.exports = router;

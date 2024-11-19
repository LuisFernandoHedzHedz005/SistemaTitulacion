const express = require('express');
const router = express.Router();
const queries = require('../config/querys');



router.get('/', async (req, res) => {
    try {
        let estudiantes = await queries.getEstudiantes();
        let administradores = await queries.getAdministradores();
        let visitas = await queries.getVisitas();
        
        console.log('Datos a enviar a la vista:', {
            estudiantes: estudiantes.length,
            administradores: administradores.length,
            visitas: visitas.length
        });

        res.render('consultas', {
            estudiantes,
            administradores,
            visitas
        });
    } catch (error) {
        console.error('Error en la ruta de consultas:', error);
        res.status(500).render('error', { 
            message: 'Error al obtener los datos',
            error: error
        });
    }
});

module.exports = router;
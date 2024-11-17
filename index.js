const express = require('express');
const path = require('path'); // Requerido para rutas de sistema
const indexRouter = require('./routes/index');
const planesRouter = require('./routes/planes');
const registroRouter = require('./routes/registro');
const visitaRouter = require('./routes/visita');
const queries = require('./config/querys');

const app = express();
const port = 3000;

// Configura la ubicación de las vistas
app.set('views', __dirname + '/views');

// Configura el motor de plantillas
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Configura la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usa los routers
app.use('/', indexRouter);
app.use('/planes', planesRouter);
app.use('/registro', registroRouter);
app.use('/visita', visitaRouter);


app.post("/validar", async (req,res) => {

    const { cuenta,
        nombre, 
        apellido_paterno, 
        apellido_materno, 
        fecha_nacimiento, 
        semestre, 
        edad } = req.body;

        try {
            await queries.registrarUsuario(cuenta, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, semestre, edad);
            res.send('Datos registrados correctamente');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al registrar los datos');
        }
});

app.post("/validarVisita", async (req, res) => {
    console.log('Datos recibidos:', req.body);
    const { cuenta, fecha_visita, motivo } = req.body;

    try {
        const cuentaExistente = await queries.verificarCuenta(cuenta);
        if (!cuentaExistente) {
            return res.status(400).send('Error: El número de cuenta no está registrado');
        }

        await queries.registrarVisita(cuenta, fecha_visita, motivo);
        res.send('Visita registrada correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar la visita');
    }
});


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});

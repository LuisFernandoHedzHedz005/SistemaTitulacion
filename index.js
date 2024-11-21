const express = require('express');
const path = require('path'); // Requerido para rutas de sistema
const indexRouter = require('./routes/index');
const planesRouter = require('./routes/planes');
const registroRouter = require('./routes/registro');
const visitaRouter = require('./routes/visita');
const adminRouter = require('./routes/admin');
const consultasRouter = require('./routes/consultas');
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
app.use('/admin', adminRouter);
app.use('/consultas', consultasRouter);


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
            res.redirect('/');
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
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar la visita');
    }
});

app.post("/validarAdmin", async (req, res) => {
    console.log('Datos recibidos en /validarAdmin:', req.body);
    const { usuario, contrasena, fecha_visita, motivo} = req.body;

    try {
        const adminValido = await queries.verificarContrasenaAdmin(usuario, contrasena);

        if (!adminValido) {
            return res.status(400).send('Error: Usuario o contraseña incorrectos');
        }

        await queries.registrarVisitaAdmin(usuario, fecha_visita, motivo);
        res.redirect('/consultas'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al validar al administrador');
    }
});


module.exports = consultasRouter;

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor escuchando en el puerto http://192.168.3.15:${port}`);
});
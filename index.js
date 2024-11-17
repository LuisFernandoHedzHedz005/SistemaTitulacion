const express = require('express');
const path = require('path'); // Requerido para rutas de sistema
const indexRouter = require('./routes/index');
const planesRouter = require('./routes/planes');
const registroRouter = require('./routes/registro');
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

app.post("/validar", async (req,res) => {
    /*
    const datos = req.body;
    let nombre  = datos.nombre;
    let apellido_paterno = datos.apellido_paterno;
    let apellido_materno = datos.apellido_materno;
    let fecha_registro = datos.fecha_registro;
    let semestre = datos.semestre;
    let edad = datos.edad;
    console.log(datos)
    */

    const { nombre, 
        apellido_paterno, 
        apellido_materno, 
        fecha_registro, 
        semestre, 
        edad } = req.body;

        try {
            await queries.registrarUsuario(nombre, apellido_paterno, apellido_materno, fecha_registro, semestre, edad);
            res.send('Datos registrados correctamente');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al registrar los datos');
        }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});

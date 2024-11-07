const express = require('express');
const path = require('path'); // Requerido para rutas de sistema
const indexRouter = require('./routes/index');
const planesRouter = require('./routes/planes');
const registroRouter = require('./routes/registro');

const app = express();
const port = 3000;

// Configura la ubicación de las vistas
app.set('views', __dirname + '/views');

// Configura el motor de plantillas
app.set('view engine', 'ejs');

// Configura la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usa los routers
app.use('/', indexRouter);
app.use('/planes', planesRouter);
app.use('/registro', registroRouter);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});

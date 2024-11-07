const express = require('express');
const indexRouter = require('./routes/index');
const planesRouter = require('./routes/planes');
const registroRouter = require('./routes/registro');

const app = express();
const port = 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Archivos estáticos
app.use(express.static(__dirname + '/public'));

// Usa los routers
app.use('/', indexRouter);
app.use('/planes', planesRouter);
app.use('/registro', registroRouter);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});

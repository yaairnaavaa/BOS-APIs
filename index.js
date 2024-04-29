const express = require('express');
const morgan = require('morgan');

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) { return val; }
    if (port > 0) { return port; }
    return false;
}

// Crear una instancia de Express
const app = express();

// Configurar middlewares y rutas
app.use(morgan('dev')); // Utiliza el formato de registro 'dev'
app.use(express.json()); // Analiza el cuerpo de las solicitudes en formato JSON
app.use(express.urlencoded({ extended: false })); // Analiza el cuerpo de las solicitudes en formato 'application/x-www-form-urlencoded'

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, X-HTTP-Method-Override, Access-Control-Allow-Origin');
    next();
});

app.get("/", (req, res) => {
    res.send("Bienvenido a SEDER API");
})

app.get("/farcaster/all-channels", async (req, res) => {
    const r = await fetch("https://api.warpcast.com/v2/all-channels");
    const data = await r.json();
    return res.status(200).json({ data: data });

})

app.get("/farcaster/channel/:id", async (req, res) => {    
    const r = await fetch("https://api.warpcast.com/v1/channel?channelId="+req.params.id);
    const data = await r.json();
    return res.status(200).json({ data: data });
})

// Iniciar el servidor
const port = normalizePort(process.env.PORT | 3003);

app.listen(port, async () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});

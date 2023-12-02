const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Puedes cambiar el puerto si es necesario

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Directorio que contiene tus archivos estáticos (como HTML, CSS, JS)

app.post('/', (req, res) => {
  const user = req.body.user;
  const password = req.body.password;

  // Aquí puedes realizar la lógica de autenticación o cualquier acción que desees con los datos del formulario

  res.send(`Usuario: ${user}, Contraseña: ${password}`);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

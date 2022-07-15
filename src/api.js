const express = require('express');
const loginRoute = require('./routes/loginRoute');
// ...

const app = express();

app.use(express.json());

app.use('/login', loginRoute);
// ...

app.use((err, _req, res, _next) => {
  const { name, message } = err;

  switch (name) {
    case 'invalid':
      return res.status(400).json({ message });
    default:
      return res.status(500).json(err.message);
  }
});

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

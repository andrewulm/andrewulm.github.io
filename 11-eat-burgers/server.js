const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

// Serve static content for the app from the 'public' directory
app.use(express.static('public'));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars
const xHandlebars = require('express-handlebars');

app.engine('handlebars', xHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Import routers and give the server access to them
const routes = require('./controllers/burgerController');

app.use(routes);

// Start server
app.listen(PORT, () => {
   console.log(`----- Server listening on: http://localhost:${PORT}`);
});

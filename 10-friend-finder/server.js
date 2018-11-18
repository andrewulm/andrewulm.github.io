// Dependencies //
const express = require('express');
const app = express();

// Set Initial Port //
const PORT = process.env.PORT || 8080;

// Initialize Express with data parsing //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/app/public'));

// Routes //
require('./app/routes/api')(app);
require('./app/routes/html')(app);

// Listener //
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});
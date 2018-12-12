const express = require('express');
const router = express.Router();

// Import the model (burgers.js) to use it's DB functions
const burger = require('../models/burger.js');

// Create all our routes to set up logic within the routes requested
router.get('/', (req, res) => {
   burger.all((data) => {
       let hbsObject = {
           burger: data
       };
       console.log(hbsObject);
       res.render('index', hbsObject);
   });
});

router.post('/api/burgers', (req, res) => {
   burger.create(['name', 'eaten'], [req.body.name, req.body.eaten], (result) => {
           res.json({ id: result.insertId });
   }) ;
});

router.put('/api/burgers/:id', (req, res) => {
    let condition = `id = ${req.params.id}`;
    console.log(`Condition: ${condition}`);

    burger.update({eaten: req.body.eaten}, condition, (result) => {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete('/api/burgers/:id', (req, res) => {
   let condition = `id = ${req.params.id}`;
   console.log(`Condition: ${condition}`);

   burger.delete(condition, (result) => {
      if (result.affectedRows == 0) {
          return res.status(404).end();
      } else {
          res.status(200).end();
      }
   });
});

module.exports = router;

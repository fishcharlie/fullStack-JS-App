var express = require("express");
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var Card = require('./card_model.js');

mongoose.connect('mongodb://localhost/notecardsapp');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log(req.url);
    next();
});

// Get
app.get("/flashcards", function(req, res) {
    Card.find({}, function(err, cards) {
      res.send(cards);
    });
});

app.get("/flashcards/:id", function(req, res) {
    Card.findById(req.param('id'), function(err, card) {
      res.send(card);
    });
});

// Post
app.post("/flashcards", function(req, res) {
    console.log(req.body);
    var card = new Card({
      question: req.body.question,
      answer: req.body.answer,
    });

    card.save(function (err) {
        if (err) {
            res.status(500).send('ERROR');
        }
        else {
            res.send('OK');
        }
    });


});

// Put
app.put("/flashcards/:id", function(req, res) {
    Card.findById(req.param('id'), function(err, card) {
        if (req.body.question) {
            card.question = req.body.question;
        }
        if (req.body.answer) {
            card.answer = req.body.answer;
        }
        card.save();
        res.send('OK');
    });
});

// Delete
app.delete("/flashcards/:id", function(req, res) {
    Card.findById(req.param('id'), function(err, card) {
      card.remove();
      res.send('OK');
    });
});





var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
});

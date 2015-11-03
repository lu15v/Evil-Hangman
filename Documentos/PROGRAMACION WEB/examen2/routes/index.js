var express = require('express');
var router = express.Router();
var f = require('fs');
var path = require('path');
var serverc;
var choices = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Evil Hangman' });
});

router.post('/input',function(req,res){


  req.session.size = req.body.size;
  req.session.lives = req.body.lives;

res.redirect('/start');
});

router.get('/start',function(req,res){

  f.readFile("public/resources/dictionary.txt",function(err,data){
    if(err)throw err;

    //console.log(data.toString());
    var words = data.toString();
    var list = words.split(/\n|\r\n/);

    list.forEach(function(x){
      if(x.length == req.session.size)
        choices.push(x);

    });



    var machineC = Math.floor((Math.random() * choices.length));
    var choice = choices[machineC];
    console.log("la elección de la primera palabra por la parte del servidor es --> " + choice);
    serverc = choice;

    var asciiI = 65;
    var asciiF = 90;

    var letters= [];
    for(asciiI; asciiI <= asciiF; asciiI++)
      letters.push(String.fromCharCode(asciiI));

    res.render('game',{title:'Hangman', letters: letters, session: req.session, choice:choice, choices:choices});



  });




});




module.exports = router;

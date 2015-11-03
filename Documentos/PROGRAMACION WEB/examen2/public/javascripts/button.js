/*----------------------------------------------------------
 * Exam 2: Evil Hangman
 * Date: 26-Oct-2015
 * Author:
 *           A01371743 Luis Eduardo Ballinas Aguilar
 *----------------------------------------------------------*/

'use strict';

var countLost = 0;
var rest;
var missingL = 0;
var optionsList = [];
var isGood = false;



function comparing(first,char,second){
  for (var i = 0; i < first.length; i++) {
    if (first[i] === char){
      if(first[i] !== second[i])
      return false;
    }
  }
  return true;
}



function save(value, id,lives,choice,list){
  document.getElementById(id).disabled = true;

  var char = value.toLowerCase();
  var count = 0;
  var letterbyletter = choice.split('');
  var size = letterbyletter.length;
  var found = false;
  var values = document.getElementById(id).value;

  var asciiI = 65;
  var asciiF = 90;
  var mistakes = 0;

//SI ESCOGE UNA PALABRA MENOR A 16 PERDERA.....
  if(size >= 16){
    for(var i = 0; i < letterbyletter.length; i++){

        if(letterbyletter[i] == char){
            //console.log(letterbyletter[i] + "este es el valor de char "+ char);
            document.getElementById(count).innerHTML = values;
            mistakes++;
            found = true;
        }
      count++;
    }

    if(!found){
        lives = lives-1;
        var rest = lives -countLost;
        console.log("remaining lives:" + rest);
        document.getElementById("lives").innerHTML = rest;
        countLost++;

        if(rest === 0){

          for(asciiI; asciiI <= asciiF; asciiI++)
            document.getElementById(String.fromCharCode(asciiI)).disabled = true;
          alert("you lose this one, but take it easy, you can try again...");

          for(var i = 0; i <letterbyletter.length; i++){
            document.getElementById(i).innerHTML = letterbyletter[i];
          }

        }


    }else{
      console.log("you find this  ");
      missingL += mistakes;
      console.log("misssing letters for win: --> " + (size - missingL));
      if( size - missingL == 0){
        for(asciiI; asciiI <= asciiF; asciiI++)
          document.getElementById(String.fromCharCode(asciiI)).disabled = true;
        alert("congratulations, you won this one...");
      }
    }

  }else{

    if (optionsList.length == 0){
      optionsList = list.split(',');
    }
      var possibleOptions = [];
      var isSavedC = false;


      for (var i = 0; i < optionsList.length; i++) {
        if (!optionsList[i].includes(char)){
          for (var j = 0; j < possibleOptions.length+1; j++) {
            if (possibleOptions[j] === undefined){
              if (isSavedC == false){
                possibleOptions[j] = [];
                possibleOptions[j].push(optionsList[i]);
                isSavedC = true;
              }
            }else{
              if (comparing(possibleOptions[j][0],char,optionsList[i])){
                possibleOptions[j].push(optionsList[i]);
                isSavedC=true;
              }
            }
          }
          isSavedC = false;

        }
      }
      optionsList = possibleOptions[0].slice(0);
      console.log("posible alternatives....");
      console.log(optionsList);

      var evilChoice =  Math.floor((Math.random() * optionsList.length));
      //seleccionando otra palabra que no esta en el servidor
      var listEvil = optionsList[evilChoice].split('');
      console.log(listEvil);


      lives = lives-1;
      var missing = lives -countLost;
      document.getElementById("lives").innerHTML = missing;
      console.log("remaining lives:" + missing);
      countLost++;

      if(missing == 0){
        for(asciiI; asciiI <= asciiF; asciiI++)
          document.getElementById(String.fromCharCode(asciiI)).disabled = true;

        for(var n = 0; n < listEvil.length;n++)
            document.getElementById(n).innerHTML = listEvil[n];
        alert("you lose this one, but take it easy, you can try again...");
      } else if( size - missingL == 0){
        for(asciiI; asciiI <= asciiF; asciiI++)
          document.getElementById(String.fromCharCode(asciiI)).disabled = true;
        alert("congratulations, you won this one...");
      }

      possibleOptions.length = 0;
  }
}

function validateForm() {
    var x = document.forms["Form"]["size"].value;
    var y = document.forms["Form"]["lives"].value;
    if (x == null || x == "") {
        alert("the length must be filled");
        return false;
    }
    if (y == null || y == "") {
        alert("the lives must be filled");
        return false;
    }
}

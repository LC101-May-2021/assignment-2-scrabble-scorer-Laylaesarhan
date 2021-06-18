// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let info = input.question("Let's play some scrabble! Enter a word to score:");
  return info;
  // console.log("Let's play some scrabble! Enter a word:");
};



let simpleScore = function(word) {
  return word.length;
}
const vowelBonusStructrue = {
  1: ['L', 'N', 'R', 'S', 'T','D', 'G','B', 'C', 'M', 'P','F', 'H', 'V', 'W', 'Y','K','J', 'X','Q', 'Z'],
  3: ['A', 'E', 'I', 'O', 'U']
}

let vowelBonusScore = function(word) {
  	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in vowelBonusStructrue) {
 
		 if (vowelBonusStructrue[pointValue].includes(word[i])) { 
			letterPoints += Number(pointValue); 
		 }
 
	  }
	}
	return letterPoints;
 }



let scrabbleScore = function(word){
let score = 0;
for (let i = 0; i < word.length; i++){
 score += Number(newPointStructure[word[i]])
}
return score ; 


}

const scoringAlgorithms = [
  {name: "Simple Score",
  description:"Each letter is worth 1 point.",
  scorerFunction:simpleScore},
  {name:"Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scorerFunction:vowelBonusScore},
  {name:"Scrabble",
  description:"The traditional scoring algorithm.",
  scorerFunction:oldScrabbleScorer}];

function scorerPrompt() {
 console.log("Which scoring algorithm would you like to use? ");
  for (let i=0; i < scoringAlgorithms.length; i++){
    console.log(scoringAlgorithms[i].name);
  }
 let scoreChoice = input.question("Enter 0, 1, or 2: ");
 return scoringAlgorithms[scoreChoice];
}

function transform(object) {
  let newObject = {};
  for (let score in object){
    for (let i = 0; i < object[score].length; i++){
      // console.log(object[score][i]);
      // console.log(score);
      newObject[object[score][i]] = score;
    }
  }
  return newObject;
};

let newPointStructure = transform(oldPointStructure);
scoringAlgorithms[2]["scorerFunction"] = scrabbleScore

// call functions here
function runProgram() {
   let word = initialPrompt();
   scorerPrompt(word);
  let oldScrabblePoints = oldScrabbleScorer(word);
  let simplePoints = simpleScore(word);
  let bonusScorePoints = vowelBonusScore(word);
  let scorerObject = scorerPrompt();
  let score = scorerObject.scorerFunction(word);
  console.log(`The score of ${word} is ${score}`);
 }

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};


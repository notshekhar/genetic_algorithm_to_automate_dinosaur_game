let {Dino} = require('./dino')
export function nextGeneration(died_dinos, canvas, i) {
  let population = died_dinos.length
  let dinos = []
  calculateFitness(died_dinos);
  for (let j = 0; j < population; j++) {
    dinos.push(pickOne(died_dinos, canvas, i));
  }
  return dinos
}

function pickOne(died_dinos, canvas, i) {
  let index = 0;
  let r = Math.random(1);
  while (r > 0) {
    r = r - died_dinos[index].fitness;
    index++;
  }
  index--;
  let b = died_dinos[index];
  let child = new Dino(40, 50, canvas, i, b.brain);
  child.mutate(0.1);
  return child;
}

function calculateFitness(died_dinos) {
  // Normalize all values
  let sum = 0;
  for (let dino of died_dinos) {
    sum += dino.score;
  }
  for (let dino of died_dinos) {
    dino.fitness = dino.score / sum;
  }
}
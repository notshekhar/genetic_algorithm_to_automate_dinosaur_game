let {Dino} = require("./dino")
let {Block} = require("./block")
let {nextGeneration} = require("./ga")

// console.log(nextGeneration)
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let hscore_div = document.querySelector('.hscore')
let score_div = document.querySelector('.score')
let score = 0
let image_loaded = false
let game_started = false
const background_color =  'white'
let parallex = 2
let min_distance_between_blocks = 1000
let i = new Image()
i.src = 'dino.png'
i.onload = () => {
  image_loaded = true
}
let now
let population = 10
let dinos = []
for(let j=0; j<population; j++){
  dinos.push(new Dino(40, 50, canvas, i))
}
let died_dinos = []
let blocks = []
let widths = [30, 25]
let heights = [100, 75]
let width = widths[Math.floor(Math.random() * widths.length)]
let height = heights[Math.floor(Math.random() * heights.length)]
blocks.push(new Block((Math.random()*700)+600, width, height, canvas, i))
function draw(){
  if(dinos.length != 0 && image_loaded && game_started){
    restart() 
    if(Math.random()<0.1 && canvas.width-blocks[blocks.length-1].x > min_distance_between_blocks){
      width = widths[Math.floor(Math.random() * widths.length)]
      height = heights[Math.floor(Math.random()*heights.length)]
      blocks.push(new Block(800, width, height, canvas, i))
    }
    if(blocks.length>5){
      blocks.splice(0, 1)
    }
    //clearning canvas
    ctx.fillStyle = background_color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(i, parallex, 54, 281, 10, 0, (canvas.height/2)-4, canvas.width, 7)
    for(let dino of dinos){
      dino.show(ctx)
    }
    for(let dino of dinos){
      for(let block of blocks){
        if(block.x > dino.x){
          dino.move(block.x, block.height)
          break
        }
      }
    }
    
    for(let block of blocks){
      block.show(ctx)
      block.move()
      for (let i=0; i< dinos.length; i++) {
        block.strike(dinos[i])
        if(dinos[i].died){
          died_dinos.unshift(dinos[i])
          dinos.splice(i, 1)
        }
      }
    }
    parallex += 3.7
    if (parallex+281 > 1195){
      parallex = 2
    }
    if(Date.now()-now > 3000){
      min_distance_between_blocks -= 10
      min_distance_between_blocks = constrain(min_distance_between_blocks, 500, 1000)
      now = Date.now()
    }
  }else if(dinos.length == 0){
    ctx.fillStyle = background_color
    ctx.fillRect(0,0,canvas.width, canvas.height)
    ctx.drawImage(i, 654, 14, 192, 12, 100, (canvas.height / 2)-15, canvas.width-200, 30)
    restart()
  }else if(!game_started){
    dinos[0].show(ctx)
    ctx.drawImage(i, 2, 58, 281, 7, 0, (canvas.height / 2), canvas.width, 7)
    restart()
  }
}
function restart(){
  if(!game_started){
    game_started = true
  }
  
  if(dinos.length == 0){
    now = Date.now()
    min_distance_between_blocks = 1000
    blocks = []
    blocks.push(new Block((Math.random() * 700) + 600, width, height, canvas, i))
    //new generation
    dinos = nextGeneration(died_dinos, canvas, i)
    died_dinos = []
    console.log(dinos.length)
  }
}

function constrain(value, min, max) {
  if (value < min) {
    value = min;
  } else if (value > max) {
    value = max;
  } else {
    value = value;
  }
  return value;
}

let interval = setInterval(()=>draw(), 16)
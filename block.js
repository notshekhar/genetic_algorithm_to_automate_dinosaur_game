export class Block{
  constructor(x, width, height, canvas, i){
    this.i = i
    this.x = x;
    this.width = width;
    this.height = height;
    this.y = (canvas.height/2) - this.height;
  }
  show(ctx){
    ctx.drawImage(this.i, 456, 2, 26, 48, this.x, this.y, this.width, this.height)
  }
  move(){
    this.x -= 11;
  }
  strike(dino){
    if((dino.x+dino.width>this.x) && (dino.x<this.x+this.width) && (dino.y+dino.height>this.y)){
      dino.died = true
    }
  }
}
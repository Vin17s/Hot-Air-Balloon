var balloon,database,position

function preload(){
  background1 = loadImage("Hot Air Ballon-01.png");
  ballonImg1 = loadAnimation("Hot Air Ballon-02.png");
  ballonImg2 = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png","Hot Air Ballon-04.png")
}



function setup() {
  database = firebase.database()
  createCanvas(1500,700);
  balloon = createSprite(250,650,150,150);
  balloon.addAnimation("balloon",ballonImg1)
  balloon.scale = 0.5
    var balloonpos = database.ref('balloon/height')
    balloonpos.on("value",readposition,showerror)
}




function draw() {
  background(background1);  
    
    if(keyDown(LEFT_ARROW)){
        updateHeight(-10,0)
        balloon.addAnimation("balloon1",ballonImg2)
    }
    else if(keyDown(RIGHT_ARROW)){
      updateHeight(10,0)
      balloon.addAnimation("balloon1",ballonImg2)
    }
    else if(keyDown(UP_ARROW)){
      updateHeight(0,-10)
      balloon.addAnimation("balloon1",ballonImg2)
      balloon.scale = balloon.scale-0.005
    }
    else if(keyDown(DOWN_ARROW)){
      updateHeight(0,-10)
      balloon.addAnimation("balloon1",ballonImg2)
      balloon.scale = balloon.scale+0.005
    }
  
  drawSprites();
  fill("black")
  textSize(25)
  text("use arrow keys to move the balloon",40,40)
}

function readposition(data){
  position = data.val()
  balloon.x = position.x
  balloon.y = position.y
 }

function showerror(){
  console.log("error in connecting to the database")
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x':position.x + x,
    'y':position.y + y
  })
}


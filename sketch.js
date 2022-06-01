const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;

var stones = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20, "#795548", true);
  //EL TAMAÑO Y UBICACION DE LAS PAREDES SE ADAPTA AL ANCHO DE LA PANTALLA:
  leftWall = new Base(width/8, height / 2 + 50, width/5, 50, "pink", true);
  rightWall = new Base(width*7/8, height / 2 + 50, width/5, 50, "#8d6e63", true);

  /*bridge = new Base(15, { x: width / 2 - 400, y: height / 2 });
  jointPoint = new Base(width - 600, height / 2 + 10, 40, 20, "#8d6e63", true);*/

  //LA POSICION DE LAS "ANCLAS" DEL PUENTE TAMBIÉN DEPENDEN DEL TAMAÑO DE LA PANTALLA.
  bridge = new Bridge(width/80, { x: width *2/ 8, y: height / 2 +50});
  jointPoint = new Base(width*6/8, height / 2 + 50, 40, 20, "red", true);

  /*bridge = new Base(15, { x: width / 2 - 400, y: height / 2 });
  jointPoint = new Bridge(width - 600, height / 2 + 10, 40, 20, "#8d6e63", true);*/

  /*bridge = new Bridge(15, { x: width / 2 - 400, y: height / 2 });
  jointPoint = new Bridge(width - 600, height / 2 + 10, 40, 20, "#8d6e63", true);*/

  
  Matter.Composite.add(bridge.body, jointPoint);

  //Matter.Composite.add(jointPoint);
  
  //Matter.Composite.add(jointPoint, bridge.body);
  
  //Matter.Composite.add(bridge.body);


  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 140);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }
}

function draw() {
  background(51);
  Engine.update(engine);

  ground.show();
  bridge.show();
  leftWall.show();
  rightWall.show();

  for (var stone of stones) {
    stone.show();
  }
}

const LEN = 3500;
const imgFilenames = [
  "artworks/artfight1.png",
  "artworks/bestie.jpg",
  "artworks/outofmymind.jpg",
  "artworks/artfight2.png",
  "artworks/dami_oc_design.png",
  "artworks/study.jpg",

  "artworks/shigora_village.jpg",
  "artworks/sea_swallowed_the_sky.jpg",
  "artworks/shigora_dungeon.jpg",
  "artworks/shigora_pagoda.png", 

  "artworks/caladria_complete_portal.jpg", 
  "artworks/caladria_incomplete_portal.jpg", 
  "artworks/nova_point_1.jpg",
  "artworks/nova_point_2.jpg",
  "artworks/shigora_complete_portal.jpg",
  "artworks/shigora_incomplete_portal.jpg",
  
  "artworks/glitched_library.jpg",
  "artworks/horizontal_wheat_field.jpg",
  "artworks/wheredidmysmilego.jpg",
  "artworks/academic_sludge.png",
  "artworks/chibi_design.jpg",

  // "artworks/sua_or_exploring_an_image.png", // 17
  // "artworks/exploring_image_2.png", // 17
  // "artworks/sua_fanart.jpg", // 18
  // "artworks/color_circle.jpg", // 21
  // "artworks/uju.png" // 23
  // "artworks/gouache_study.jpg", // 16

];

let imgs = [];

async function setup() {

    // Load images

    for (let i = 0; i < imgFilenames.length; i++) {
        let newImg = await loadImage(imgFilenames[i]);
        imgs.push(newImg);
    }

    // Setup canvas

    createCanvas(windowWidth, windowHeight, WEBGL);

    // Camera

    camera(0, 0, 6000);

    // Settings

    angleMode(DEGREES);
    noStroke();


}

function draw() {
  // perspective(zoomy.value());
  
  background(0);

  // rotateY(frameCount * 0.2);

  directionalLight(color(255), 1, 1, 10);
  // directionalLight(color(255), 0, 10, -10);
  
  ambientLight(color(100));
  specularMaterial(100);
  shininess(500);
  
  // Wall
  push();
  translate(0, 0, 0);
  box(LEN);
  pop();

  // Draw images

  ambientLight(0);

  positionAndDrawImages();
  
  // Allow the user to rotate, zoom, and move the camera around
  orbitControl();

}

function positionAndDrawImages() {
  randomSeed(34);

  // Characters wall
  push();

    rotateZ(90);
    rotateY(90);
    translate(0, 0, -0.5 * LEN);

    drawImage(imgs[1], 0.35, -LEN * 0.27, -LEN * 0.27); // bestiee
    drawImage(imgs[2], 0.6, LEN * 0.23, LEN * 0.23); // outofmymind
    drawImage(imgs[3], 0.76, LEN * 0.08, -LEN * 0.28); // artfight 2
    drawImage(imgs[4], 0.33, LEN * 0.36, -LEN * 0.28); // dami 2
    drawImage(imgs[5], 0.45, -LEN * 0.27, LEN * 0.22); // study

  pop();

  // Two Shigora backgrounds and asset

  push();

    translate(0, 0, -0.5 * LEN);
    rotateZ(90);

    drawImage(imgs[7], 0.56, 0, LEN * 0.24); // sea swallowed the sky
    drawImage(imgs[8], 0.31, LEN * 0.14, -LEN * 0.23); // dungeon
    drawImage(imgs[9], 0.6, -LEN * 0.36, -LEN * 0.23); // pagoda

  pop();

  // Portals

  let portalSize = 0.85, off1 = LEN * 0.23, off2 = LEN * 0.32;
  push();
    translate(LEN * 0.5, 0, 0);   
    rotateY(90);
    drawImage(imgs[10], portalSize, -off1, -off2, 2); // caladria complete
    drawImage(imgs[11], portalSize, off1, -off2, 2); // caladria incomplete
    drawImage(imgs[12], portalSize, -off1, off2*0.035, 2); // nova point 1
    drawImage(imgs[13], portalSize, off1, off2*0.035, 2); // nova point 2
    drawImage(imgs[14], portalSize, -off1, off2, 2); // shigora complete
    drawImage(imgs[15], portalSize, off1, off2, 2); // shigora incomplete
  pop();

  // Misc 1: Digital art, one traditional art

  push();
    translate(0, 0, LEN * 0.5);
    drawImage(imgs[6], 0.2, LEN * 0.2, -LEN * 0.235, 2); // village
    drawImage(imgs[16], 0.25, -LEN * 0.26, -LEN * 0.26, 2); // library glitched
    drawImage(imgs[17], 0.23, LEN * 0.36, LEN * 0.26, 2); // wheat field
    drawImage(imgs[18], 0.45, -LEN * 0.3, LEN * 0.23, 2); // where did my smile go (two original characters)
    drawImage(imgs[19], 0.55, LEN * 0.06, LEN * 0.14, 2); // academic sludge
    drawImage(imgs[20], 0.38, LEN * 0.06, LEN * 0.38, 2); // chibi design
  pop();

    // drawImage(imgs[0], 1.0, LEN * 0.37, -LEN * 0.4); // artfight 1
  push();
  pop();



}

function drawImage(img, scl = 1, x = 0, y = 0, opt = 1) {
  // depth of box

  let d = 20 + random(-5, 5) + 
          10*sin(2*frameCount + random(30));

  // draw
  push();

  translate(y, x, 0);
  specularMaterial(50);
  shininess(1000);
  texture(img);

  if (opt == 1)
    box(img.height * scl, img.width * scl, d);
  else
    box(img.width * scl, img.height * scl, d);

  pop();

}
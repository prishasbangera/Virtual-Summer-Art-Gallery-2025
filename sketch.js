const LEN = 3500; // cube base
const NUM_STARS = 200;
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

  "artworks/sua_or_exploring_an_image.png",
  "artworks/exploring_image_2.png",
  "artworks/sua_fanart.jpg",
  "artworks/gouache_study.jpg",
  "artworks/color_circle.jpg",
  "artworks/uju.png"

];

let imgs = [];
let signImg; // The title/author on the bottom

async function setup() {

    // Load images

    for (let i = 0; i < imgFilenames.length; i++) {
        let newImg = await loadImage(imgFilenames[i]);
        imgs.push(newImg);
    }

    // Hide loading text

    document.getElementById("loading-text").style.display = "none";

    // Setup canvas

    createCanvas(windowWidth, windowHeight, WEBGL);

    // Camera

    camera(0, 0, 6000);

    // Settings

    angleMode(DEGREES);
    noStroke();

    // Create the sign

    signImg = createGraphics(LEN, LEN, P2D);
    signImg.textAlign(CENTER, CENTER);
    signImg.rectMode(CENTER);
    signImg.noStroke();

}

function draw() {

  perspective(70, 1.0, 50, LEN * 3);
  
  background(0);

  // Lighting

  directionalLight(255, 255, 255, 1, 1, 0);
  directionalLight(255, 255, 255, 0, -1, 1);
  directionalLight(255, 255, 255, -1, 0.5, -1);

  ambientLight(color(10));
  specularMaterial(10);
  shininess(500);
  
  // Wall

  push();
  translate(0, 0, 0);
  box(LEN);
  pop();

  // Draw star
  drawStars();

  // Draw images

  positionAndDrawImages();

  // Draw sign
  
  drawSign();
  
  // Allow the user to rotate, zoom, and move the camera around
  orbitControl();

}

function drawStars() {

    randomSeed(100);

    push();
    noLights();

    translate(0, 0);
    noStroke();
    fill(255, 125);

    for (let i = 0; i < NUM_STARS; i++) {
      // distance from origin
      let rad = randomGaussian(LEN * 1.7, 100);

      // size of star
      let siz = random(5, 25);

      push();
      rotateX(random(0, 360));
      rotateZ(random(0, 360));
      translate(rad, 0, 0);

      sphere(siz * 0.7);
      sphere(siz);

      pop();
    }
    pop();
}

function positionAndDrawImages() {
  randomSeed(34);

  // Characters wall
  push();

    rotateZ(90);
    rotateY(90);
    translate(0, 0, -0.5 * LEN);

    drawImage(imgs[1], 0.35, -LEN * 0.27, -LEN * 0.27); // bestiee
    drawImage(imgs[2], 0.63, LEN * 0.22, LEN * 0.22); // outofmymind
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

  // Misc 1:

  push();
    translate(0, 0, LEN * 0.5);
    drawImage(imgs[6], 0.2, LEN * 0.2, -LEN * 0.235, 2); // village
    drawImage(imgs[16], 0.25, -LEN * 0.26, -LEN * 0.26, 2); // library glitched
    drawImage(imgs[17], 0.23, LEN * 0.36, LEN * 0.26, 2); // wheat field
    drawImage(imgs[18], 0.45, -LEN * 0.3, LEN * 0.23, 2); // where did my smile go (two original characters)
    drawImage(imgs[19], 0.55, LEN * 0.06, LEN * 0.14, 2); // academic sludge
    drawImage(imgs[20], 0.38, LEN * 0.06, LEN * 0.38, 2); // chibi design
  pop();

  // Misc 2

  let squareSize = 1.75;
  push();

    translate(-LEN * 0.5, 0, 0);
    rotateY(90);
    rotateZ(90);

    drawImage(imgs[0], 1.8, -LEN * 0.28, LEN * 0.27); // artfight 1
    drawImage(imgs[21], squareSize, LEN * 0.30, -LEN * 0.32); // sua/exploring image 1
    drawImage(imgs[24], 0.35, LEN * 0.30, 0); // gouache study
    drawImage(imgs[22], squareSize, LEN * 0.30, LEN * 0.32); // sua/exploring image 2
    drawImage(imgs[23], 1.0, -LEN * 0.18, -LEN * 0.2); // sua fan art
    drawImage(imgs[25], 0.55, LEN * 0.02, LEN * 0.39); // color circle
    drawImage(imgs[26], 1.0, LEN * 0.02, LEN * 0.21); // uju

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

function drawSign() {

  // Update sign image

  updateAnimatedSign();

  push();

    translate(0, LEN * 0.5, 0);
    rotateX(90);
    rotateZ(-90);
    texture(signImg);
    box(signImg.width, signImg.height, 5);

  pop();
}

function updateAnimatedSign() {
  
  // flickering
  signImg.background(255);
  // let off = (round(noise(frameCount * 0.03) * 20)) * 0.05 * 0.5 + 0.9;
  // signImg.background(247 * off, 173 * off, 222 * off); // flicker

  // animated rectangles as decor
  let rectWidth = 90;
  randomSeed(20);
  for (let x = 0; x <= signImg.width + rectWidth; x += rectWidth + 5) {
    signImg.fill(random(100, 255), 100, random(100, 255), 50);
    signImg.rect(x, 
      random(signImg.height) + random(-1, 1) * sin(frameCount + random(56)) * 100,
      rectWidth,// * 1.7,
      1700 + 1000 * random(-0.7, 1)); // height
  }

  // text
  signImg.textFont('serif', 200)
  signImg.textStyle(BOLDITALIC);
  signImg.fill(55, 27, 84);
  signImg.text("Virtual Summer Art Gallery\nPrisha Bangera, 2025", signImg.width * 0.5, signImg.height * 0.5);

}


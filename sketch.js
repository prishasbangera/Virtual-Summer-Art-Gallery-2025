let imgs = [];
const LEN = 3500;
const imgFilenames = [
  "artworks/artfight1.png",
  "artworks/bestie.jpg",
  "artworks/outofmymind.jpg", // 9
  "artworks/artfight2.png", // 15
  "artworks/dami_oc_design.png", // 22
  "artworks/study.jpg", // 12

  "artworks/shigora_village.jpg", // 2
  "artworks/sea_swallowed_the_sky.jpg",
  "artworks/shigora_dungeon.jpg",
  "artworks/shigora_pagoda.png", // 14

  "artworks/caladria_complete_portal.jpg" // 3

  // "artworks/caladria_incomplete_portal.jpg", // 4
  // "artworks/glitched_library.jpg", // 5
  // "artworks/horizontal_wheat_field.jpg", // 6
  // "artworks/nova_point_1.jpg", // 7
  // "artworks/nova_point_2.jpg", // 8
  // "artworks/shigora_complete_portal.jpg", // 10
  // "artworks/shigora_incomplete_portal.jpg", // 11
  // "artworks/wheredidmysmilego.jpg", // 13
  // "artworks/gouache_study.jpg", // 16
  // "artworks/sua_or_exploring_an_image.png", // 17
  // "artworks/sua_fanart.jpg", // 18
  // "artworks/academic_sludge.png", // 19
  // "artworks/chibi_design.jpg", // 20
  // "artworks/color_circle.jpg", // 21
  // "artworks/uju.png" // 23
];


async function setup() {

    // Load images

    for (let i = 0; i < imgFilenames.length; i++) {
        let newImg = await loadImage(imgFilenames[i]);
        imgs.push(newImg);
    }

    // Setup canvas

    createCanvas(windowWidth, windowHeight, WEBGL);

    camera(0, 0, -6000);

    angleMode(DEGREES);
    noStroke();


}

function draw() {
  // perspective(zoomy.value());
  
  background(0);

  rotateZ(90);
  rotateY(90);

  // rotateY(frameCount * 0.2);

  directionalLight(color(255), 1, 1, 10);
  // directionalLight(color(255), 0, 10, -10);
  
  ambientLight(color(5));
  specularMaterial(100);
  shininess(500);
  
  // Wall
  push();
  translate(0, 0, 0);
  box(LEN);
  pop();
  
  positionAndDrawImages();
  
  // Allow the user to rotate, zoom, and move the camera around
  orbitControl();
}

function positionAndDrawImages() {
  randomSeed(34);

  // Characters wall
  push();
    translate(0, 0, -0.5 * LEN);

    drawImage(imgs[0], 1.0, LEN * 0.37, -LEN * 0.4); // artfight 1
    drawImage(imgs[1], 0.35, -LEN * 0.27, -LEN * 0.27); // bestiee
    drawImage(imgs[2], 0.5, LEN * 0.26, LEN * 0.26); // outofmymind
    drawImage(imgs[3], 0.65, LEN * 0.13, -LEN * 0.3); // artfight 2
    drawImage(imgs[4], 0.23, LEN * 0.36, -LEN * 0.13); // dami 2
    drawImage(imgs[5], 0.45, -LEN * 0.27, LEN * 0.23); // study

  pop();

  // Shigora

  push();
    rotateY(90);
    translate(0, 0, -0.5 * LEN);
    drawImage(imgs[6], 0.2, 0, -LEN * 0.18); // village
    drawImage(imgs[7], 0.4, -LEN * 0.15, LEN * 0.3); // sea swallowed the sky
    drawImage(imgs[8], 0.3, -LEN * 0.15, -LEN * 0.28); // dungeon
    drawImage(imgs[9], 1.0, LEN * 0.15, LEN * 0.28); // pagoda
  pop();

  // Portals

  push();
    translate(LEN * 0.5, 0, 0);
    rotateY(90);
    rotateZ(90);
    drawImage(imgs[10], 1.0, LEN * 0.15, LEN * 0.28); // pagoda
  pop();
}

function drawImage(img, scl = 1, x = 0, y = 0) {
  // depth of box

  let d = 20 + random(-5, 5) + 
          10*sin(2*frameCount + random(30));

  // draw
  push();
  translate(y, x, 0);
  specularMaterial(50);
  shininess(1000);
  texture(img);
  box(img.height * scl, img.width * scl, d);
  pop();
}
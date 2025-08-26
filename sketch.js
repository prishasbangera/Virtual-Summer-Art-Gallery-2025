let imgs = [];
const LEN = 2000;
const imgFilenames = [
  "artworks/artfight1.png",
  "artworks/bestie.jpg",
  "artworks/caladria_complete.png",
  "artworks/caladria_incomplete_portal.jpg",
  "artworks/glitched_library.jpg",
  "artworks/horizontal_wheat_field.jpg",
  "artworks/nova_point_1.jpg",
  "artworks/nova_point_2.jpg",
  "artworks/outofmymind.jpg",
  "artworks/shigora_complete_portal.jpg",
  "artworks/shigora_incomplete_portal.jpg",
  "artworks/study.jpg",
  "artworks/wheredidmysmilego.jpg"
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
  // rotateY(frameCount * 0.2);

  // pointLight(color(255), 0, 0, -100);
  directionalLight(color(255), 1, 1, 10);
  directionalLight(color(255), -1, -1, -10);

  // pointLight(255, 255, 255, 0, -25, 0);
  
  ambientLight(color(25));
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

  // Front wall
  push();
  translate(0, 0, -0.5 * LEN);

  drawImage(imgs[0], 1.0, LEN * 0.26, -LEN * 0.3);
  drawImage(imgs[1], 0.25, -LEN * 0.2, -LEN * 0.2);

  pop();
}

function drawImage(img, scl = 1, x = 0, y = 0) {
  // depth of box

  let d = 20 + random(-5, 5) + 
          10*sin(5*frameCount + random(30));

  // draw
  push();
  translate(y, x, 0);
  specularMaterial(50);
  shininess(1000);
  texture(img);
  box(img.height * scl, img.width * scl, d);
  pop();
}
// mengatur tinggi dan lebar canvas
const width = 800;
const height = 500;
// =====================//

// Background Color
let red=0;
let green=0;
let blue=0;
// 


// Variabel yang digunakan untuk membuat tinggi,kecepatan ombak,dan warna ombak
let waveHeight = 50;
let waveSpeed = 0.01;
let waveColor;
// 


// variabel yang digunakan untuk membuat ukuran matahri,warna matahari,dan posisi vertikan dan horizontal matahari
let sunSize = 60;
let sunColor;
let sunX = 400;
let sunY = 400
// 

// Set up boat variables
let boatWidth = 100;
let boatHeight = 50;
let boatX = width / 2;
let boatY;

// variabel untuk mengatur kecepatan animasi dari kapal
let boatSpeed = 1;
let boatDirection = 1;
// 

function setup() {
  createCanvas(width, height);
  // Mengatur Warna Ombaknya biru
  waveColor = color(0, 100, 200); 
  //
  
  // Mengatur Warna Matahari
  sunColor = color(255, 255, 0);
  // 
  
  //Memberikan Posisi agar Kapal berada diatas Ombak
  boatY = height / 2 - waveHeight - boatHeight / 2; 
  //   
}

function draw() {
  
  //Transisi warna ketika matahari terbit    
  colorTransition();

  //Menggabar Matahari
  drawSun();

  // Menggambar Ombak
  drawWaves();

  //Menggambar Awan
  drawClouds();

  // Perbarui properti ombak
  updateWave();
  
// Perbarui posisi kapal dan gambar kapal
  updateBoat()
  
}

function drawClouds() {
  drawCloudShape(60, 100, 50);
  drawCloudShape(190, 80, 70);
  drawCloudShape(350, 80, 60);
  drawCloudShape(450,80,50);
  drawCloudShape(600, 140  ,70);
  drawCloudShape(750, 150, 50);
}

function drawCloudShape(x, y, size) {
  noStroke();
  fill(255); 

  // Mengambar awan
  ellipse(x + size / 3, y, size * 1.2, size * 1.2);
  ellipse(x + size / 1.5, y, size, size);
  ellipse(x - size / 5, y - size / 4, size, size);
  ellipse(x + size / 5, y - size / 4, size * 1.2, size * 1.2);
  ellipse(x + size / 3, y - size / 2, size, size);
}

function drawSun() {
//   ketika posisi Vertikal(y) matahari belum mencapai 35 maka akan terus terus dikurangi dengan 2 ,sampai jika sudah posisi Y sudah 35 maka animasi akan berhenti
  noStroke();
  fill(sunColor)
  if (sunY <= height && sunY > 35) {
    sunY -= 2
    ellipse(sunX, sunY, sunSize, sunSize);
  } else if (sunY <= 35) {
    ellipse(sunX, 35, sunSize, sunSize);
  }
//   
}

function colorTransition() {
  if (green <= 165 || red <= 255) {
    background(red += 2, green++, blue);
  } else {
    background(red, green, blue);
  }
}

function drawWaves() {
  noStroke();
  fill(waveColor);
  // Draw a series of connected curves
  //   Menggambar agar vertek terkoneksi satu sama lain
  beginShape();
//   Melakukan perulangan dengan x coordinat setiap point pada vertek menggunakan for
  for (let x = 0; x <= width; x += 40) {
    //Calculate the y-coordinate based on the sine function
    //agar ombak gelombang stabil kita menambahkan function sin(Trigonometri)
    const y = height / 2 + sin(x * waveSpeed)* waveHeight;
    //Menambahkan vertek untuk setiap point     
    vertex(x, y);
  }
  vertex(width, height);
  vertex(0, height);

  endShape(CLOSE);
}

function updateWave() {
  // Meningkatkan tinggi ombak setiap waktu
  waveHeight = height / 70 + sin(frameCount * 0.1) * (height / 80);
 
}

// function agar kapal bergerak

function updateBoat() {
  // Mengerakan Perahu Secara Horizontal
  boatX += boatSpeed * boatDirection;
  //   mengubah posisi kapal ketika posisi x nya mentok
  if (boatX + boatWidth / 2 >= width || boatX - boatWidth / 2 <= 0) {
    boatDirection *= -1;
  }

  
//   agar gerakan perahu mengikuti ombak maka kita masukkan variabel boatY kedalam objek "boat"
  boatY = height / 2 - waveHeight - boatHeight / 2;
   var boat  = new Boat(boatX,boatY)
   boat.display()
    
}

class Boat {
  constructor(x, y) {
    //posisi corrdinate x kapal
    this.x = x;
    //
    //posisi corrdinate y kapal
    this.y = y;
    //     
  }

  display() {
    //translate untuk mengerakan objek berdasarkan posisi cooridante x dan y 
    translate(this.x, this.y);
//     
    fill(0, 255, 0);
    ellipse(0,0,20);
    //body kapal
    noStroke();
    fill('red');
    quad(-150, -50, 150, -50, 100, 50, -100, 50);
    //
    
    //layer kapal 1
    noStroke();
    fill('white');
    triangle(-110, -50, 10, -50, 10, -200);
    // 
    
    
    noStroke();
    fill('white');
    triangle(110, -50, 20, -50, 20, -180);
    
  }
}

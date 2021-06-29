import "./reset.css";
import "./style.css";
import * as THREE from "three";

// Initialization
const scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
//let body = document.getElementsByTagName("body");

renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("board").appendChild(renderer.domElement);

// Handle resize event
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

camera.position.z = 100;

// Create light
let directLight = new THREE.DirectionalLight("#fff", 4);
directLight.position.set(0, 7, 5);
scene.add(directLight);

var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

const extrudeSettings = { 
  depth: 6, 
  bevelEnabled: true, 
  bevelSegments: 2, 
  steps: 2, 
  bevelSize: 1, 
  bevelThickness: 1
};

const width = 40, height = 40;
const shape = new THREE.Shape();

shape.moveTo( -width, -height );
    shape.lineTo( width, -height );
    shape.lineTo( width, height );
    shape.lineTo( -width, height );

//const geometry = new THREE.ShapeGeometry( heartShape );
const geometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material ) ;
scene.add( mesh );


function update(){
  mesh.rotation.y += 0.01;
  requestAnimationFrame( update );
	renderer.render( scene, camera );  
}

update()

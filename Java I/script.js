import * as THREE from 'three';

const scene = new THREE.Scene();

// Create geometries for the three spheres with different sizes
const geometryBase = new THREE.SphereGeometry(0.7, 32, 32); // Largest sphere (bottom)
const geometryBody = new THREE.SphereGeometry(0.5, 32, 32); // Medium sphere (middle)
const geometryHead = new THREE.SphereGeometry(0.3, 32, 32); // Smallest sphere (top)

// Material for the spheres (white color)
const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White color for spheres

// Create 3 spheres with different sizes
const base = new THREE.Mesh(geometryBase, material);
base.position.y = -0.8; // Adjust position to stack

const body = new THREE.Mesh(geometryBody, material);
body.position.y = 0.35; // Adjust position to stack

const head = new THREE.Mesh(geometryHead, material);
head.position.y = 1.0; // Adjust position to stack

// Add the spheres to the scene
scene.add(base);
scene.add(body);
scene.add(head);


const capBaseGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32); 
const capTopGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.4, 32); 

const capMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); 


const capBrim = new THREE.Mesh(capBaseGeometry, capMaterial);
capBrim.position.y = 1.3; // Position on top of the head
capBrim.rotation.x = Math.PI * 0.5; 

const capTop = new THREE.Mesh(capTopGeometry, capMaterial);
capTop.position.y = 1.5; 


scene.add(capBrim);
scene.add(capTop);

// Set the sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5; // Move the camera back so we can see the snowman
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.getElementById("scene").appendChild(renderer.domElement);

// Render the scene
renderer.render(scene, camera);

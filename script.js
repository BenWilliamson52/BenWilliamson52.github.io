import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

const civic = new URL('nissan_skyline_r32_gt-r.glb', import.meta.url);

// Renderer Setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a label renderer to render 2D HTML elements
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

// Scene & Camera Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFFF); // Light grey background
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(4, 5, 10);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// Lighting Setup
const ambientLight = new THREE.AmbientLight(0x7d90e3, 3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
directionalLight.position.set(10, 2, 3);
directionalLight.castShadow = true;
directionalLight.shadow.camera.left = -20;
directionalLight.shadow.camera.right = 20;
directionalLight.shadow.camera.top = 20;
directionalLight.shadow.camera.bottom = -20;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3);
directionalLight2.position.set(-10, 2, 3);
directionalLight2.shadow.camera.left = -20;
directionalLight2.shadow.camera.right = 20;
directionalLight2.shadow.camera.top = 20;
directionalLight2.shadow.camera.bottom = -20;
directionalLight2.shadow.camera.near = 0.1;
directionalLight2.shadow.camera.far = 100;
directionalLight2.shadow.mapSize.width = 2048;
directionalLight2.shadow.mapSize.height = 2048;
directionalLight2.castShadow = true;
scene.add(directionalLight2);

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight3.position.set(0, 2, -3);
directionalLight3.shadow.camera.left = -20;
directionalLight3.shadow.camera.right = 20;
directionalLight3.shadow.camera.top = 20;
directionalLight3.shadow.camera.bottom = -20;
directionalLight3.shadow.camera.near = 0.1;
directionalLight3.shadow.camera.far = 100;
directionalLight3.shadow.mapSize.width = 2048;
directionalLight3.shadow.mapSize.height = 2048;
directionalLight3.castShadow = true;
scene.add(directionalLight3);

/* Load Civic Model */
let civicModel;
const civicLoader = new GLTFLoader();
civicLoader.load(civic.href, function (gltf) {
    civicModel = gltf.scene;
    scene.add(civicModel);
    civicModel.scale.set(1, 1, 1);
    civicModel.position.set(0, 0, 0);
    civicModel.rotation.set(0, 0, 0);

    let bbox = new THREE.Box3().setFromObject(civicModel);
    let size = bbox.getSize(new THREE.Vector3());
    civicModel.position.y -= bbox.min.y;

    civicModel.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
}, undefined, function (error) {
    console.error("Error loading civic model:", error);
});


/* Cylinder */
const cylinderGeometry = new THREE.CylinderGeometry(5, 6, 1, 64);
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x080808, roughness: 0.7, metalness: 0.7 });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.y = -0.5;
cylinder.castShadow = true;
cylinder.receiveShadow = true;
scene.add(cylinder);

/* Box Objects */
// Commenting out the box creation code so it won't be displayed on screen

/*
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 4, 0);
box.castShadow = true;
box.receiveShadow = true;
scene.add(box);
*/

// Static Text (top left corner)
const staticTextDiv = document.createElement('div');
staticTextDiv.textContent = 'Nissan Skyline R32';
staticTextDiv.style.position = 'absolute';
staticTextDiv.style.top = '-400px';
staticTextDiv.style.left = '-750px';
staticTextDiv.style.fontSize = '30px';
staticTextDiv.style.fontFamily = "'Roboto', sans-serif";
staticTextDiv.style.fontWeight = 'bold';
staticTextDiv.style.fontStyle = 'italic';
staticTextDiv.style.color = 'black';

// Convert static text into CSS2DObject
const staticText = new CSS2DObject(staticTextDiv);
scene.add(staticText);  // Attach to the scene, but it's a 2D overlay

// Additional Text 1 (next to the first one)
const staticTextDiv2 = document.createElement('div');
staticTextDiv2.textContent = 'Performance Model';
staticTextDiv2.style.position = 'absolute';
staticTextDiv2.style.top = '-400px';
staticTextDiv2.style.left = '800px';  // Slightly to the right of the original text
staticTextDiv2.style.fontSize = '18px';
staticTextDiv2.style.fontFamily = "'Roboto', sans-serif";
staticTextDiv2.style.fontWeight = 'bold';
staticTextDiv2.style.fontStyle = 'italic';
staticTextDiv2.style.color = 'black';

// Convert static text into CSS2DObject
const staticText2 = new CSS2DObject(staticTextDiv2);
scene.add(staticText2);

// Additional Text 2 (next to the second one) - Clickable
const staticTextDiv3 = document.createElement('div');
staticTextDiv3.innerHTML = '<a href="https://www.youtube.com/" target="_blank" style="text-decoration: none; color: black; cursor: pointer;">Turbocharged Engine</a>';
staticTextDiv3.style.position = 'absolute';
staticTextDiv3.style.top = '-400px';
staticTextDiv3.style.left = '550px';
staticTextDiv3.style.fontSize = '18px';
staticTextDiv3.style.fontFamily = "'Roboto', sans-serif";
staticTextDiv3.style.fontWeight = 'bold';
staticTextDiv3.style.fontStyle = 'italic';

// Allow interactions with this element
staticTextDiv3.style.pointerEvents = 'auto';

// Convert static text into CSS2DObject
const staticText3 = new CSS2DObject(staticTextDiv3);
scene.add(staticText3);


/* Animation Loop */
function animate() {
    // Commented out the box rotation code
    // box.rotation.y += 0.010;
    if (civicModel) {
        civicModel.rotation.y += 0.0003;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    labelRenderer.render(scene, camera);  // Render 2D text overlay
}

animate();




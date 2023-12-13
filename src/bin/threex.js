import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/loaders/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

export let character3d = "../../images/3d/mb-lab_base.gltf";
const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const light = new THREE.PointLight(0xffffff, 1000);
light.position.set(0.8, 1.4, 1.0);
scene.add(light);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0.8, 1.4, 1.0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);

const material = new THREE.MeshNormalMaterial();

const fbxLoader = new FBXLoader();
fbxLoader.load(
  character3d,
  (object) => {
    object.traverse(function (child) {
      if (child.isMesh) {
        child.material = material;
        if (child.material) {
          child.material.transparent = false;
        }
      }
    });
    object.scale.set(0.01, 0.01, 0.01);
    scene.add(object);
    progressBar.style.display = "none";
  },
  (xhr) => {
    if (xhr.lengthComputable) {
      var percentComplete = (xhr.loaded / xhr.total) * 100;
      progressBar.value = percentComplete;
      progressBar.style.display = "block";
    }
  },
  (error) => {
    console.log(error);
  }
);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}
window.addEventListener("resize", onWindowResize, false);

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();

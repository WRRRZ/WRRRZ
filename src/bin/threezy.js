import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { bg } from "./mainelements";

export let gltf = null;
export let mixer = null;
export let clock = new THREE.Clock();
export let controls;
export let renderer;
export let scene;
export let camera;
export let character3d = "../../images/3d/base_action_scene.gltf";
export let level3d = "../../images/3d/map.gltf";
export let flex3d = "../../images/3d/base.gltf";

export const init = (model) => {
  let width = window.innerWidth;
  let height = window.innerHeight;

  scene = new THREE.Scene();

  let ambient = new THREE.AmbientLight(0x112233);
  scene.add(ambient);

  let directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  let directionalLight2 = new THREE.DirectionalLight(0xffeedd);
  directionalLight2.position.set(0, 5, -5);
  scene.add(directionalLight2);

  camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);
  camera.position.set(2, 2, 5);

  let manager = new THREE.LoadingManager();
  manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
  };

  let loader = new GLTFLoader();
  loader.setCrossOrigin("anonymous");

  let scale;
  model === character3d ? (scale = 2) : (scale = 0.05);
  let url = model;

  loader.load(url, function (data) {
    gltf = data;
    let object = gltf.scene;
    object.scale.set(scale, scale, scale);
    //object.position.y -= 10;
    console.log(object);

    let animations = gltf.animations;
    if (animations && animations.length) {
      mixer = new THREE.AnimationMixer(object);
      for (let i = 0; i < animations.length; i++) {
        let animation = animations[i];
        mixer.clipAction(animation).play();
      }
    }
    scene.add(object);
  });

  let axis = new THREE.AxesHelper(1000);
  // scene.add(axis);

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x001010);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.userPan = false;
  controls.userPanSpeed = 0.0;
  controls.maxDistance = 5000.0;
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.autoRotate = true;
  controls.autoRotateSpeed = -1.0;

  renderer.setSize(width, height);
  bg.appendChild(renderer.domElement);
};

export const animate = () => {
  requestAnimationFrame(animate);
  if (mixer) mixer.update(clock.getDelta());
  controls.update();
  render();
};

export const render = () => {
  renderer.render(scene, camera);
};

export const removeModel = (object) => {
  scene.remove(object.name);
};

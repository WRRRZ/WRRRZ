import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { bg } from "./mainelements";
import { ModifierStack, Twist, Noise, Cloth, UserDefined, Taper, Break, Bloat, Vector3, ModConstant } from "three.modifiers";

export let gltf = null;
export let mixer = null;
export let clock = new THREE.Clock();
export let controls;
export let renderer;
export let scene;
export let camera;
export let character3d = "../../images/3d/idle.gltf";
export let level3d = "../../images/3d/map.gltf";
export let flex3d = "../../images/3d/base.gltf";
export let modifier;
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
  camera.position.set(4, 12, 12);

  let manager = new THREE.LoadingManager();
  manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
  };

  let loader = new GLTFLoader();
  loader.setCrossOrigin("anonymous");

  let scale;
  model === character3d ? (scale = 9) : (scale = 0.66);
  let url = model;
  let object;
  loader.load(url, function (data) {
    gltf = data;
    object = gltf.scene;
    object.scale.set(scale, scale, scale);
    object.position.y -= 10;
    console.log(object);
    if (model === character3d) {
      object.children[0].children[1].material.color.r = Math.random(10);
      object.children[0].children[1].material.color.g = Math.random(10);
      object.children[0].children[1].material.color.b = Math.random(10);
      console.log(object.children[0].children[1].material.color);
    }
    // modifier = new ModifierStack(object.children[2]);
    // modifier.addModifier(cloth);
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
  controls.autoRotateSpeed = -0.5;

  renderer.setSize(width, height);
  bg.appendChild(renderer.domElement);
};

export const animate = () => {
  requestAnimationFrame(animate);
  if (mixer) mixer.update(clock.getDelta());
  // modifier && modifier.apply();
  controls.update();
  render();
};

export const render = () => {
  renderer.render(scene, camera);
  modifier && modifier.apply();
};

export const removeModel = (object) => {
  scene.remove(object.name);
};

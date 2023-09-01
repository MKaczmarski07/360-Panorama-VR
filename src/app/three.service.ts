import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Injectable({
  providedIn: 'root',
})
export class ThreeService {
  isLoading = true;
  progress = 0;
  constructor() {}

  createScene() {
    const scene = new THREE.Scene();
    const loadingManager = new THREE.LoadingManager();

    // load texture
    loadingManager.onLoad = () => {
      this.isLoading = false;
    };
    const textureLoader = new THREE.TextureLoader(loadingManager);
    const texture = textureLoader.load(
      '../../assets/images/oil_painting_van_gogh_starry_night.jfif'
    );

    // create a new Three.js renderer
    const renderer = new THREE.WebGLRenderer();

    // set the renderer size to the window dimensions
    renderer.setSize(window.innerWidth, window.innerHeight);

    // get the container element for the background
    const backgroundContainer = document.querySelector('.basic-sphere');

    if (backgroundContainer == null) return;

    backgroundContainer.appendChild(renderer.domElement);

    // configure the sphere

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // invert the geometry to render it inside out
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // create a new Three.js perspective camera
    const camera = new THREE.PerspectiveCamera(
      75, // field of view
      window.innerWidth / window.innerHeight, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    // set the camera's position in the scene
    camera.position.set(0, 0, 0);

    // create a new OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(-0.5, 0, -0.5);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;
    // invert the orbit controls direction
    controls.rotateSpeed = -0.25;

    // set the camera's position in the scene
    camera.position.set(0, 0, 0);

    // define the animation function
    function animate() {
      // request the next frame of the animation
      requestAnimationFrame(animate);
      // update the OrbitControls
      controls.update();

      // render the scene with the camera and renderer
      renderer.render(scene, camera);
    }

    animate();

    // update renderer and camera dimensions on window resize
    window.addEventListener('resize', () => {
      const { innerWidth, innerHeight } = window;
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    });
  }
}

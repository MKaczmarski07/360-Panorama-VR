import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root',
})
export class VrThreeService {
  constructor() {}

  rotation: number[] = [];
  alphaOffset: number = 0;

  createScene() {
    const scene = new THREE.Scene();
    const quaternion = new THREE.Quaternion();
    const screenOrientation = window.orientation || 0;

    // create a new Three.js perspective camera
    const camera = new THREE.PerspectiveCamera(
      75, // field of view
      window.innerWidth / window.innerHeight, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );

    // create a new Three.js renderer
    const renderer = new THREE.WebGLRenderer();

    // set the renderer size to the window dimensions
    renderer.setSize(window.innerWidth, window.innerHeight);

    // get the container element for the background
    const backgroundContainer = document.querySelector('.vr-sphere');

    if (backgroundContainer == null) return;

    backgroundContainer.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();

    const texture = loader.load(
      '../../assets/images/oil_painting_van_gogh_starry_night.jfif'
    );

    const geometry = new THREE.SphereGeometry(500, 60, 40);

    // invert the geometry to render it inside out
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });

    const sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);

    // set the camera's position in the scene
    camera.position.set(0, 0, 0);

    const setOrientationQuaternion = function (
      quaternion: THREE.Quaternion,
      alpha: number,
      beta: number,
      gamma: number,
      orient: number
    ) {
      const zee = new THREE.Vector3(0, 0, 1);
      const euler = new THREE.Euler();
      const q0 = new THREE.Quaternion();
      const q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));

      euler.set(beta, alpha, -gamma, 'YXZ');
      quaternion.setFromEuler(euler);
      quaternion.multiply(q1);
      quaternion.multiply(q0.setFromAxisAngle(zee, -orient));
    };

    // enable VR mode based on DeviceOrientation API
    window.addEventListener('deviceorientation', (event) => {
      const alpha = event.alpha
        ? THREE.MathUtils.degToRad(event.alpha) + this.alphaOffset
        : 0;
      const beta = event.beta ? THREE.MathUtils.degToRad(event.beta) : 0;
      const gamma = event.gamma ? THREE.MathUtils.degToRad(event.gamma) : 0;
      const orient = screenOrientation
        ? THREE.MathUtils.degToRad(screenOrientation)
        : 0;

      setOrientationQuaternion(quaternion, alpha, beta, gamma, orient);

      // Apply the quaternion to your camera or object
      camera.quaternion.copy(quaternion);
    });

    function animate() {
      // request the next frame of the animation
      requestAnimationFrame(animate);

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

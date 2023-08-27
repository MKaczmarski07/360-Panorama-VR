import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root',
})
export class VrThreeService {
  constructor() {}

  createScene() {
    const scene = new THREE.Scene();
    console.log('scene', scene);

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
    // camera.rotation.set(Math.PI / 2, 0, 0);

    // enable VR mode based on DeviceOrientation API
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (event) => {
        let alpha = event.alpha;
        let beta = event.beta;
        let gamma = event.gamma;
        if (alpha && beta && gamma) {
          if (beta >= 0 && beta <= 90) {
            if (alpha > 180) {
              alpha = alpha - 360;
            }
            // left/right rotation
            sphere.rotation.y = -THREE.MathUtils.degToRad(alpha);
            // up/down rotation
            camera.rotation.set(
              -Math.PI / 2 + THREE.MathUtils.degToRad(beta),
              0,
              0
            );
          }
        }
      });
    }

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

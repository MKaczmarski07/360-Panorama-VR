import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FileUploadService } from './file-upload.service';

@Injectable({
  providedIn: 'root',
})
export class VrThreeService {
  constructor(private fileUploadService: FileUploadService) {}

  alphaOffset: number = 0;
  isLoading = true;
  orbitControlMode = true;
  controls: OrbitControls | undefined;

  createScene() {
    const scene = new THREE.Scene();
    const quaternion = new THREE.Quaternion();
    const screenOrientation = window.orientation || 0;
    const loadingManager = new THREE.LoadingManager();

    console.log(this.fileUploadService.selectedImageUrl);

    // load texture
    loadingManager.onLoad = () => {
      this.isLoading = false;
    };
    const textureLoader = new THREE.TextureLoader(loadingManager);

    // load default image
    let texture = textureLoader.load(
      '../../assets/images/oil_painting_van_gogh_starry_night.webp'
    );

    // if user uploaded an image, use that instead
    texture =
      this.fileUploadService.selectedImageUrl === null
        ? texture
        : textureLoader.load(this.fileUploadService.selectedImageUrl as string);

    // create a new Three.js renderer
    const renderer = new THREE.WebGLRenderer();

    // set the renderer size to the window dimensions
    renderer.setSize(window.innerWidth, window.innerHeight);

    // get the container element for the background
    const backgroundContainer = document.querySelector('.sphere');

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

    const createControls = () => {
      this.controls = new OrbitControls(camera, renderer.domElement);
      this.controls.target.set(-0.5, 0, -0.5);
      this.controls.update();
      this.controls.enablePan = false;
      this.controls.enableDamping = true;
      // invert the orbit controls direction
      this.controls.rotateSpeed = -0.25;
    };
    createControls();

    const destroyControls = () => {
      if (this.controls == null) return;
      this.controls.dispose();
      renderer.dispose();
    };

    const toggleControls = () => {
      if (this.orbitControlMode) {
        destroyControls();
      } else {
        createControls();
      }
      this.orbitControlMode = !this.orbitControlMode;
    };

    const changeModeButton = document.querySelector('.change-mode-btn');
    if (changeModeButton == null) return;
    changeModeButton.addEventListener('click', toggleControls);

    // set quanterion to get correct 3D orientation
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

      // Apply the quaternion
      if (!this.orbitControlMode) {
        camera.quaternion.copy(quaternion);
      }
    });

    const animate = () => {
      // request the next frame of the animation
      requestAnimationFrame(animate);

      if (this.orbitControlMode) {
        if (this.controls == null) return;
        this.controls.update();
      }

      renderer.render(scene, camera);
    };

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

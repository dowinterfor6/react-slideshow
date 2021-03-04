import * as THREE from "three";

class Slideshow {
  constructor(window, containerElement, images) {
    this.containerElement = containerElement;
    this.images = images;
    this.window = window;
    this.isAnimating = false;

    this.setupScene();
    this.drawInitial();
    // this.animate();
    this.initHelpers();
    this.window.addEventListener("resize", () => this.onWindowResize());

    this.renderer.render(this.scene, this.camera);
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.window.innerWidth / this.window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    // TODO: Set size
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff);
    this.containerElement.appendChild(this.renderer.domElement);
    this.camera.position.z = 10;
  }

  initHelpers() {
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);
  }

  drawInitial() {
    // TODO: Something with loading manager
    // TODO: Lazy loading?
    const geometry = new THREE.PlaneGeometry(9, 6);
    const texture = new THREE.TextureLoader().load(this.images[0].url);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    this.plane = new THREE.Mesh(geometry, material);
    this.plane.position.z += 0.01;
    this.scene.add(this.plane);

    const texture2 = new THREE.TextureLoader().load(this.images[1].url);
    const material2 = new THREE.MeshBasicMaterial({ map: texture2 });
    this.plane2 = new THREE.Mesh(geometry, material2);
    this.plane2.position.z -= 0.01;
    this.plane2.rotation.y = Math.PI;
    this.scene.add(this.plane2);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.plane.rotation.y += 0.01;
    this.plane2.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  customAnimate(target) {
    // TODO: An optimization would be to set rotation speed relative to pi
    //       Then the final adjustment would be extremely small;
    if (target > Math.PI) {
      this.isAnimating = false;
      // TODO: This is hardcoded
      this.plane.rotation.y = Math.PI;
      this.plane2.rotation.y = 0;
    } else {
      target += 0.01;
      this.plane.rotation.y += 0.01;
      this.plane2.rotation.y += 0.01;
      requestAnimationFrame(this.customAnimate.bind(this, target));
    }
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    this.camera.aspect = this.window.innerWidth / this.window.innerHeight;

    this.camera.updateProjectionMatrix();
  }

  test() {
    this.customAnimate(0);
    this.isAnimating = true;
  }
}

export default Slideshow;

import * as THREE from "three";

class Slideshow {
  constructor(window, containerElement, images) {
    this.containerElement = containerElement;
    this.images = images;
    this.window = window;
    this.isAnimating = false;

    this.setupScene();
    this.drawInitial();
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
      2000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // TODO: Set size
    // TODO: Set background color
    this.renderer.setClearColor(0xffffff);
    this.renderer.setPixelRatio(window.devicePixelRatio * 2);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.containerElement.appendChild(this.renderer.domElement);
    this.camera.position.z = 500;
  }

  initHelpers() {
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);
  }

  drawInitial() {
    // TODO: Something with loading manager
    // TODO: Lazy loading?
    // TODO: Use texture.offset?

    const geometry = new THREE.PlaneGeometry(940, 650);
    const texture = new THREE.TextureLoader().load(this.images[0].url);
    texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.FrontSide,
    });
    const texture2 = new THREE.TextureLoader().load(this.images[1].url);
    // Hacky FlipX
    texture2.wrapS = THREE.RepeatWrapping;
    texture2.repeat.x = -1;

    // Gets rid of blurry effect when mid rotation and different distance to camera
    texture2.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
    // Slightly higher quality but barely
    // Sharpens image too much?
    // texture2.generateMipmaps = false;
    // texture2.minFilter = THREE.LinearFilter;
    // texture2.needsUpdate = true;
    const material2 = new THREE.MeshBasicMaterial({
      map: texture2,
      side: THREE.BackSide,
    });
    this.group = new THREE.Group();
    this.plane = new THREE.Mesh(geometry, material);
    this.plane2 = new THREE.Mesh(geometry, material2);
    this.group.add(this.plane2);
    this.group.add(this.plane);
    this.scene.add(this.group);
  }

  customAnimate(target) {
    // TODO: An optimization would be to set rotation speed relative to pi
    //       Then the final adjustment would be extremely small;
    if (target > Math.PI) {
      this.isAnimating = false;
      // TODO: This is hardcoded
      this.group.rotation.y = Math.PI;
    } else {
      target += 0.01;
      this.group.rotation.y += 0.01;
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

import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './flower.gltf';

class Flower extends Group {
  constructor(parent) {
    // Call parent Group() constructor
    super();

    // Init state
    this.state = {
      gui: parent.state.gui,
      bob: true,
      spin: this.spin.bind(this),
      twirl: 0,
    };

    // Load object
    const loader = new GLTFLoader();

    this.name = 'flower';
    loader.load(MODEL, (gltf) => {
      this.add(gltf.scene);
    });

    // Add self to parent's update list
    parent.addToUpdateList(this);

    // Populate GUI
    this.state.gui.add(this.state, 'bob');
    this.state.gui.add(this.state, 'spin');
  }

  spin() {

  }

  update(timeStamp) {
    if (this.state.bob) {
      // Bob back and forth
      this.rotation.z = 0.05 * Math.sin(timeStamp / 300);
    }
    if (this.state.twirl > 0) {
      // Lazy implementation of twirl
      this.state.twirl -= Math.PI / 8;
      this.rotation.y += Math.PI / 8;
    }

  }
}

export default Flower;

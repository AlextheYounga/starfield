
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createStar } from './createStars';


const _createLighting = async (starField, position) => {
    // Add lights to the scene
    let {x,y,z} = position
    x += 1
    y += 7
    z += -6

    const ambientLight = new THREE.AmbientLight(0xffffff);
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    const pointLight = new THREE.PointLight(0xffffff, 10, 25);

    directionalLight.position.set(x,y,z).normalize();
    pointLight.position.set(x,y,z); // Set the position of the light
    
    const color = new THREE.Color(0xffffff);
    const hue = 0.5
    const saturation = 0.1; // Saturation
    const lightness = 0.6; // Lightness
    color.setHSL(hue, saturation, lightness);  // Reapply the modified HSL values

    const star = createStar({x,y,z}, color, 25)

    starField.add(ambientLight);
    starField.add(directionalLight);
    starField.add(pointLight);
    starField.add(star)
}


export async function createTrisolaranDroplet(starField) {
    const loader = new GLTFLoader();
    const x = 0
    const y = 0
    const z = -400

    const position = {x,y,z}
    _createLighting(starField, position) // Add lighting to the scene

    // Add Trisolaran Droplet
    return loader.load('cad/threebody/trisolaran_droplet.gltf', function (droplet) {
        droplet.scene.name = 'enterprise'
        droplet.scene.scale.set(0.1, 0.1, 0.1)
        droplet.scene.position.set(x, y, z);
        droplet.scene.rotateY(2.9)
    
        starField.add(droplet.scene);
        
    }, undefined, function (error) {
        console.error(error);
    });
}
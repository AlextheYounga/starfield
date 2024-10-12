
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


export async function createSpaceXStarship(starField) {
    const loader = new GLTFLoader();
    const x = -500
    const y = 0
    const z = 100

    const position = {x,y,z}
    _createLighting(starField, position) // Add lighting to the scene

    // Add SpaceX Starship
    return loader.load('cad/spacex/scene.gltf', function (starship) {
        starship.scene.name = 'starship'
        starship.scene.scale.set(0.002, 0.002, 0.002)
        starship.scene.position.set(x, y, z);
        starship.scene.rotateX(-1.2)
    
        starField.add(starship.scene);
        
    }, undefined, function (error) {
        console.error(error);
    });
}
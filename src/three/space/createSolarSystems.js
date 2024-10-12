import * as THREE from 'three';
import { createStar } from './createStars';
import { random } from 'mathjs';


const planetColors = [
    0xed4c4c, // Red
    0x146314, // Green
    0x0019ba, // Blue
    0xf5f59d, // Yellow
    0xb55104, // Brown
    0x008787, // Cyan
    0xf5ac27, // Orange
    0x800080, // Purple
    0x8d9aa1, // Grey
    0x595b5c, // Dark Grey
]


function createCentralStar() {
    // Add lights to the scene
    const x = 1000
    const y = 0
    const z = 1000

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    const pointLight = new THREE.PointLight(0xffffff, 5, 34);

    directionalLight.position.set(x, y, z).normalize();
    pointLight.position.set(x, y, z); // Set the position of the light

    // Create central star
    const color = new THREE.Color(0xffffff);
    const hue = 0.6
    const saturation = 0.1; // Saturation
    const lightness = 0.6; // Lightness
    color.setHSL(hue, saturation, lightness);  // Reapply the modified HSL values
    const star = createStar({ x, y, z }, color, 15)

    return {
        position: { x, y, z },
        directionalLight,
        pointLight,
        star
    }
}

function createPlanets(group, position) {
    const count = 6
    // Handle location of planet
    for (let i = 0; i < count; i++) {
        let { x, y, z } = position

        const randomOrbit = () => {
            const distance = Math.floor(random(10, 35))
            const positivity = Math.random() > 0.5 ? 1 : -1
            return distance * positivity
        }

        x += Math.random() > 0.5 ? 1 : -1
        y += randomOrbit();
        z += randomOrbit();

        const color = planetColors[Math.floor(random(0, planetColors.length))]
        const size = random(0.01, 0.35)

        const geometry = new THREE.SphereGeometry(size, 32, 32); // Radius of 5 with a moderate segment count
        const material = new THREE.MeshPhongMaterial({ color: color }); // Red planet
        const planet = new THREE.Mesh(geometry, material);

        // Set the position of the planet mesh
        planet.position.set(x, y, z);
        group.add(planet)
    }

    return group
}


export function createSolarSystem() {
    let solarSystemGroup = new THREE.Group();
    const {
        position,
        directionalLight,
        pointLight,
        star
    } = createCentralStar()

    solarSystemGroup.add(directionalLight);
    solarSystemGroup.add(pointLight);
    solarSystemGroup.add(star)

    // Add planets
    solarSystemGroup = createPlanets(solarSystemGroup, position)

    return solarSystemGroup
}

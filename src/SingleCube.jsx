import * as THREE from 'three';
import React, { useState } from 'react';

function _SingleCube_({ position, geometry, onClick }) {
    const loader = new THREE.TextureLoader();
    const [texture, setTexture] = useState(null);

    // Load the image and create a texture
    const img = loader.load('./assets/cam.jpg');
    const imgCanvas = document.createElement('canvas');
    const contextCanvas = imgCanvas.getContext('2d');

    contextCanvas.fillStyle = 'white';
    contextCanvas.font = 'bold 20px Arial';
    contextCanvas.strokeStyle = '#ffffff';
    contextCanvas.shadowColor = '#ffffff';
    contextCanvas.fillText('Simple Text', 85, 85);
    const textTexture = new THREE.CanvasTexture(imgCanvas);

    console.log(contextCanvas);

    return (
        <mesh position={position} geometry={geometry} onClick={onClick} scale={1.5}>
            {[...Array(6)].keys().map((i) => (
                <meshStandardMaterial
                    key={i}
                    attachArray={`material-${i}`}
                    map={textTexture}
                    color={'white'}
                />
            ))}
        </mesh>
    );
}

function SingleCubes() {
    var scene = new THREE.Scene();
    scene.background = new THREE.TextureLoader().load('caves.jpg');

    var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry();
    var texture = new THREE.TextureLoader().load('logo.png');
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 10;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();

    return (
        <div>
            <_SingleCube_ position={[0, 0, 0]} geometry={geometry} onClick={() => console.log('clicked')} />
        </div>
    );
}

export default SingleCubes;
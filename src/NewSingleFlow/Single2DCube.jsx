
// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';

// const SAMPLES = {
//   'BasisU ETC1S': '2d_etc1s.ktx2',
//   'BasisU UASTC': '2d_uastc.ktx2',
//   'RGBA8 sRGB': '2d_rgba8.ktx2',
//   'RGBA8 Linear': '2d_rgba8_linear.ktx2',
//   'RGBA16 Linear': '2d_rgba16_linear.ktx2',
//   'RGBA32 Linear': '2d_rgba32_linear.ktx2',
//   'ASTC 6x6 (mobile)': '2d_astc_6x6.ktx2',
// };

// const Single2DCube = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const width = window.innerWidth;
//     const height = window.innerHeight;

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(width, height);
//     mountRef.current.appendChild(renderer.domElement);

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x202020);

//     const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
//     // camera.position.set(0, 0, 2.5);
//     camera.position.set(0, 0, 3.5);
//     camera.lookAt(scene.position);
//     scene.add(camera);

//     const controls = new OrbitControls(camera, renderer.domElement);

//     const geometry = flipY(new THREE.PlaneGeometry());
//     const material = new THREE.MeshBasicMaterial({
//       color: 0xffffff,
//       side: THREE.DoubleSide,
//       transparent: true,
//     });
//     const mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);

//     const loader = new KTX2Loader()
//       .setTranscoderPath('jsm/libs/basis/')
//       .detectSupport(renderer);

//     const loadTexture = async (path) => {
//       try {
//         const texture = await loader.loadAsync(`./textures/compressed/${path}`);
//         texture.minFilter = THREE.NearestMipmapNearestFilter;

//         material.map = texture;
//         material.needsUpdate = true;

//         console.info(`format: ${texture.format}`);
//         console.info(`type: ${texture.type}`);
//         console.info(`colorSpace: ${texture.colorSpace}`);
//       } catch (e) {
//         console.error(e);
//       }
//     };

//     loadTexture(Object.values(SAMPLES)[0]);

//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };

//     const handleResize = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;

//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//       renderer.setSize(width, height);
//     };

//     window.addEventListener('resize', handleResize);
//     animate();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       renderer.dispose();
//     };
//   }, []);

//   return <div ref={mountRef} />;
// };

// const flipY = (geometry) => {
//   const uv = geometry.attributes.uv;

//   for (let i = 0; i < uv.count; i++) {
//     uv.setY(i, 1 - uv.getY(i));
//   }

//   return geometry;
// };

// export default Single2DCube;




// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';

// const SAMPLES = {
//   'BasisU ETC1S': '2d_etc1s.ktx2',
//   'BasisU UASTC': '2d_uastc.ktx2',
//   'RGBA8 sRGB': '2d_rgba8.ktx2',
//   'RGBA8 Linear': '2d_rgba8_linear.ktx2',
//   'RGBA16 Linear': '2d_rgba16_linear.ktx2',
//   'RGBA32 Linear': '2d_rgba32_linear.ktx2',
//   'ASTC 6x6 (mobile)': '2d_astc_6x6.ktx2',
// };

// const TwoDCubesGrid = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     const gap = 10; // Gap between planes

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(width, height);
//     mountRef.current.appendChild(renderer.domElement);

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x202020);

//     const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0.1, 100);
//     camera.position.set(0, 0, 10);
//     scene.add(camera);

//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableRotate = false;

//     const loader = new KTX2Loader()
//       .setTranscoderPath('jsm/libs/basis/')
//       .detectSupport(renderer);

//     const loadTexture = async (path) => {
//       try {
//         const texture = await loader.loadAsync(`./textures/compressed/${path}`);
//         texture.minFilter = THREE.NearestMipmapNearestFilter;
//         return texture;
//       } catch (e) {
//         console.error(e);
//       }
//     };

//     const createPlane = async (position, texturePath) => {
//       const geometry = flipY(new THREE.PlaneGeometry(1, 1));
//       const material = new THREE.MeshBasicMaterial({
//         color: 0xffffff,
//         side: THREE.DoubleSide,
//         transparent: true,
//       });
//       const mesh = new THREE.Mesh(geometry, material);
//       mesh.position.copy(position);
//       scene.add(mesh);

//       const texture = await loadTexture(texturePath);
//       material.map = texture;
//       material.needsUpdate = true;
//     };

//     const positions = [];
//     const planeSize = 1; // Size of each plane
//     const numRows = 3; // Number of rows
//     const numCols = 3; // Number of columns

//     for (let row = 0; row < numRows; row++) {
//       for (let col = 0; col < numCols; col++) {
//         const x = col * (planeSize + gap) - ((numCols - 1) * (planeSize + gap)) / 2;
//         const y = row * (planeSize + gap) - ((numRows - 1) * (planeSize + gap)) / 2;
//         positions.push(new THREE.Vector3(x, y, 0));
//       }
//     }

//     Promise.all(Object.values(SAMPLES).map((path, index) => createPlane(positions[index], path)))
//       .then(() => {
//         animate();
//       });

//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };

//     const handleResize = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;

//       camera.left = -width / 2;
//       camera.right = width / 2;
//       camera.top = height / 2;
//       camera.bottom = -height / 2;
//       camera.updateProjectionMatrix();
//       renderer.setSize(width, height);
//     };

//     window.addEventListener('resize', handleResize);
//     animate();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       renderer.dispose();
//     };
//   }, []);

//   return <div ref={mountRef} />;
// };

// const flipY = (geometry) => {
//   const uv = geometry.attributes.uv;

//   for (let i = 0; i < uv.count; i++) {
//     uv.setY(i, 1 - uv.getY(i));
//   }

//   return geometry;
// };

// export default TwoDCubesGrid;




// // ? new codes
// import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// const SAMPLES = {
//   'BasisU ETC1S': '2d_etc1s.ktx2',
//   'BasisU UASTC': '2d_uastc.ktx2',
//   'RGBA8 sRGB': '2d_rgba8.ktx2',
//   'RGBA8 Linear': '2d_rgba8_linear.ktx2',
//   'RGBA16 Linear': '2d_rgba16_linear.ktx2',
//   'RGBA32 Linear': '2d_rgba32_linear.ktx2',
//   'ASTC 6x6 (mobile)': '2d_astc_6x6.ktx2',
// };

// const FORMAT_LABELS = {
//   [THREE.RGBAFormat]: 'RGBA',
//   [THREE.RGBA_BPTC_Format]: 'RGBA_BPTC',
//   [THREE.RGBA_ASTC_4x4_Format]: 'RGBA_ASTC_4x4',
//   [THREE.RGB_S3TC_DXT1_Format]: 'RGB_S3TC_DXT1',
//   [THREE.RGBA_S3TC_DXT5_Format]: 'RGBA_S3TC_DXT5',
//   [THREE.RGB_PVRTC_4BPPV1_Format]: 'RGB_PVRTC_4BPPV1',
//   [THREE.RGBA_PVRTC_4BPPV1_Format]: 'RGBA_PVRTC_4BPPV1',
//   [THREE.RGB_ETC1_Format]: 'RGB_ETC1',
//   [THREE.RGB_ETC2_Format]: 'RGB_ETC2',
//   [THREE.RGBA_ETC2_EAC_Format]: 'RGB_ETC2_EAC',
// };

// const TYPE_LABELS = {
//   [THREE.UnsignedByteType]: 'UnsignedByteType',
//   [THREE.ByteType]: 'ByteType',
//   [THREE.ShortType]: 'ShortType',
//   [THREE.UnsignedShortType]: 'UnsignedShortType',
//   [THREE.IntType]: 'IntType',
//   [THREE.UnsignedIntType]: 'UnsignedIntType',
//   [THREE.FloatType]: 'FloatType',
//   [THREE.HalfFloatType]: 'HalfFloatType',
// };

// const Single2DCube = () => {
//   const [params, setParams] = useState({
//     sample: Object.values(SAMPLES)[0],
//   });

//   const mountRef = useRef(null);
//   const renderer = useRef(null);
//   const scene = useRef(null);
//   const camera = useRef(null);
//   const controls = useRef(null);
//   const loader = useRef(null);
//   const material = useRef(null);

//   useEffect(() => {
//     const initializeScene = async () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;

//       renderer.current = new THREE.WebGLRenderer({ antialias: true });
//       renderer.current.setPixelRatio(window.devicePixelRatio);
//       renderer.current.setSize(width, height);
//       mountRef.current.appendChild(renderer.current.domElement);

//       window.addEventListener('resize', handleResize);

//       scene.current = new THREE.Scene();
//       scene.current.background = new THREE.Color(0x202020);

//       camera.current = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
//       camera.current.position.set(0, 0, 2.5);
//       camera.current.lookAt(scene.current.position);
//       scene.current.add(camera.current);

//       controls.current = new OrbitControls(camera.current, renderer.current.domElement);

//       const geometry = flipY(new THREE.PlaneGeometry());
//       material.current = new THREE.MeshBasicMaterial({
//         color: 0xffffff,
//         side: THREE.DoubleSide,
//         transparent: true,
//       });
//       const mesh = new THREE.Mesh(geometry, material.current);
//       scene.current.add(mesh);

//       loader.current = new KTX2Loader()
//         .setTranscoderPath('jsm/libs/basis/')
//         .detectSupport(renderer.current);

//       const gui = new GUI();
//       gui.add(params, 'sample', SAMPLES).onChange(loadTexture);

//       await loadTexture(params.sample);
//       animate();
//     };

//     initializeScene();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       renderer.current.dispose();
//     };
//   }, []);

//   const animate = () => {
//     requestAnimationFrame(animate);
//     controls.current.update();
//     renderer.current.render(scene.current, camera.current);
//   };

//   const handleResize = () => {
//     const width = window.innerWidth;
//     const height = window.innerHeight;

//     camera.current.aspect = width / height;
//     camera.current.updateProjectionMatrix();
//     renderer.current.setSize(width, height);
//   };

//   const loadTexture = async (path) => {
//     try {
//       const texture = await loader.current.loadAsync(`./textures/compressed/${path}`);
//       texture.minFilter = THREE.NearestMipmapNearestFilter;

//       material.current.map = texture;
//       material.current.needsUpdate = true;

//       console.info(`format: ${FORMAT_LABELS[texture.format]}`);
//       console.info(`type: ${TYPE_LABELS[texture.type]}`);
//       console.info(`colorSpace: ${texture.colorSpace}`);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return <div ref={mountRef} />;
// };

// const flipY = (geometry) => {
//   const uv = geometry.attributes.uv;

//   for (let i = 0; i < uv.count; i++) {
//     uv.setY(i, 1 - uv.getY(i));
//   }

//   return geometry;
// };

// export default Single2DCube;


// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// const Single2DCube = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const width = window.innerWidth;
//     const height = window.innerHeight;

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(width, height);
//     mountRef.current.appendChild(renderer.domElement);

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x202020);

//     const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//     camera.position.z = 5;

//     const controls = new OrbitControls(camera, renderer.domElement);

//     const geometry = new THREE.BoxGeometry(1, 1, 1);
//     const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

//     const rows = 4;
//     const cols = 6;
//     const gridSize = 3; // Adjust this value to change the size of the grid

//     const createCube = (x, y) => {
//       const cube = new THREE.Mesh(geometry, material);
//       cube.position.x = (x - (cols - 1) / 2) * 1.2;
//       cube.position.y = (y - (rows - 1) / 2) * 1.2;
//       return cube;
//     };

//     for (let row = 0; row < rows; row++) {
//       for (let col = 0; col < cols; col++) {
//         const cube = createCube(col, row);
//         scene.add(cube);
//       }
//     }

//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };

//     animate();

//     const handleResize = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;

//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//       renderer.setSize(width, height);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       renderer.dispose();
//     };
//   }, []);

//   return <div ref={mountRef} />;
// };

// export default Single2DCube;




const Single2DCube = () => {
    return (
        <>
               
        </>
    );
};

export default Single2DCube;
import { useEffect, useRef } from "react";
import * as THREE from "three";

function Cube() {
  const mountRef = useRef(null);

  const createTextTexture = (name, seatNumber) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 512;

    context.fillStyle = '#1e1e1e'; 
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = 'Bold 40px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';

    context.fillText(name, 256, 200);
    context.fillText(`Seat: ${seatNumber}`, 256, 300);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  useEffect(() => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const myTexture = createTextTexture('Lamia Gul', 'B23110006055'); 

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ map: myTexture });
    const cube = new THREE.Mesh(geometry, material);
    
    scene.add(cube);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} />;
}

export default Cube;
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'
//import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg'),
    alpha: true,
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(10);

renderer.render(scene, camera);

//-----------------------------Light------------------------------------
const pointLight = new THREE.PointLight(0xfff);
pointLight.position.set(10, 10, 10);

//avatar
const avatarTexture = new THREE.TextureLoader().load('Emblem_of_National_Aviation_University.png');

const avatar = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: avatarTexture })
);
scene.add(avatar)
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}


function animate() {
    requestAnimationFrame(animate);

    avatar.rotation.x += 0.01;

    //controls.update();
    raycaster.setFromCamera( pointer, camera );
    var intersects = raycaster.intersectObject(scene, true);
    if (intersects.length > 0) {

        var object = intersects[0].object;
        
        object.rotation.z += 0.01;

    
    }
    

    renderer.render(scene, camera);
}

window.addEventListener( 'pointermove', onPointerMove );
animate();

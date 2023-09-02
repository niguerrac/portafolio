import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit {
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  valorScroll=0;
  xProyectil = -10;
  bala = new THREE.Object3D();
  bala2 = new THREE.Object3D();
  bala3 = new THREE.Object3D();
  pointLightBala = new THREE.PointLight(0xff3333,1.5,2000,0);

  ngOnInit(): void {
    // Crear la escena
    this.scene = new THREE.Scene();

    // Crear la cámara
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.position.setZ(30);
    this.camera.position.setX(-3);

    // Crear el renderizador
    this.renderer = new THREE.WebGLRenderer();
    // Establecer el estilo del renderizador
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
this.renderer.domElement.style.position = 'fixed';
this.renderer.domElement.style.top = '0';
this.renderer.domElement.style.left = '0';
this.renderer.domElement.style.zIndex = '-1';

// Agregar el renderizador al cuerpo del documento
document.body.insertBefore(this.renderer.domElement, document.body.firstChild);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
this.scene.add(pointLight, ambientLight, this.pointLightBala);
    // Agregar el cubo a la escena
    // Avatar
    const noslinTexture = new THREE.TextureLoader().load('assets/yo.jpg');
    const noslin = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3),
      new THREE.MeshBasicMaterial({ map: noslinTexture }));
    this.scene.add(noslin);

    noslin.position.z = -5;
    noslin.position.x = 2;
    // Moon

const moonTexture = new THREE.TextureLoader().load('assets/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('assets/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
this.scene.add(moon);
moon.position.z = 10;
moon.position.y = 3;
moon.position.setX(-23);
moon.scale.subScalar(5);
    // Background

const spaceTexture = new THREE.TextureLoader().load('assets/space.jpg');
this.scene.background = spaceTexture;

//model
const loader = new GLTFLoader();
var nave = new THREE.Object3D();
var scenaNave = new THREE.Group();
loader.load( 'assets/MeteorMantis_Blue.glb', 

 ( gltf ) => {

 // gltf.scene.children[0].material = new THREE.MeshBasicMaterial( { map: nave_textura } );
 this.scene.add( gltf.scene );
  gltf.scene.position.x = -10;
  gltf.scene.position.z = 0;
  gltf.scene.position.y = -2;
  gltf.scene.rotateY(0.3);
  gltf.scene.rotateZ(-0.4);
  gltf.scene.rotateX(0.2);
  nave = gltf.scene.children[0];
  scenaNave = gltf.scene;

}, undefined, 
function ( error ) {

	console.error( error );

} );
const proyectil = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.3),
                  new THREE.MeshStandardMaterial({ color: 0xff3333, emissive: 0xd10000, emissiveIntensity: 100, fog: true }));
proyectil.position.x = -8.5;
proyectil.position.y = -3.7;
proyectil.position.z = 0;
proyectil.rotation.y = 0.3;

this.scene.add(proyectil);
this.bala = proyectil;

const proyectil2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.3),
                  new THREE.MeshStandardMaterial({ color: 0xff3333, emissive: 0xd10000, emissiveIntensity: 100, fog: true }));
proyectil2.position.x = -8.5;
proyectil2.position.y = -3.7;
proyectil2.position.z = 1;
proyectil2.rotation.y = 0.3;

this.scene.add(proyectil2);
this.bala2 = proyectil2;

const proyectil3 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.3),
                  new THREE.MeshStandardMaterial({ color: 0xff3333, emissive: 0xd10000, emissiveIntensity: 100, fog: true }));
proyectil3.position.x = -8.5;
proyectil3.position.y = -3.7;
proyectil3.position.z = 2;
proyectil3.rotation.y = 0.3;

this.scene.add(proyectil3);
this.bala3 = proyectil3;

//estrellas
    const addStar = (): void => {
  const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 10});
  const star: THREE.Mesh = new THREE.Mesh(geometry, material);

  const [x, y, z]: number[] = Array(3)
      .fill(0)
      .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  this.scene.add(star);
}

Array(200).fill(0).forEach(addStar);
    // Animar el cubo
    const animate = () => {
      requestAnimationFrame(animate);
      // Obtener el valor del slider
      window.addEventListener('scroll', this.handleScroll);

      noslin.rotation.x += 0.01;
      noslin.rotation.y += 0.01;
      moon.rotation.y += 0.001;
      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }
  handleScroll = () => {
    const t = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.valorScroll = t;
    this.camera.position.z = t * 0.08;
    this.camera.position.x = t * 0.0004;
    this.camera.rotation.y = t * 0.0012;

    if(t>300){
      this.bala.position.z =  (t-300)*0.04-1;
      this.bala.position.y = -3.2 - (t-300)*0.025;
      this.pointLightBala.position.set(this.bala.position.x, this.bala.position.y, this.bala.position.z);

      
      this.bala2.position.z =  (t-300)*0.04-1+1;
      this.bala2.position.y = -3.2 - (t-300)*0.025;
      
      this.bala3.position.z =  (t-300)*0.04-1+2;
      this.bala3.position.y = -3.2 - (t-300)*0.025;
    }
  };
  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll);
  }

  inputValue: GLfloat = -8.5

  handleChange() {
    console.log(this.inputValue);
    // Aquí puedes realizar cualquier acción con el valor del input
    this.xProyectil = this.inputValue;
    this.bala.position.x =  this.xProyectil;
  }
  inputValueY: GLfloat = -3.7;
  handleChangeY() {
    console.log(this.inputValueY);
    // Aquí puedes realizar cualquier acción con el valor del input
    this.bala.position.y =  this.inputValueY;
  }
  inputValueZ: GLfloat = 0;
  handleChangeZ() {
    console.log(this.inputValueY);
    // Aquí puedes realizar cualquier acción con el valor del input
    this.bala.position.z =  this.inputValueZ;
  }
}

import * as THREE from 'three'


// <REMOVE ME: Star Doughnut>
import StarDoughnut from '../objects/StarDoughnut'
// </REMOVE ME: Star Doughnut>


// Basic Setup
// Create the scene
const scene = new THREE.Scene()
// Create the camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 15000)
// Create the renderer and the HTMLCanvas with WEB-GL context
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true})

// Scale the canvas and append it into the DOM
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Resize the canvas and update projection on window resize
window.addEventListener('resize', e => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

// set the camera position to 10 at the z-axis
camera.position.setZ(10)


// <REMOVE ME: Star Doughnut>
// Instantiate doughnut
const doughnut = new StarDoughnut()
// And add it to the scene
scene.add(doughnut)
// </REMOVE ME: Star Doughnut>


/**
 * Add Life in your Scene with update (called every frame)
 * @param delta The scaled time passed since the last frame
 */
const update = (delta: number) => {
  // <REMOVE ME: Star Doughnut>
  // update the doughnut to rotate it
  doughnut.update()
  // </REMOVE ME: Star Doughnut>


  // connect the camera with the scene inside the renderer and render the result to make the content and the changes visible
  renderer.render(scene, camera)
}

// Export the update function to make it a part of the animation loop inside index.ts
export default {
  update: update
}

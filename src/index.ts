import * as THREE from 'three'
import Scene from './scenes/Scene'
import TWEEN from '@tweenjs/tween.js'
import Timeline from './managers/Timeline'

// Setup
const clock = new THREE.Clock()

// Scaling Time
window.addEventListener('keydown', e => {
  if (e.key == 'Escape') {
    if (Timeline.timeScale == 1) {
      Timeline.timeScale = 0.5
    } else if (Timeline.timeScale == 0.5) {
      Timeline.timeScale = 0
    } else {
      Timeline.timeScale = 1
    }
  }
})

// Animation Loop and TweenJS Setup
const animate = () => {
  Timeline.addDelta(clock.getDelta())

  TWEEN.update(Timeline.time)

  Scene.update(Timeline.delta)

  window.requestAnimationFrame(animate)
}

animate()

import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import Timeline from '../managers/Timeline'

// You can make also your own 3d objects to clean up code in seperated files
// Here is also a TweenJS example

export default class StarDoughnut extends THREE.Object3D {
  private _doughnut: THREE.Points

  constructor() {
    super()
    this._createMesh()
    this._tweenDoughnutScale()
  }

  /**
   * We create our own doughnut mesh (points) and add it to ourself (the Object3D)
   */
  private _createMesh(): void {
    // First we need a geometry
    const doughnutGeometry = new THREE.TorusGeometry(3, 1, 16, 100)

    // Then we need a material with our stars
    const starMaterial = new THREE.PointsMaterial({
      color: 0xddddff,
      size: 0.4,
      map: new THREE.TextureLoader().load('./images/star.png'),
      transparent: true,
      alphaToCoverage: true
    })

    // Now we create our mesh (in this case points) with those two components
    this._doughnut = new THREE.Points(doughnutGeometry, starMaterial)

    // And add this mesh to our custom object to make it visible
    this.add(this._doughnut)
  }

  /**
   * Animation example with TWEEN
   * This Method is a bit magic because of the TWEEN library setup inside index.ts and Timeline
   * It Bounces the doughnut smooth!!!
   */
  private _tweenDoughnutScale(): void {
    // This is how long a bouncing is (3 scaled seconds)
    const TWEEN_DURATION = 3

    // This method makes TWEEN JS compatible with THREE JS
    // We are setting the scale we defined inside tweens to our doughnut
    // The properties (like scale) are custom
    const onTweenUpdate = (data: { scale: number }, elapsed: number) => {
      this._doughnut.scale.set(data.scale, data.scale, data.scale)
    }

    // Create the first Tween
    // It Starts with the custom prop scale 1
    const tween1 = new TWEEN.Tween({ scale: 1 })
      // and ends with the custom prop scale 0.4 in TWEEN_DURATION seconds (3 scaled seconds)
      .to({ scale: 0.4 }, TWEEN_DURATION)
      // we make this tween compatible to our doughnut
      .onUpdate(onTweenUpdate)
      // and set the Easing Function to TWEEN.Easing.Bounce.InOut
      // you can explore the easing functions inside TWEEN.Easing and watch what happens
      .easing(TWEEN.Easing.Bounce.InOut)

    // Create the second Tween
    // It Starts with the custom prop scale 0.4
    const tween2 = new TWEEN.Tween({ scale: 0.4 })
      // and ends with the custom prop scale 1 in TWEEN_DURATION seconds (3 scaled seconds)
      .to({ scale: 1 }, TWEEN_DURATION)
      // we make this tween compatible to our doughnut
      .onUpdate(onTweenUpdate)
      // and set the Easing Function to TWEEN.Easing.Bounce.InOut
      // you can explore the easing functions inside TWEEN.Easing and watch what happens
      .easing(TWEEN.Easing.Bounce.InOut)

    // After tween1 play immediately tween2
    tween1.chain(tween2)
    // After tween2 play immediately tween1
    tween2.chain(tween1)
    // You see now that this is a loop ;)

    // Start tween1 to start the loop
    // "Timeline.time" MUST BE THE ARGUMENT OF EVERY TWEEN "start" METHOD. OTHERWISE IT WILL BE NOT COMPATIBLE WITH THE SCALED TIME AND ANIMATES WIERD. THIS HAS TAKEN SO LONG TO FIGURE IT OUT.
    tween1.start(Timeline.time)
  }

  /**
   * Animation example without TWEEN (normal THREE JS animation)
   * This method must be called inside the animation loop to rotate the doughnut
   * It rotates the doughnut linear
   */
  public update(): void {
    // Rotate me linear 90deg per seconds
    // (((Math.PI == 180deg) * 0.5 == 90deg) * delta) == 9deg if delta is 0.1
    this._doughnut.rotateY(Math.PI * 0.5 * Timeline.delta)
  }
}

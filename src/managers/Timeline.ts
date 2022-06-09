// This class is required to setup ThreeJS and TweenJS with a custom time scale

export default class Timeline {
	private static _time: number = 0
	private static _delta: number = 0

	public static timeScale: number = 1

	public static get time() {
		return Timeline._time
	}

	public static get delta() {
		return Timeline._delta
	}

	public static addDelta(delta: number) {
		Timeline._delta = delta * Timeline.timeScale
		Timeline._time += Timeline._delta
	}
}

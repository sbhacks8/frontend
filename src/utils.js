export function norm(vec) {
  for (let i = 0; i < vec.length; i++) {
    vec[i] /= math.norm(vec);
  }
}

export function mult(array, a) {
  return array.map((x) => x * a);
}

export function rodrigues(theta, v, k) {
  return math.add(
    mult(v, Math.cos(theta)),
    mult(math.cross(k, v), Math.sin(theta)),
    mult(k, math.dot(k, v) * (1 - Math.cos(theta)))
  );
}

export function theta(time, period) {
  return (2 * Math.PI * (time % period)) / period;
}
export function sum(array) {
  return array.reduce((partialSum, a) => partialSum + a, 0);
}

export const myeventemitter = {
  _events: {},
  emit(event, data) {
    if (!this._events[event]) return;
    this._events[event].forEach((callback) => callback(data));
  },
  on(event, callback) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(callback);
  },
  unsubscribe(event) {
    if (!this._events[event]) return;
    delete this._events[event];
  },
};

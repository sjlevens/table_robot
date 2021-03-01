const W = 5
const H = 5
const grid = Array.from(Array(W), () => Array(H).fill(''))

export enum Edge {
  North = H - 1,
  South = 0,
  East = 0,
  West = W - 1,
}

export default grid

import handleMovement from './handleMovement'
import { Edge } from './grid'

const orient = {
  north: 0,
  west: 1,
  south: 2,
  east: 3,
}

describe('handleMovement', () => {
  it('should not fall off the edges', () => {
    expect(handleMovement({ x: Edge.East, y: 0, f: orient.east }).x).toEqual(Edge.East)
    expect(handleMovement({ x: Edge.West, y: 0, f: orient.west }).x).toEqual(Edge.West)
    expect(handleMovement({ x: 0, y: Edge.North, f: orient.north }).y).toEqual(Edge.North)
    expect(handleMovement({ x: 0, y: Edge.South, f: orient.south }).y).toEqual(Edge.South)
  })
})

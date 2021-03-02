import grid, { Edge, W, H } from './grid'

describe('grid', () => {
  it(`should be a 2d grid with width ${W} and height ${H}`, () => {
    expect(grid.length).toEqual(W)
    expect(grid[Edge.East].length).toEqual(H)
    expect(grid[Edge.East][Edge.North]).toEqual('')
  })
})

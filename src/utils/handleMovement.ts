import { Edge } from './grid'

const handleMovement = ({ x, y, f }: { x: number; y: number; f: number }) => {
  const orient = f % 4

  switch (orient) {
    case 0:
      if (y !== Edge.North) return { x, y: y + 1, f }
      break
    case 2:
    case -2:
      if (y !== Edge.South) return { x, y: y - 1, f }
      break
    case 3:
    case -1:
      if (x !== Edge.East) return { x: x - 1, y, f }
      break
    case 1:
    case -3:
      if (x !== Edge.West) return { x: x + 1, y, f }
      break
  }
  return { x, y, f }
}

export default handleMovement

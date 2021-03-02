import { useState } from 'react'
import { Center, Text } from '@chakra-ui/react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useSwipeable } from 'react-swipeable'
import { motion } from 'framer-motion'
import Helper from './Helper'
import Arrow from './Arrow'
import grid, { Edge } from './utils/grid'
import handleMovement from './utils/handleMovement'

function App() {
  const [position, setPosition] = useState<{ x: number; y: number; f: number }>({
    x: 0,
    y: 0,
    f: 0,
  })
  const [placed, setPlaced] = useState(false)

  useHotkeys('left, right, up', ({ key }) =>
    key === 'ArrowUp'
      ? setPosition(handleMovement)
      : setPosition(cur => ({ ...cur, f: key === 'ArrowLeft' ? cur.f - 1 : cur.f + 1 })),
  )

  const swipeHandlers = useSwipeable({
    onSwiped: ({ dir }) =>
      dir === 'Up'
        ? setPosition(handleMovement)
        : setPosition(cur => ({
            ...cur,
            f: dir === 'Left' ? cur.f - 1 : dir === 'Right' ? cur.f + 1 : cur.f,
          })),
  })

  const handlePlace = ({ x, y }: { x: number; y: number }) => () => {
    setPosition(({ f }) => ({ x, y, f }))
    setPlaced(true)
  }

  return (
    <div {...swipeHandlers} style={{ width: '100vw', height: '100vh', overflow: 'none' }}>
      {placed && <Arrow position={position} />}
      <Helper position={position} placed={placed} />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {grid.map((col, x) => (
          <div key={x}>
            {col.map((_, y) => (
              <motion.div
                key={y}
                animate={
                  placed && position.x === x && position.y === Edge.North - y
                    ? { scale: [1, 0.9, 0.9, 1] }
                    : {}
                }
                transition={{ duration: 0.3, delay: 0.08 }}
              >
                <Center
                  cursor={placed ? '' : 'pointer'}
                  h="18vh"
                  w="18vw"
                  borderRadius="lg"
                  bg="whiteAlpha.400"
                  onClick={handlePlace({ x, y: Edge.North - y })}
                  mt="1.6vh"
                  ml="1vw"
                  mb="1vh"
                  mr="1vw"
                >
                  <Text fontFamily="mono" fontWeight="bold">{`${x} - ${Edge.North - y}`}</Text>
                </Center>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

import { useState } from 'react'
import { Center, Text } from '@chakra-ui/react'
import { useHotkeys } from 'react-hotkeys-hook'
import { motion } from 'framer-motion'

const grid = Array.from(Array(5), () => Array(5).fill(''))

const Arrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="72" height="60">
    <path d="M 72 60 L 36 60 L 36 0 Z" opacity="0.5"></path>
    <path d="M 36 60 L 0 60 L 36 0 Z" opacity="0.8"></path>
  </svg>
)

function App() {
  const [position, setPosition] = useState<{ x: number; y: number; f: number }>({
    x: 0,
    y: 0,
    f: 0,
  })
  const [placed, setPlaced] = useState(false)

  useHotkeys('left, right, up', ({ key }) =>
    key === 'ArrowUp'
      ? setPosition(({ x, y, f }) => {
          const orient = f % 4

          if (orient === 0) {
            // up
            if (y > 0) return { x, y: y - 1, f }
          } else if (orient === 3 || orient === -1) {
            // left
            if (x > 0) return { x: x - 1, y, f }
          } else if (orient === 2 || orient === -2) {
            // down
            if (y < 4) return { x, y: y + 1, f }
          } else if (orient === 1 || orient === -3) {
            // right
            if (x < 4) return { x: x + 1, y, f }
          }

          return { x, y, f }
        })
      : setPosition(cur => ({ ...cur, f: key === 'ArrowLeft' ? cur.f - 1 : cur.f + 1 })),
  )

  const handlePlace = ({ x, y }: { x: number; y: number }) => () => {
    if (!placed) {
      setPosition({ x, y, f: 0 })
      setPlaced(true)
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {placed && (
        <div
          style={{
            visibility: placed ? 'visible' : 'hidden',
            transform: `rotate(${90 * position.f}deg)`,
            position: 'absolute',
            left: `calc(${20 * position.x}vw + 70px)`,
            top: `calc(${20 * position.y}vh + 40px)`,
            transition: 'top 0.3s, left 0.3s, transform 0.3s',
          }}
        >
          <Arrow />
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {grid.map((col, x) => (
          <div key={x}>
            {col.map((_, y) => (
              <motion.div
                key={y}
                animate={
                  position.x === x && position.y === y ? { scale: [1, 0.9, 0.9, 0.9, 1] } : {}
                }
                transition={{ duration: 0.3, delay: 0.08 }}
              >
                <Center
                  shadow="2xl"
                  cursor={placed ? '' : 'pointer'}
                  h="18vh"
                  w="18vw"
                  borderRadius="lg"
                  bg="whiteAlpha.400"
                  onClick={handlePlace({ x, y })}
                  mt="1.6vh"
                  ml="1vw"
                  mb="1vh"
                  mr="1vw"
                >
                  <Text fontFamily="mono">{`${x} - ${4 - y}`}</Text>
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

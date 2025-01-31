import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useToast } from '@chakra-ui/react'
import sleep from './utils/sleep'

const wiggle = () => (Math.random() - 0.5) * 10

const Arrow = ({ position: { x, y, f } }: { position: { x: number; y: number; f: number } }) => {
  const [wiggler, setWiggler] = useState(0)
  const toast = useToast()

  useEffect(() => {
    const interval = setInterval(() => {
      setWiggler(wiggle())
    }, 300)
    return () => clearInterval(interval)
  })

  const funnyReference = async () => {
    toast({ description: 'What is my purpose?' })
    await sleep(1000)
    toast({ description: 'You pass butter', status: 'warning' })
    await sleep(1500)
    toast({ description: 'Oh my god...', status: 'error' })
  }

  return (
    <motion.div
      style={{
        zIndex: 100,
        transform: `rotate(${90 * f + wiggler}deg)`,
        position: 'absolute',
        left: `calc(${20 * x}vw + 5vw)`,
        bottom: `calc(${20 * y}vh + 7vh)`,
        transition: 'bottom 0.3s, left 0.3s, transform 0.3s',
      }}
      onClick={funnyReference}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="72" height="60">
        <path d="M 72 60 L 36 60 L 36 0 Z" opacity="0.5"></path>
        <path d="M 36 60 L 0 60 L 36 0 Z" opacity="0.8"></path>
      </svg>
    </motion.div>
  )
}

export default Arrow

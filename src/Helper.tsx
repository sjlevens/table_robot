import { ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, QuestionIcon } from '@chakra-ui/icons'
import {
  Kbd,
  Text,
  VStack,
  HStack,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'

const directionText = (f: number) =>
  f === 0 ? 'NORTH' : f === 3 || f === -1 ? 'WEST' : f === 2 || f === -2 ? 'SOUTH' : 'EAST'

const Helper = ({
  position: { x, y, f },
  placed,
}: {
  position: { x: number; y: number; f: number }
  placed: Boolean
}) => (
  <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
    <Popover defaultIsOpen={true}>
      <PopoverTrigger>
        <IconButton aria-label="Help" icon={<QuestionIcon />} />
      </PopoverTrigger>
      <PopoverContent w="xs">
        <PopoverCloseButton />
        <PopoverHeader>
          {placed ? `${x},${y},${directionText(f % 4)}` : 'Click on a tile to place!'}
        </PopoverHeader>
        <PopoverBody>
          <VStack align="start">
            <HStack>
              <Kbd>
                <ArrowLeftIcon />
              </Kbd>
              <Kbd>
                <ArrowRightIcon />
              </Kbd>
              <Text>Rotate left/right</Text>
            </HStack>
            <HStack>
              <Kbd>
                <ArrowUpIcon />
              </Kbd>
              <Text>Move in the direction facing</Text>
            </HStack>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  </div>
)

export default Helper

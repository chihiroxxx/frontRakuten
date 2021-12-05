import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React, { useEffect } from 'react'
import HelpSlide from './HelpSlide'

interface Props {
  isOpenProps : boolean
  setIsOpenProps : (value: React.SetStateAction<boolean>) => void

}

const HelpModal = (props:Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {isOpenProps,setIsOpenProps} = props

  useEffect(()=>{
    if(isOpenProps){
      onOpen()
      setIsOpenProps(true)
    }else{
      customOnClose()
    }
  },[isOpenProps])

  const customOnClose = ()=>{
    onClose()
      setIsOpenProps(false)
  }

  return (
    <>
      <>
      <Modal isOpen={isOpen} onClose={customOnClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome to MEMENTO TIME!!!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={2} /> */}
            <div>
              <span className="pb-3">
                How to Enjoy?

              </span>
            <HelpSlide/>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={customOnClose}>
              Close
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    </>
  )
}

export default HelpModal

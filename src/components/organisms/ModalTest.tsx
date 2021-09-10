import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { ChangeEvent, useContext } from 'react'
import { MainContext } from '../../providers/Provider'

interface Props{
  indexFlag: boolean,
  isOpen: boolean,
  onClose: () => void
}

const ModalTest = (props: Props) => {
  const { indexFlag, isOpen, onClose } = props

  const { data, setData, setText, configAxios, railsUrl, userId, onClickPostRails,idea, setIdea,targetItem, setTargetItem,targetFlag, setTargetFlag, setTime } = useContext(MainContext);

  const onChangeIdea = (e: ChangeEvent<HTMLInputElement>) => {
    setIdea(() => e.target.value)
  }

  const onChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(() => e.target.valueAsNumber)
  }

  const targetFlagResetOnlyModal = () => {
    setTargetFlag(() => false);
    setTargetItem(() => ({}))
    setIdea(() => (""))
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
          <ModalContent>
          <ModalCloseButton />
          <ModalHeader>full in your thought!!</ModalHeader>
          {/* <h2 className="mb-3 text-xs font-semibold tracking-widest text-black uppercase title-font">full in your thought </h2> */}
          <img alt="NO IMAGE" src={targetItem.imageUrl} className="object-cover"/>
          <ModalBody>
          <div className="flex flex-col w-full mx-auto mb-8  md:mt-0">
                <div className="relative mt-4">
                  <label htmlFor="text" className="text-base leading-7 text-blueGray-500">Thought</label>
                  <input value={idea} onChange={onChangeIdea}
                  type="text" placeholder="感じたこと" className="border-2 border-gray-200 w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"/>
                </div>

                {!indexFlag &&
                  <div className="relative mt-4">
                    <label htmlFor="name" className="text-base leading-7 text-blueGray-500">Time</label>
                    <input onChange={onChangeTime} type="datetime-local" className="border-2 border-gray-200 w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"/>
                  </div>

                }
                <div className="flex my-6 mt-4">
                  <label className="flex items-center">

                  </label>
                </div>
                <button onClick={onClickPostRails} className="w-full px-16 py-2 mr-2 text-base font-medium text-white transition duration-500 ease-in-out transform bg-yellow-300 border-yellow-300 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-yellow-400 ">
                   SEND </button>
                <p className="mx-auto mt-3 text-xs text-blueGray-500"> memento mori..</p>
              </div>
          </ModalBody>
          </ModalContent>

      </Modal>
    </>
  )
}

export default ModalTest

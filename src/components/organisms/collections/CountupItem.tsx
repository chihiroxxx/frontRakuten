import React, { useContext, useEffect } from 'react'
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Tooltip, useDisclosure } from '@chakra-ui/react'
import { MainContext } from '../../../providers/Provider'
import axios from 'axios'

interface Props {
  finishId: number
  // isOk: boolean
  // SetCountIsOk: React.Dispatch<React.SetStateAction<boolean>>
}


const CountupItem = (props :Props) => {
  // このonOpenをどうするか...なんだけど、これをpropsでもらってきて判定したいわけだよね？？？
  // propsからbooleanもらう？？？
  const { finishId} = props

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<any>()
  // このコンポーネントで何を実現させたいのか？？？？
  // この切り離しができると他のモーダルも使えるようになるのだ....

  // まず汚くてもいいから、作ってみようか！！！
  // でonOpenの判定はpropsで直接もらうとブッキングしちゃうから
  // （そもそもこのブッキングをどうにかしたいがためのコンポーネント分割）

  const { configAxios, railsUrl, countIsOk, SetCountIsOk, userId,bookCollections, setBookCollections } = useContext(MainContext)
  const onClickFinishCountUp = (finishId :number) => {
    onClose()
    axios.get(`${railsUrl}/restricted/books/finish/${finishId}`,configAxios
    ).then((res) => {
      console.log(res)

      onClickGetCollection() // ここどうしようかな。このメソッドをプロバイダーかな？？

    })
    .catch(error => {
      // なんか処理
    })
  }

  const onClickGetCollection = () => {
    axios.get(`${railsUrl}/restricted/books/${userId}`,configAxios
    ).then((res) => {
      console.log(res)
      // setBooksIndex(() => res.data.books)

      if (res.data !== null){
        setBookCollections(() => res.data) //のちにres.data.booksとしてgoから返却させる！！！！
      }

    })
    .catch(error => {
      // console.error(error);
    });
  }


  // この辺りが、モーダルとか開くなどのロジック部分！！！
  const openChange = () => {
    if (countIsOk){
      onOpen()
    }
    else {
      // onClose()
      // SetCountIsOk(false)

    }
  }
  const isOpenChange = () => {
    if (!isOpen){
      SetCountIsOk(false)
    }
  }

  useEffect(openChange,[countIsOk])
  useEffect(isOpenChange,[isOpen])
  return (
    <div>
       <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Oh!! You finished THE BOOK!?!?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            you want to finish up?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={() => onClickFinishCountUp(finishId)}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </>
    </div>
  )
}

export default CountupItem

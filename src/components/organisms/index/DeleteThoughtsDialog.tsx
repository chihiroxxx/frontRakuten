import React, { useContext, useEffect, useState } from 'react'
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react'
import { MainContext } from '../../../providers/Provider'
import axios from 'axios'




interface Props {
  deleteId: number
  daialogFlag: boolean
  setDaialogFlag: React.Dispatch<React.SetStateAction<boolean>>
}



const DeleteThoughtsDialog = (props :Props) => {
  const { deleteId,daialogFlag,setDaialogFlag } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<any>()
  const { configAxios,railsUrl,onClickGetIndexRails,showToast } = useContext(MainContext)

  const openChange = () => {
    if (daialogFlag){
      onOpen()
    }
    else {
      // onClose()
      // SetCountIsOk(false)

    }
  }
  const isOpenChange = () => {
    if (!isOpen){
      setDaialogFlag(false)
    }
  }
  useEffect(openChange,[daialogFlag])
  useEffect(isOpenChange,[isOpen])






  const onClickDeleteRails = (deleteId: number) =>{
    axios.delete(`${railsUrl}/restricted/thoughts/${deleteId}`,configAxios).then((res) => {
      //  setTargetEditThoughts("")

     }).then(()=>{
       // 削除完了のフラッシュメッセージ出す！！！！！！！
       // あとはreload
       onClickGetIndexRails()
       onClose()
       showToast("削除しました")
     })
     .catch(error => {
       // console.error(error);
     });

}

  return (
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
          <AlertDialogHeader>It's DELETE?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete it?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={() => onClickDeleteRails(deleteId)}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </>
  )
}

export default DeleteThoughtsDialog

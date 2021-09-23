import React, { useContext, useEffect } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { MainContext } from '../../../providers/Provider'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  collection : Collection

}

interface Collection {
  id: number
  booktitle: string
  author: string
  bookimage: string
  bookurl: string
  finishcount: number
  date: string
  createdat: string
  updatedat: string
  userid: number
}

const CreateThoughtsModal = (props: Props) => {
  // collection画面から、thoughtを新しく入力したいよ！ってことだよ！！！
  const {collection} = props
  // 何が必要かな？？？
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<any>()
  const { onClickPostRails,targetItem,setTargetItem,createIsOk, SetCreateIsOk } = useContext(MainContext);
   // React Hook Formのところ-------------------------------
   const { register, handleSubmit, formState: {errors} , reset } = useForm<FormStatus>({criteriaMode: "all", shouldFocusError: true})
   const onSubmit: SubmitHandler<FormStatus> = (data) => {

     console.log(data.date)
    //  ここでsetTargetItem で下準備する！！
    // setTargetItem(() => ({title: "", author: "", imageUrl: "",itemUrl: ""}))
    //このsetをレンダリングと共にすればいいと思う（つまりここの処理だと遅くない？ってこと。）
    const Target = {title: collection.booktitle, author: collection.author, imageUrl: collection.bookimage}
    setTargetItem(Target)
    //  const err =  onClickPostRails(data) // railsの方で引数取るようにする...
    // console.log(err)
     onClickPostRails(data) // railsの方で引数取るようにする...
     //で送ったらformstatusリセットだろうなああ....
    //  reset(data)
     reset() //ああ余計な引数を取るから、resetされなかったんだ...あああ...
     onClose()
    //  ん？？？交互にエラーになってる....

     // ブランクにする処理の方が早いから、エラーになってるぽいなあ...
      // setTargetItem({title: "", author: "", imageUrl: "",itemUrl: ""})
      // SetCreateIsOk(false)
  };


  interface FormStatus{
    thoughts: string,
    date: string,
    page: number,
    readingtime: number,

  }


  // この辺りが、モーダルとか開くなどのロジック部分！！！
  const openChange = () => {
    if (createIsOk){
      onOpen()
    }
    else {
      // onClose()
      // SetCountIsOk(false)

    }
  }
  const isOpenChange = () => {
    if (!isOpen){
      SetCreateIsOk(false)
    }
  }

  useEffect(openChange,[createIsOk])
  useEffect(isOpenChange,[isOpen])
  // useEffect(()=>{},[targetItem])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
          <ModalContent>
          <ModalCloseButton />
          <ModalHeader>full in your thought!!</ModalHeader>
          {/* <h2 className="mb-3 text-xs font-semibold tracking-widest text-black uppercase title-font">full in your thought </h2> */}

      {/* ここの src={collection.bookimage} はこれでいいのか！！ なぜなら、SEND押した後に、collectionのbook情報を、targetItemにセットするから！*/}
          <img alt="NO IMAGE" src={collection.bookimage} className="object-contain h-72"/>
          <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full mx-auto mb-8  md:mt-0">
                <div className="relative mt-4">
                  <label htmlFor="text" className="text-base leading-7 text-blueGray-500">Thought</label>
                  <textarea //value={idea} // onChange={onChangeIdea}
                   placeholder="感じたこと" className="border-2 border-gray-200 w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                  {...register("thoughts", {"required":  true})}
                  />
                     <span className="text-red-500 ">{errors.thoughts?.types?.required && "Thoughtが入力されていません"}<br/></span>
                </div>
                <div className="relative mt-4">
                  <label htmlFor="text" className="text-base leading-7 text-blueGray-500">Page</label>
                  <input //value={idea} // onChange={onChangeIdea}
                  type="text" placeholder="ページ数" className="border-2 border-gray-200 w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                  {...register("page", {maxLength: 10,pattern: /[0-9]/,})}
                  />
                     <span className="text-red-500 ">{errors.page?.types?.maxLength && "10文字以内で入力してください"}<br/>
                                                        {errors.page?.types?.pattern && "半角数字で入力してください"}<br/></span>
                </div>
                <div className="relative mt-4">
                  <label htmlFor="text" className="text-base leading-7 text-blueGray-500">Reading Time</label>
                  <input //value={idea} // onChange={onChangeIdea}
                  type="text" placeholder="読んだ時分（分単位）" className="border-2 border-gray-200 w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                  {...register("readingtime", {maxLength: 10,pattern: /[0-9]/,})}
                  />
                     <span className="text-red-500 ">{errors.readingtime?.types?.maxLength && "10文字以内で入力してください"}<br/>
                                                        {errors.readingtime?.types?.pattern && "半角数字で入力してください"}<br/></span>
                </div>

                {/* {!indexFlag && //これはいらないな */}
                  <div className="relative mt-4">
                    <label htmlFor="name" className="text-base leading-7 text-blueGray-500">Time</label>
                    <input
                    type="datetime-local" className="border-2 border-gray-200 w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                    {...register("date", {"required":  true})}
                    />
                     <span className="text-red-500 ">{errors.date?.types?.required && "Dateが入力されていません"}<br/></span>
                  </div>

                {/* } */}
                <div className="flex my-6 mt-4">
                  <label className="flex items-center">

                  </label>
                </div>
                <button type="submit"
                className="w-full px-16 py-2 mr-2 text-base font-medium text-white transition duration-500 ease-in-out transform bg-yellow-300 border-yellow-300 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-yellow-400 ">
                   SEND </button>
                <p className="mx-auto mt-3 text-xs text-blueGray-500"> memento mori..</p>
              </div>
              </form>
          </ModalBody>
          </ModalContent>

      </Modal>
    </>
  )
}

export default CreateThoughtsModal

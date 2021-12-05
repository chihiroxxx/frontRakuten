import React, { memo } from 'react'
import ReactPaginate from 'react-paginate';
import '../RightUp.scss';

interface Props{
  viewPages: ViewPages
  setViewPages: React.Dispatch<React.SetStateAction<ViewPages>>
  wantPage: number
  indexArray: Array<any>
}

interface ViewPages {
  startpage: number
  endpage: number
}


const BookPaginateItem = memo((props :Props) => {
  const {viewPages, setViewPages,wantPage,indexArray} = props
  // const {indexArray } = useContext(MainContext)
  // よし、mapのsliceで動的に指定できるから、それを変化させる関数を作るだけでOKそう！！！

  // 共通化したからpropsで設定number受け取る。テスト
  // const proNum :number = 5

  const changePages =  (e:{selected: number}) => {
    console.log(`OKだ！！！${e.selected}`) //{selected: 0}
    // console.log("clicked!!!!!")
    console.log(indexArray)

    // まだこの、pageの判定の計算がめちゃくちゃだ...
    const sp = (e.selected * (wantPage -1))+ e.selected
    console.log(sp)

    setViewPages({startpage: sp ,endpage:sp +wantPage})
  }
  return (
    <>
    <div className="w-56 mx-auto ">
    <p className="text-base text-center mt-3 font-medium  cursor-default tracking-tight">
    {/* <p className="text-indigo-500 text-md font-medium cursor-default text-center"> */}
      Total
      <span className="px-3 ">
        {indexArray.length}

      </span>
      records</p>

    </div>
    <div
    className="justify-center flex "
    >

      <ReactPaginate
        onPageChange={changePages} // これがページクリック時の関数みたい！
        pageCount={indexArray.length/wantPage}
        // pageCount={100}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        previousLabel='<<'
        nextLabel='>>'
        containerClassName='flex justify-center flex-column w-56'
        pageClassName='down-up h-5 w-5 bg-gray-900 text-white text-sm block m-auto
        transition duration-500 ease-in-out transform hover:bg-yellow-400 text-center'
        previousLinkClassName="pr-2"
        nextLinkClassName="pl-2"
        activeClassName=' bg-indigo-600'
        />
      </div>
    </>
  )
})

export default BookPaginateItem

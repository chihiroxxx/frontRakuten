import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import CountUp from 'react-countup';
import { MainContext } from '../../providers/Provider';

interface Props{
  title: string,
  // indexDateArr: any
}

const TotalLabelItem = (props: Props) => {
  const { title } = props
  const {booksIndex} = useContext(MainContext)
  const { configAxios, railsUrl, userId, } = useContext(MainContext)

  const styleJSX: React.CSSProperties ={
    width: "320px"
  }
  // if (booksIndex.length !== 0){
  //   const arr = booksIndex.map((i: Item) => {
    interface Item{
      id: number,
      date: string,
      booktitle: string,
      author: string,
      bookimage: string,
      thoughts: any,
      page?: number,
      readingtime?: number,
      // itemUrl: string,
      // largeImageUrl: string


    }
    const getPage = (want : string):number => {
      let sum: number = 0
      if (booksIndex.length !== 0){
      const today = `${new Date().getFullYear()}-${(`00${new Date().getMonth()+1}`).slice(-2)}`;
      // today.getFullYear();
      console.log(today)
        booksIndex.map((i: Item) => {
          console.log(i.date.slice(0,7)) //ここで月まで切り落としてるわけだけど...
          if(i.date.slice(0,7) === today){
            console.log("OK?")
            // console.log(i.page)
            if(want === "page"){
              sum += Number(i.page)

            }else{
              sum += Number(i.readingtime)
            }
          }
        })
        console.log(sum)
      }
      return sum
    }
    interface TotalDate {
      date: string
      page: number
    }
    const [total, setTotal] = useState<number>()
    // let totalDate: TotalDate = {date: "", page: 0}
    const getTotalPage = ()=> {
      // let totalPage :number
       axios.get(`${railsUrl}/restricted/thoughts/total/${userId}`,configAxios
      ).then((res) => {
        console.log(res.data)
        setTotal(res.data.page)
        // console.log(totalDate[0].date)
        // totalPage = totalMonth(res.data)
      })
      .catch(error => {
      });
      // const totalMonth = (td : TotalDate[]):number => {
      //   let sum: number = 0
      //   const today = `${new Date().getFullYear()}-${(`00${new Date().getMonth()+1}`).slice(-2)}`;

      //   td.map((t: TotalDate) => {
      //     if( t.date.slice(0,7) === today){
      //       sum += t.page
      //     }
      //   })
      //   return sum
      // }

    }
    // getTotalPage()
    // useEffect(getTotalPage,[])

  console.log(booksIndex)
  return (
    <div>
      {/* <button onClick={getTotalPage}>tetetetet</button> */}
      <div className="h-28 mb-5 bg-gray-100 cursor-default" style={styleJSX}>
        <div className="h-8 w-full bg-gray-900 text-white pl-2 text-base flex items-center">{title} Total</div>
        <div className="flex justify-between">

        <div className=" mx-3">
          <div className="flex items-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            <span className="text-base ml-1">Total Page</span>
          </div>
          <div className="text-3xl p-2 text-center">
            {/* <CountUp end={} */}
            <CountUp end={getPage("page")}
            duration={0.5}/>
            <span className="text-base pl-1">p</span>
          </div>
        </div>

        <div className=" mx-3">
          <div className="flex items-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="text-base ml-1">Total Minutes</span>
          </div>
          <div className="text-3xl p-2 text-center">
            <CountUp end={getPage("readingtime")}
            duration={0.5}/>
            <span className="text-base pl-1">min</span>
            </div>
        </div>

        </div>
        </div>
    </div>
  )
}

export default TotalLabelItem

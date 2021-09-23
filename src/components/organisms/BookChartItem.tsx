import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { MainContext } from '../../providers/Provider'



const BookChartItem = () => {
  const { configAxios, railsUrl, userId, } = useContext(MainContext)

  interface TotalData {
    date: string
    page: number
  }

  const [totalData, setTotalData] = useState<TotalData[]>([{date:"",page:-1}])
  const getTotalPage = ()=> {
    // let totalPage :number
     axios.get(`${railsUrl}/restricted/thoughts/total/daily/${userId}`,configAxios
    ).then((res) => {
      console.log(res.data)
      setTotalData(res.data)
      // setTotal(res.data.page)
      // console.log(totalDate[0].date)
      // totalPage = totalMonth(res.data)
    })
    .catch(error => {
    });
  }
  // const chartData = {
  //   labels: [totalData[0].date], //てなってくると順番も保持してくれる配列に
  //   // date配列 と page配列 に分けた方が良さそう
  //   datasets: [
  //     {
  //       label: "Monthly Page Total",
  //       backgroundColor: "#123eff",
  //       borderColor: "tarnsparent",
  //       hoverBackgroundColor: "#443eff",
  //       data: [totalData[0].page]
  //     }
  //   ]
  // }
  const calChartData = (): any => {
    const test = "aaa"
    const test2 = 12
    // ここで、totalDataのlengthとか計算するのと
    // date配列 と page配列 に分けてreturnさせる！！！
    const dateArr : string[] = []
    const pageArr : number[] = []
    if (totalData.length !== 0){
      // ソートできたあああ！！！
      totalData.sort((a,b)=> Number(new Date(a.date)) - Number(new Date(b.date))) //これでどうだろう？？？ あ、でもどっち順かわからなくない？？？
      totalData.map((td) => {
        console.log(td.date)
        dateArr.push(td.date)
        // dateArr.push("aa")
        // dateArr = [...dateArr,td.date]
        console.log(td.page)
        pageArr.push(td.page)
        // pageArr = [...pageArr,td.page]
      })
      // ああああ！！！それぞれソートしたら、そりゃズレる！！！
      // dateArr.sort()
      // pageArr.sort()
    }





    const chartData = {
      // よし！機能してる！！この方式でいこう！！！
      labels: dateArr, //てなってくると順番も保持してくれる配列に
      // labels: [totalData[0].date], //てなってくると順番も保持してくれる配列に
      // date配列 と page配列 に分けた方が良さそう
      datasets: [
        {
          label: "Daily Total Page",
          backgroundColor: "#ecc94b",
          borderColor: "#443eff",
          // borderColor: "#ffffff",
          hoverBackgroundColor: "#443eff",
          borderWidth: 1,
          // data: [totalData[0].page]
          // よし！機能してる！！この方式でいこう！！！
          data: pageArr
        }
      ]
    }
    return chartData
  }
  // const chartData = {
  //   labels: [totalData[0].date], //てなってくると順番も保持してくれる配列に
  //   // date配列 と page配列 に分けた方が良さそう
  //   datasets: [
  //     {
  //       label: "Daily Page Total",
  //       backgroundColor: "#123eff",
  //       borderColor: "tarnsparent",
  //       hoverBackgroundColor: "#443eff",
  //       data: [totalData[0].page]
  //     }
  //   ]
  // }
  useEffect(getTotalPage,[])
  return (
    <div>
      <div className="h-full w-30 bg-white">

        <Bar data={calChartData}
        height={300}/>
      </div>
    </div>
  )
}

export default BookChartItem

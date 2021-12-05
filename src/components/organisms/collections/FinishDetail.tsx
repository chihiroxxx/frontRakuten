import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../../providers/Provider';

interface Props {
  collerctionBookid: number
  finishcount: number
}

const FinishDetail = (props: Props) => {
  const { configAxios, railsUrl, userId, } = useContext(MainContext)
  const { collerctionBookid, finishcount } = props

  const [finishLogs, SetFinishLogs] = useState<Finish[]>([{id: -1,count: -1, finishdate: "", createdat: "", updatedat: "", bookid: -1, userid: -1}])

  const getFinishDetail = ()=> {
     axios.get(`${railsUrl}/restricted/finishes/${userId}`,configAxios
    ).then((res) => {
      console.log(res.data)
      // setTotal(res.data.page)
      // console.log(totalDate[0].date)
      // totalPage = totalMonth(res.data)
      SetFinishLogs(res.data)
    })
    .catch(error => {
    });
  }

  interface Finish {
    id: number
    count: number
    finishdate: string
    createdat: string
    updatedat: string
    bookid: number
    userid: number


  }
  const [dayArr, setDayArr] = useState<Finish[]>()
  const arrangeLogs = () => {
    // let sum: number = 0
    let arr: Finish[]
    if (finishLogs !== null && finishLogs.length !== 0){
      finishLogs.map((f: Finish) => {
        if(f.bookid === collerctionBookid){
          // arr.push(f)
          console.log(f)
        }
      })
      // setDayArr(arr!)
    }
  }

  useEffect(getFinishDetail,[])
  return (
    <>
    {/* <button onClick={arrangeLogs}>tetetete</button> */}
      <p className="text-gray-800 dark:text-white  font-medium mb-2">
                     <span className="mr-2">
                      <span className="mr-3">
                      読破合計

                      </span>
                      <span className="mr-1">
                      {finishcount}

                      </span>
                      回


                     </span>
                     {/* { c.finishcount }回 */}
                     {finishLogs.length !== 0 &&
                      <div className="text-sm">
                        {
                          finishLogs.map((f: Finish) => {
                            if(f.bookid === collerctionBookid && f.count !== 0){
                              // arr.push(f)
                              console.log(f)
                              return(
                              <div key={f.id} className="flex">
                                <p className="mr-3 flex">
                                  <p className="w-4">
                                  {f.count}

                                  </p>
                                  回目

                                </p>
                                <p className=" text-gray-400 dark:text-gray-300 font-light text-md">
                                  <span className="mr-1">
                                  読破日

                                  </span>
                                  <span>
                                  {f.finishdate}

                                  </span>
                                </p>
                              </div>)
                            }
                          })
                        }
                      </div>
                     }

      </p>
    </>
  )
}

export default FinishDetail

import React, { useEffect, useState } from 'react'

const usePagination = (array,{pageNo,MaxNo = 5}) => {
    const [pageItems,setPageItems] = useState()
    const [prevPage,setPrevPage] = useState(false)
    const [nextPage,setNextpage] = useState(false)


    useEffect(()=>{
    const startNo = (pageNo - 1) * MaxNo
    const endNo = startNo + MaxNo
    const totalitems = array?.length

    const pageItems = array?.slice(startNo,endNo)
    const prevPage = pageNo > 1
    const nextPage = endNo < totalitems

        setPageItems(pageItems)
        setPrevPage(prevPage)
        setNextpage(nextPage)

    },[array])




    return {pageItems,prevPage,nextPage}
}

export default usePagination

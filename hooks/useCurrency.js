import React, { useEffect, useState } from 'react'

const useCurrency = () => {
    const [currencyCode,setCurrencyCode] = useState()
    const [rate,setRate] = useState()

    useEffect(()=>{
        const getRate = async()=>{
            const countyInfo = await(await fetch('http://ip-api.com/json/?fields=61439')).json()
            const exchanceRates = await(await fetch('http://api.exchangeratesapi.io/v1/latest?access_key=74bb67628aeb61febac69a147c023a6a')).json()
        
            if(!exchanceRates.rates || !countyInfo.countryCode)return
           
          for(const key in exchanceRates.rates){
            if(key.startsWith(countyInfo.countryCode)){
                setCurrencyCode(key)
                setRate(exchanceRates.rates[key])
                return
            }
          }}

          getRate()
        
    },[])


    const convToCounCur = (currency,missingValue)=>{
        const currencyInEuro = currency/100

        let result = currencyInEuro
        if(missingValue){
          result = result * missingValue
        }        
        if(!rate){
            return result.toLocaleString('en-DE',{style:'currency',currency:'EUR'})
        }
        result = result * rate
       
        return result.toLocaleString('en-Us',{style:'currency',currency:currencyCode})
    }


    const curInEur = (currency,missingValue)=>{
      const currencyInEuro = currency/100
      let result = currencyInEuro
      if(missingValue){
        result = result * missingValue
      }

      return result.toLocaleString('en-DE',{style:'currency',currency:'EUR'})
    }



  return {convToCounCur,curInEur}
}

export default useCurrency

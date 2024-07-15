import {useEffect, useState} from 'react'
import axios from 'axios'

export default function App() {
  const [Surah, SetSurah] = useState(null)
  

  useEffect(()=>{
   axios.get('https://quran-api.santrikoding.com/api/surah').then(function(response){
    SetSurah(response.data.data)
    console.log(response)
   })
  },[])


  return (
    <div className=''>App</div>
  )
}

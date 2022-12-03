import React from 'react'
import { useParams } from 'react-router-dom'

const Prediction = () => {
    const {pid} = useParams();
    React.useEffect(()=>console.log(pid),[])
  return (
    <div className='userprediction_container'>
        user predictions
    </div>
  )
}

export default Prediction
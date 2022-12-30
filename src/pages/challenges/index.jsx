import React from 'react'
import "./styles/style.css"

const Challenges = () => {

  return (
    <div className='challenges__Container'>
      <div className='challenges__UserChallenges'>
        <h2>My Active Challenges</h2>
        {/* {
          [1,3,4,5,6,7].map(res=><p>challenge {res}</p>)
        } */}
      </div>

      <div className='challenges__AllChallenges'>
        <h2>All Challenges</h2>
      </div>
      <h2>Cooking !!! </h2>
    </div>
  )
}

export default Challenges
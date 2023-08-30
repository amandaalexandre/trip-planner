import React from 'react'

function Main() {
  return (
    <div>
    <h1>Find your next adventure</h1>
      <p>Type your transportation + hotel budget estimate and we'll give a list of possible traveling options. </p>
      I plan to spend <br/>
      <input type='number' placeholder='Type your travel expenditure'></input>
      on hotels + plane tickets
      <br/><br/>
      <button>Show me the way</button>
    </div>
  )
}

export default Main
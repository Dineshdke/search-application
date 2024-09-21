import React, { useCallback, useEffect } from 'react'

function Formtable({item}) {

  return (
    <div className='parent'>
      <div>{item.id}</div>
      <div>{item.title}</div>
    </div>
  )
}

export default Formtable

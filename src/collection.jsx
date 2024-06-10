import React from 'react'

export const Collection = ({name, images}) => {
  return (
    <div className='collection'>
        <img className='collection_big' src={images[0]} alt="Item" />
        <h4>{name}</h4>
    </div>
  )
}

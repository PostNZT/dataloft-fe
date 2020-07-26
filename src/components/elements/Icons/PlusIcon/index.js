import React from 'react'

const PlusIcon = ({ height = 20}) => {
  return (
    <svg height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="12" width="4" height="20" transform="rotate(-90 0 12)" fill="#FF0000"/>
      <rect x="8" width="4" height="20" fill="white"/>
    </svg>

  )
}

export default PlusIcon
import React from 'react'
import { AddCircleIcon, ContentCopyIcon, DeleteOutlineIcon } from '../utils/Icons'

function Actions() {
  return (
    <>
        <div className='flex flex-col w-20 my-5 mx-5'>
            <span className='mb-2'><AddCircleIcon className='scale-90'/></span>
            <span className='mb-2'><ContentCopyIcon className='scale-75'/></span>
            <span className='mb-2'><DeleteOutlineIcon/></span>
        </div>
    </>
  )
}

export default Actions
import React from 'react'
import { NoteAddOutlinedIcon, VisibilityOutlinedIcon } from '../utils/Icons'

function Title() {
    return (
        <>
            <div className='flex shadow-md p-2 w-[70%] rounded-md justify-between items-center'>
                <div className='font-semibold'>Untitled Quiz</div>
                <div className='flex flex-row items-center'>
                    <div className='mx-3'>
                        <span className='mr-3'>
                            <NoteAddOutlinedIcon />
                        </span>
                        <span className='mr-3'>
                            <VisibilityOutlinedIcon />
                        </span>
                    </div>
                    <button className='bg-[#2c52c2] hover:bg-[#1F3A8A] text-white px-4 py-1 rounded-md'>Save</button>
                </div>
            </div>
        </>
    )
}

export default Title
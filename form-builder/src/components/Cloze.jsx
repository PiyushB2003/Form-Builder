import React, { useState } from 'react'
import { AddPhotoAlternateRoundedIcon, HelpOutlineOutlinedIcon } from '../utils/Icons';
import Actions from './Actions';

function Cloze() {
    const [options, setOptions] = useState(["brown", "fence"]);
    const [newOption, setNewOption] = useState("");

    const handleAddOption = () => {
        if (newOption.trim() && !options.includes(newOption)) {
            setOptions([...options, newOption.trim()]);
            setNewOption("");
        }
    };


    const handleRemoveOption = (index) => {
        setOptions(options.filter((_, i) => i !== index));
    };
    return (
        <>
            <div className='flex flex-row my-7'>

                <div className="border focus-within:border-l-8 focus-within:border-blue-300 rounded-lg w-2/3 shadow-md p-4 bg-white space-y-2">
                    <div className="flex items-center justify-center w-full">
                        <span className="text-white font-bold py-2 px-3 rounded-full bg-[#93C4FD] text-center">Cloze</span>
                    </div>
                    <h2 className="text-xl font-bold mb-4">Question 2</h2>

                    <div className="mb-4 flex items-center justify-between w-full">
                        <div className='w-2/3 flex items-center'>
                            <div className='w-2/3'>
                                <label className="block text-gray-700 font-medium mb-2">Preview</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
                                    placeholder="A quick ___ fox jumped over a ___"
                                    disabled
                                />
                            </div>
                            <span className=' text-gray-500 mx-3'>
                                <AddPhotoAlternateRoundedIcon />
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="number"
                                placeholder="Points"
                                className="border rounded-lg px-2 py-2 w-20 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mb-4 w-2/3">
                        <label className="block text-gray-700 font-medium mb-2">Sentence</label>
                        <input
                            type="text"
                            className="w-2/3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="A quick brown fox jumped over a fence"
                        />
                    </div>

                    <div className="mb-4">
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center mb-2 w-40">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    defaultChecked
                                />
                                <input
                                    type="text"
                                    value={option}
                                    className="flex-grow w-40 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
                                    readOnly
                                />
                                <button
                                    className="ml-2 text-red-500 hover:text-red-700"
                                    onClick={() => handleRemoveOption(index)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        {/* <div className="flex items-center mt-2">
                        <input
                            type="text"
                            value={newOption}
                            onChange={(e) => setNewOption(e.target.value)}
                            className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add a new option"
                        />
                        <button
                            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            onClick={handleAddOption}
                        >
                            Add
                        </button>
                    </div> */}
                    </div>
                </div>
                <Actions />
            </div>
        </>
    )
}

export default Cloze
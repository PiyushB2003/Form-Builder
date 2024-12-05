import React, { useState } from 'react'
import { AddPhotoAlternateRoundedIcon, DeleteOutlineIcon, DragIndicatorIcon } from '../utils/Icons';
import Actions from './Actions';

function Categorize() {
    const [categories, setCategories] = useState(["cat 1", "cat 2"]);
    const [items, setItems] = useState(["ans 1", "ans 2"]);
    const [image, setImage] = useState(null);
    const [inputKey, setInputKey] = useState(Date.now());

    const addCategory = () => setCategories([...categories, ""]);
    const addItem = () => setItems([...items, ""]);

    const updateCategory = (index, value) => {
        const updated = [...categories];
        updated[index] = value;
        setCategories(updated);
    };

    const updateItem = (index, value) => {
        const updated = [...items];
        updated[index] = value;
        setItems(updated);
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleIconClick = () => {
        document.getElementById('fileInput1').click(); // Trigger the hidden input click
    };

    const handleCancel = () => {
        setImage(null);
        setInputKey(Date.now());
    };

    const removeCategory = (index) => setCategories(categories.filter((_, i) => i !== index));
    const removeItem = (index) => setItems(items.filter((_, i) => i !== index));
    return (
        <>
            <div className='flex flex-row my-7'>
                <div className="border focus-within:border-l-8 focus-within:border-blue-300 rounded-lg w-2/3 shadow-md p-4 bg-white space-y-2">
                    <div className="flex items-center justify-center w-full">
                        <span className="text-white font-bold py-2 px-3 rounded-full bg-[#93C4FD] text-center">Categorize</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <span className="text-gray-500 cursor-grab">
                            <DragIndicatorIcon />
                        </span>
                        <h2 className="text-xl font-bold">Question 1</h2>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className='w-2/3'>
                            <input
                                type="text"
                                placeholder="Description (Optional)"
                                className="border rounded-lg px-3 py-2 w-2/3 focus:outline-none focus:ring focus:border-blue-500"
                            />
                            <span className=' text-gray-500 mx-3 cursor-pointer' onClick={handleIconClick}>
                                <AddPhotoAlternateRoundedIcon />
                                <input
                                    id="fileInput1"
                                    key={inputKey}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
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
                    {image && (
                        <div className="w-1/2 my-1 flex items-start">
                            <img
                                src={image}
                                alt="Selected"
                                className="rounded-lg shadow-md h-20 w-28"
                            />
                            <button
                                onClick={handleCancel}
                                className=" px-1"
                            >
                                <DeleteOutlineIcon />
                            </button>
                        </div>
                    )}

                    {/* Categories Section */}
                    <div>
                        <h4 className="font-semibold mb-2">Categories</h4>
                        {categories.map((category, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <span className="text-gray-500 cursor-grab">
                                    <DragIndicatorIcon className="scale-75" />
                                </span>
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => updateCategory(index, e.target.value)}
                                    placeholder={`Category ${index + 1}`}
                                    className="border rounded-lg px-3 py-2 w-40 focus:outline-none focus:ring focus:border-blue-500"
                                />
                                <button
                                    onClick={() => removeCategory(index)}
                                    className="text-gray-800 hover:text-black"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addCategory}
                            className="text-blue-500 hover:text-blue-700 font-semibold"
                        >
                            + Add Category
                        </button>
                    </div>

                    {/* Items Section */}
                    <div>
                        <div className='flex'>
                            <h4 className="font-semibold pr-3 w-40 mb-2">Item</h4>
                            <h4 className="font-semibold pl-10 mb-2">Belongs To</h4>
                        </div>
                        {items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4 mb-2">
                                <span className="text-gray-500 cursor-grab">
                                    <DragIndicatorIcon className="scale-75" />
                                </span>
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => updateItem(index, e.target.value)}
                                    placeholder={`Item ${index + 1}`}
                                    className="border rounded-lg px-3 py-2 w-40 focus:outline-none focus:ring focus:border-blue-500"
                                />
                                <button
                                    onClick={() => removeItem(index)}
                                    className="text-gray-800 hover:text-black"
                                >
                                    ✕
                                </button>
                                <select
                                    className="border rounded-lg px-3 py-2 w-40 focus:outline-none focus:ring focus:border-blue-500"
                                >
                                    {categories.map((category, i) => (
                                        <option key={i} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                        <button
                            onClick={addItem}
                            className="text-blue-500 hover:text-blue-700 font-semibold"
                        >
                            + Add Item
                        </button>
                    </div>
                </div>
                <Actions />
            </div>

        </>
    )
}

export default Categorize
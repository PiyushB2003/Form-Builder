import React, { useState, useRef } from 'react'
import { AddPhotoAlternateRoundedIcon, DeleteOutlineIcon, DragIndicatorIcon } from '../utils/Icons';
import Actions from './Actions';

function Cloze() {
    const [options, setOptions] = useState([]);
    const [newOption, setNewOption] = useState("");
    const [image, setImage] = useState(null);
    const [inputKey, setInputKey] = useState(Date.now());
    const [showUnderline, setShowUnderline] = useState(false);
    const [underlinedWords, setUnderlinedWords] = useState([]);
    const [previewText, setPreviewText] = useState("");
    const contentRef = useRef(null);

    const handleAddOption = () => {
        if (newOption.trim() && !options.includes(newOption)) {
            setOptions([...options, newOption.trim()]);
            setNewOption("");
        }
    };

    const handleRemoveOption = (index) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    const updatePreviewText = (wordsArray = underlinedWords, text) => {
        const currentText = text || (contentRef.current ? contentRef.current.innerText : "");
        let updatedText = currentText;

        wordsArray.forEach((word) => {
            const regex = new RegExp(`\\b${word}\\b`, "g");
            updatedText = updatedText.replace(regex, "___");
        });

        setPreviewText(updatedText);
    };

    const handleContentChange = () => {
        if (contentRef.current) {
            const currentText = contentRef.current.innerText;
            updatePreviewText(underlinedWords, currentText); // Pass the current text to updatePreviewText
        }
    };

    const handleTextSelect = () => {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        setShowUnderline(!!selectedText);
    };


    const handleApplyUnderline = () => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        if (!selection.toString().trim()) {
            setShowUnderline(false);
            return;
        }

        const selectedText = selection.toString().trim();

        if (selectedText && !underlinedWords.includes(selectedText)) {
            const updatedWords = [...underlinedWords, selectedText];
            setUnderlinedWords(updatedWords);

            if (!options.includes(selectedText)) {
                setOptions([...options, selectedText]);
            }

            updatePreviewText(updatedWords);

            const span = document.createElement("span");
            span.style.textDecoration = "underline";
            span.textContent = selectedText;

            range.deleteContents();
            range.insertNode(span);

            selection.removeAllRanges();
        }

        setShowUnderline(false);
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
        document.getElementById('fileInput2').click();
    };

    const handleCancel = () => {
        setImage(null);
        setInputKey(Date.now());
    };

    return (
        <>
            <div className="flex flex-row my-7">
                <div className="border focus-within:border-l-8 focus-within:border-blue-300 rounded-lg w-2/3 shadow-md p-4 bg-white space-y-2">
                    <div className="flex items-center justify-center w-full">
                        <span className="text-white font-bold py-2 px-3 rounded-full bg-[#93C4FD] text-center">
                            Cloze
                        </span>
                    </div>
                    <div className="flex items-center mb-4">
                        <span className="text-gray-500 cursor-grab">
                            <DragIndicatorIcon />
                        </span>
                        <h2 className="text-xl font-bold">Question 2</h2>
                    </div>

                    {/* Preview Input */}
                    <div className="mb-4 flex items-center justify-between w-full">
                        <div className="w-2/3 flex items-center">
                            <div className="w-2/3">
                                <label className="block text-gray-700 font-medium mb-2">Preview</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
                                    value={previewText}
                                    readOnly
                                    disabled
                                />
                            </div>
                            <span className="text-gray-500 mx-3 cursor-pointer" onClick={handleIconClick}>
                                <AddPhotoAlternateRoundedIcon />
                                <input
                                    id="fileInput2"
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

                    {/* Selection Div */}
                    <div className="mb-4 flex items-center justify-between w-full">
                        <div className="w-2/3 flex items-center">
                            <div className="w-2/3">
                                <label className="block text-gray-700 font-medium mb-2">Selection</label>
                                <div
                                    ref={contentRef}
                                    contentEditable
                                    suppressContentEditableWarning
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
                                    onInput={handleContentChange}
                                    onMouseUp={handleTextSelect}
                                    onKeyUp={handleTextSelect}
                                    style={{ minHeight: "40px" }}
                                >

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        {showUnderline && (
                            <button
                                onClick={handleApplyUnderline}
                                className="absolute left-1/2 bottom-3 text-black font-bold shadow-md border px-2 py-1 rounded-md underline"
                            >
                                U
                            </button>
                        )}
                    </div>
                    <div className="mb-4">
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center mb-2 w-40">
                                <span className="text-gray-500 cursor-grab">
                                    <DragIndicatorIcon className="scale-75" />
                                </span>
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
                            </div>
                        ))}
                    </div>
                </div>
                <Actions />
            </div>
        </>
    )
}

export default Cloze
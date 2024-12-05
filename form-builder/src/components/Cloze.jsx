import React, { useState, useRef } from "react";
import {
    AddCircleIcon,
    AddPhotoAlternateRoundedIcon,
    ContentCopyIcon,
    DeleteOutlineIcon,
    DragIndicatorIcon,
    FormatUnderlinedIcon,
} from "../utils/Icons";

function Cloze() {
    const [questionBoxes, setQuestionBoxes] = useState([
        { id: Date.now(), options: [], newOption: "", image: null, previewText: "", underlinedWords: [] },
    ]);
    const [showUnderline, setShowUnderline] = useState(false); // Tracks underline mode
    const selectionRef = useRef(null); // Tracks the current selection

    const handleAddQuestionBox = () => {
        const newBox = {
            id: Date.now(),
            options: [],
            newOption: "",
            image: null,
            previewText: "",
            underlinedWords: [],
        };
        setQuestionBoxes([...questionBoxes, newBox]);
    };

    const handleCopyQuestionBox = (id) => {
        const boxToCopy = questionBoxes.find((box) => box.id === id);
        if (boxToCopy) {
            const copiedBox = {
                ...boxToCopy,
                id: Date.now(), // Assign a new ID for the copied box
            };
            setQuestionBoxes([...questionBoxes, copiedBox]);
        }
    };

    const handleDeleteQuestionBox = (id) => {
        setQuestionBoxes(questionBoxes.filter((box) => box.id !== id));
    };

    const updateQuestionBox = (id, updatedData) => {
        setQuestionBoxes(
            questionBoxes.map((box) =>
                box.id === id ? { ...box, ...updatedData } : box
            )
        );
    };

    const handleApplyUnderline = (id) => {
        const selection = window.getSelection();
        const selectedText = selection.toString();

        if (selectedText) {
            document.execCommand("underline"); 
        }

        if (selectedText) {
            const updatedUnderlinedWords = [
                ...questionBoxes.find((box) => box.id === id).underlinedWords,
                selectedText,
            ];

            updateQuestionBox(id, {
                underlinedWords: updatedUnderlinedWords,
                previewText: generatePreviewText(
                    questionBoxes.find((box) => box.id === id).previewText,
                    updatedUnderlinedWords
                ),
            });
        }
    };

    const generatePreviewText = (text, underlinedWords) => {
        let updatedText = text;
        underlinedWords.forEach((word) => {
            const regex = new RegExp(`\\b${word}\\b`, "g");
            updatedText = updatedText.replace(regex, "____");
        });
        return updatedText;
    };

    return (
        <>
            {questionBoxes.map((box) => (
                <div key={box.id} className="flex flex-row my-7">
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
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Preview
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
                                        value={box.previewText}
                                        readOnly
                                        disabled
                                    />
                                </div>
                                <span
                                    className="text-gray-500 mx-3 mt-3 cursor-pointer"
                                    onClick={() =>
                                        document.getElementById(`fileInput-${box.id}`).click()
                                    }
                                >
                                    <AddPhotoAlternateRoundedIcon />
                                    <input
                                        id={`fileInput-${box.id}`}
                                        key={box.id}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    updateQuestionBox(box.id, { image: reader.result });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
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
                        {box.image && (
                            <div className="w-1/2 my-1 flex items-start">
                                <img
                                    src={box.image}
                                    alt="Selected"
                                    className="rounded-lg shadow-md h-20 w-28"
                                />
                                <button
                                    onClick={() => updateQuestionBox(box.id, { image: null })}
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
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Selection
                                    </label>
                                    <div
                                        contentEditable
                                        suppressContentEditableWarning
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
                                        style={{ minHeight: "40px" }}
                                        onInput={(e) =>
                                            updateQuestionBox(box.id, {
                                                previewText: e.currentTarget.innerText,
                                            })
                                        }
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Underline Button */}
                        <div className="relative">
                            <button
                                onClick={() => handleApplyUnderline(box.id)}
                                className="absolute left-[46%] bottom-3 text-black font-bold shadow-md border px-2 py-1 rounded-md underline"
                            >
                                <FormatUnderlinedIcon />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col w-20 my-5 mx-5">
                        <span
                            className="mb-2 cursor-pointer"
                            onClick={handleAddQuestionBox}
                        >
                            <AddCircleIcon className="scale-90" />
                        </span>
                        <span
                            className="mb-2 cursor-pointer"
                            onClick={() => handleCopyQuestionBox(box.id)}
                        >
                            <ContentCopyIcon className="scale-75" />
                        </span>
                        <span
                            className="mb-2 cursor-pointer"
                            onClick={() => handleDeleteQuestionBox(box.id)}
                        >
                            <DeleteOutlineIcon />
                        </span>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Cloze;

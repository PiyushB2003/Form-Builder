import React, { useState } from "react";
import {
    AddCircleIcon,
    AddCircleOutlineIcon,
    AddPhotoAlternateRoundedIcon,
    ContentCopyIcon,
    DeleteOutlineIcon,
    DragIndicatorIcon
} from "../utils/Icons";
import Actions from "./Actions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Comprehension() {
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [image, setImage] = useState(null);
    const [inputKey, setInputKey] = useState(Date.now());
    const [mcqData, setMcqData] = useState({
        question: "",
        options: ["", "", "", ""],
        correctOption: null,
        points: 1,
    });
    const [questions, setQuestions] = useState([]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedQuestions = [...questions];
        const [removed] = reorderedQuestions.splice(result.source.index, 1);
        reorderedQuestions.splice(result.destination.index, 0, removed);

        setQuestions(reorderedQuestions);
    };

    const handleAddQuestion = () => {
        setShowQuestionForm(true);
    };

    const handleCancelQuestion = () => {
        setMcqData({ question: "", options: ["", "", "", ""], correctOption: null, points: 1 });
        setShowQuestionForm(false);
    };

    const handleDuplicateQuestion = (questionIndex) => {
        // Duplicate the question at the specified index
        const duplicatedQuestion = { ...questions[questionIndex] };
        setQuestions([...questions, duplicatedQuestion]);
    };

    const handleDeleteQuestion = (questionIndex) => {
        // Filter out the question at the specified index
        const updatedQuestions = questions.filter((_, index) => index !== questionIndex);
        setQuestions(updatedQuestions);
    };

    const handleSaveQuestion = () => {
        if (
            mcqData.question.trim() &&
            mcqData.options.every((opt) => opt.trim()) &&
            mcqData.correctOption !== null
        ) {
            setQuestions([...questions, mcqData]);
            setMcqData({ question: "", options: ["", "", "", ""], correctOption: null, points: 1 });
            setShowQuestionForm(false);
        } else {
            alert("Please fill out all fields and select a correct answer.");
        }
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...mcqData.options];
        updatedOptions[index] = value;
        setMcqData({ ...mcqData, options: updatedOptions });
    };

    const handleCorrectOptionSelection = (index) => {
        setMcqData({ ...mcqData, correctOption: index });
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
        document.getElementById('fileInput').click(); // Trigger the hidden input click
    };

    const handleCancel = () => {
        setImage(null);
        setInputKey(Date.now()); 
    };

    return (
        <div className="flex flex-row my-7 space-y-6">
            {/* Question Builder */}
            <div className="border focus-within:border-l-8 focus-within:border-blue-300 rounded-lg w-2/3 shadow-md p-4 bg-white space-y-2">
                <div className="flex items-center justify-center w-full">
                    <span className="text-white font-bold py-2 px-3 rounded-full bg-[#93C4FD] text-center">Comprehension</span>
                </div>
                <div className="flex items-center mb-4">
                    <span className="text-gray-500 cursor-grab">
                        <DragIndicatorIcon />
                    </span>
                    <h2 className="text-xl font-bold">Question 3</h2>
                </div>

                <div className="mb-4 flex items-center justify-between w-full">
                    <div className="w-2/3 flex items-start">
                        <div className="w-2/3">
                            <textarea
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 resize-none overflow-hidden"
                                placeholder="Type passage here"
                                rows="1"
                                onInput={(e) => {
                                    e.target.style.height = "auto"; // Reset height to auto to calculate new height
                                    e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on content
                                }}
                            ></textarea>
                        </div>
                        <span className="text-gray-500 cursor-pointer mx-3" onClick={handleIconClick}>
                            <AddPhotoAlternateRoundedIcon />
                            <input
                                id="fileInput"
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
                {questions.length > 0 && (
                    <div className="w-2/3 flex flex-row">
                        <div className="w-full space-y-6">
                            {questions.map((q, questionIndex) => (
                                <div className="flex flex-row w-full" key={questionIndex}>
                                    <div
                                        className="border w-full border-gray-300 rounded-lg p-4 bg-white shadow-md"
                                    >
                                        <div className="flex items-center">
                                            <span className="text-gray-500 cursor-grab">
                                                <DragIndicatorIcon className="scale-75" />
                                            </span>
                                            <p className="font-bold">{`Q${questionIndex + 1}: ${q.question}`}</p>
                                        </div>
                                        <ul className="mt-2 space-y-2">
                                            {q.options.map((option, optionIndex) => (
                                                <li key={optionIndex}>
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="radio"
                                                            name={`question-${questionIndex}`}
                                                            className="form-radio text-blue-500"
                                                        />
                                                        <span>{option}</span>
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="mt-2 text-gray-600">{`Points: ${q.points}`}</p>
                                    </div>
                                    <div className='flex flex-col w-20 my-2 mx-5'>
                                        <span
                                            className='mb-2'
                                            onClick={() => handleAddQuestion()}
                                        >
                                            <AddCircleIcon className='scale-90 cursor-pointer' />
                                        </span>
                                        <span
                                            className='mb-2'
                                            onClick={() => handleDuplicateQuestion(questionIndex)}
                                        >
                                            <ContentCopyIcon className='scale-75 cursor-pointer' />
                                        </span>
                                        <span
                                            className='mb-2'
                                            onClick={() => handleDeleteQuestion(questionIndex)}
                                        >
                                            <DeleteOutlineIcon className="cursor-pointer" />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {showQuestionForm && (
                    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md animate-slide-down w-2/3">
                        <h3 className="text-lg font-semibold mb-4">Add MCQ</h3>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700 mb-2">
                                Question
                            </label>
                            <input
                                type="text"
                                value={mcqData.question}
                                onChange={(e) =>
                                    setMcqData({ ...mcqData, question: e.target.value })
                                }
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium text-gray-700 mb-2">Options</label>
                            {mcqData.options.map((option, index) => (
                                <div key={index} className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={`Option ${index + 1}`}
                                    />
                                    <input
                                        type="radio"
                                        name="correctOption"
                                        checked={mcqData.correctOption === index}
                                        onChange={() => handleCorrectOptionSelection(index)}
                                        className="form-radio text-blue-500"
                                    />
                                    <span>Select as Correct</span>
                                </div>
                            ))}
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium text-gray-700 mb-2">Points</label>
                            <input
                                type="number"
                                value={mcqData.points}
                                onChange={(e) =>
                                    setMcqData({ ...mcqData, points: parseInt(e.target.value) || 1 })
                                }
                                min="1"
                                className="w-20 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex space-x-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                onClick={handleSaveQuestion}
                            >
                                Save
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                onClick={handleCancelQuestion}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {
                    questions.length < 1 && <button
                        className="flex items-center rounded-full bg-gray-200 w-40 justify-center py-2 text-gray-500"
                        onClick={handleAddQuestion}
                    >
                        <span className="mx-[2px]">
                            <AddCircleOutlineIcon />
                        </span>
                        <p className="mx-[2px] font-semibold">Add Question</p>
                    </button>
                }

            </div>

            <Actions />
        </div>
    );
}

export default Comprehension;

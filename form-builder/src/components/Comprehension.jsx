import React, { useState } from "react";
import {
    AddCircleOutlineIcon,
    AddPhotoAlternateRoundedIcon,
    HelpOutlineOutlinedIcon,
} from "../utils/Icons";

function Comprehension() {
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [mcqData, setMcqData] = useState({
        question: "",
        options: ["", "", "", ""],
        correctOption: null,
        points: 1,
    });
    const [questions, setQuestions] = useState([]);

    const handleAddQuestion = () => {
        setShowQuestionForm(true);
    };

    const handleCancelQuestion = () => {
        setMcqData({ question: "", options: ["", "", "", ""], correctOption: null, points: 1 });
        setShowQuestionForm(false);
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

    return (
        <div className="flex flex-col my-7 space-y-6">
            {/* Question Builder */}
            <div className="border focus-within:border-l-8 focus-within:border-blue-300 rounded-lg w-2/3 shadow-md p-4 bg-white space-y-2">
                <div className="flex items-center justify-center w-full">
                    <span className="text-white font-bold py-2 px-3 rounded-full bg-[#93C4FD] text-center">Comprehension</span>
                </div>
                <h2 className="text-xl font-bold mb-4">Question 3</h2>

                <div className="mb-4 flex items-center justify-between w-full">
                    <div className="w-2/3 flex items-center">
                        <div className="w-2/3">
                            <textarea
                                className="w-full border border-gray-300 rounded-lg px-2 pt-2 focus:outline-none focus:ring focus:border-blue-500"
                                placeholder="Type passage here"
                            ></textarea>
                        </div>
                        <span className="text-gray-500 mx-3">
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

                <button
                    className="flex items-center rounded-full bg-gray-200 w-40 justify-center py-2 text-gray-500"
                    onClick={handleAddQuestion}
                >
                    <span className="mx-[2px]">
                        <AddCircleOutlineIcon />
                    </span>
                    <p className="mx-[2px] font-semibold">Add Question</p>
                </button>
            </div>

            {/* Add Question Form */}
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

            {/* Render Questions as Interactive MCQs */}
            {questions.length > 0 && (
                <div className="w-2/3 space-y-6">
                    {questions.map((q, questionIndex) => (
                        <div
                            key={questionIndex}
                            className="border border-gray-300 rounded-lg p-4 bg-white shadow-md"
                        >
                            <p className="font-bold">{`Q${questionIndex + 1}: ${q.question}`}</p>
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
                    ))}
                </div>
            )}
        </div>
    );
}

export default Comprehension;

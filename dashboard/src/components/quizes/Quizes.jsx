import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import './quizes.css'

const Quizes = () => {
  const [questions, setQuestions] = useState([
    { id: uuidv4(), question: '', options: ['', '', '', ''], answer: '' }
  ]);

  const handleQuestionChange = (index, event) => {
    const newQuestions = questions.slice();
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = questions.slice();
    newQuestions[qIndex].options[oIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (index, event) => {
    const newQuestions = questions.slice();
    newQuestions[index].answer = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { id: uuidv4(), question: '', options: ['', '', '', ''], answer: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Quiz:', questions);
    alert('Quiz data logged to console. Use this data to test with Postman.');

    // Mock API endpoint for testing with Postman
    const url = 'http://localhost:3000/'; // Replace with your actual API endpoint if available
    try {
      const response = await axios.post(url, { questions });
      console.log('Response:', response.data);
      alert('Quiz created successfully! Check console for response.');
    } catch (error) {
      console.error('There was an error creating the quiz!', error);
    }
  };
  return (
    <div>
      <div className="courses">
        <h2>Create Quizes</h2>
        <p>Whole data about your business here</p>

        <div className="create-quiz">
          <form onSubmit={handleSubmit}>
            {questions.map((q, qIndex) => (
              <div key={q.id} className="question-card">
                <label>
                  <h5>Question:</h5>
                  <input
                    className='question_inp'
                    type="text"
                    value={q.question}
                    onChange={(e) => handleQuestionChange(qIndex, e)}
                    placeholder='Enter your question'
                  />
                </label>
                <div className="options">
                  {q.options.map((option, oIndex) => (
                    <label key={oIndex}>
                      <p>Option {oIndex + 1}:</p>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                        placeholder={`Enter option ${oIndex + 1}`}
                      />
                    </label>
                  ))}
                </div>
                <label className='correct_ans'>
                  Correct Answer:
                  <input
                    type="text"
                    value={q.answer}
                    onChange={(e) => handleAnswerChange(qIndex, e)}
                    placeholder='Enter correct answer'
                  />
                </label>
              </div>
            ))}
            <input type="button" value="Add Question" onClick={addQuestion} />
            <input type="button" value="Create Quiz" />
          </form>
        </div>

      </div>
    </div>
  )
}

export default Quizes

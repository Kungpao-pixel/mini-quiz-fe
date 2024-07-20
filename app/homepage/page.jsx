"use client";
import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/questions", {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();
        console.log("Fetched Questions:", data);
        setQuestions(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching questions:", error);
        }
      }
    };

    fetchQuestions();

    return () => {
      controller.abort();
    };
  }, []);

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleNextQuestion = useCallback(async () => {
    if (selectedAnswer) {
      try {
        const response = await fetch("http://localhost:3000/api/answers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
          body: JSON.stringify({
            questionId: questions[currentQuestionIndex].id,
            answerId: selectedAnswer
          })
        });
  
        if (!response.ok) {
          throw new Error("Failed to check answer");
        }
  
        const data = await response.json();
        console.log("Answer Check:", data);
  
        if (data.correct) {
          setScore((prevScore) => prevScore + 1);
        }
  
        setSelectedAnswer(null);
  
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
          setQuizCompleted(true);
        }
      } catch (error) {
        console.error("Error checking answer:", error);
      }
    }
  }, [selectedAnswer, currentQuestionIndex, questions]);
  
  
  

  if (quizCompleted) {
    return (
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
          <h1 className="text-3xl font-bold mb-4 text-black">Quiz Completed!</h1>
          <p className="text-2xl text-black font-bold">Your score: {score} / {questions.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
        {questions.length > 0 ? (
          <div className="w-full max-w-md p-4 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {questions[currentQuestionIndex].question_text}
            </h2>
            <div className="space-y-4 text-black">
              {questions[currentQuestionIndex].Answers.map((answer) => (
                <button
                  key={answer.id}
                  onClick={() => handleAnswerSelect(answer.id)}
                  className={`w-full p-2 text-left border rounded ${
                    selectedAnswer === answer.id ? "bg-blue-200" : "bg-gray-100"
                  } hover:bg-blue-100`}
                >
                  {answer.answer_text}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextQuestion}
              className="mt-4 btn btn-primary bg-blue-500 text-black p-2 rounded disabled:bg-gray-300"
              disabled={!selectedAnswer}
            >
              Next Question
            </button>
          </div>
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;

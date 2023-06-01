import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function Chatgpt() {
  const { t } = useTranslation();

  const [message, setMessage] = useState(t("addQuestion"));
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setOutputMessage] = useState("");
  const [lastTenQuestions, setLastTenQuestions] = useState([]);
  const [typing, setTyping] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);
  const [showAnswer, setShowAnswer] = useState(true);
  const sisestaRef = useRef();

  useEffect(() => {
    const storedQuestions = localStorage.getItem("lastTenQuestions");
    if (storedQuestions) {
      setLastTenQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  const addQuestion = () => {
    const inputValue = sisestaRef.current.value.trim();
    if (inputValue === "") {
      setMessage(t("cannotSubmitEmptyQuestion"));
    } else {
      setMessage(`${t("yourQuestion")} ${inputValue} `);
      setLastTenQuestions((prevQuestions) => {
        const updatedQuestions = [
          { question: inputValue, answer: "" },
          ...prevQuestions,
        ];
        localStorage.setItem(
          "lastTenQuestions",
          JSON.stringify(updatedQuestions)
        );
        return updatedQuestions;
      });
    }
  };

  const testButtonClick = () => {
    const inputText = sisestaRef.current.value;
    setInputMessage(inputText);
    console.log("Button clicked!", inputText);

    setOutputMessage("");

    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify({
        prompt: inputText,
        model: "text-davinci-003",
        max_tokens: 1000,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const answer = data.choices[0].text.trim();
        setLastTenQuestions((prevQuestions) => {
          const updatedQuestions = [...prevQuestions];
          updatedQuestions[0].answer = answer;
          localStorage.setItem(
            "lastTenQuestions",
            JSON.stringify(updatedQuestions)
          );
          return updatedQuestions;
        });
        setTyping(true);
        startTypingEffect(answer);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const startTypingEffect = (text) => {
    let index = 0;
    const typingSpeed = 30;
    const typingInterval = setInterval(() => {
      setOutputMessage((prevOutput) => prevOutput + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(typingInterval);
        setTyping(false);
        setShowAnswer(false);
      }
    }, typingSpeed);
  };

  const handleDelete = (index) => {
    setLastTenQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.splice(index, 1);
      localStorage.setItem(
        "lastTenQuestions",
        JSON.stringify(updatedQuestions)
      );
      return updatedQuestions;
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="text-xl font-semibold text-center mb-4">
        {t("feelFreeToAsk")}
      </div>

      <input
        id="küsimus"
        placeholder={t("enterYourQuestion")}
        ref={sisestaRef}
        type="text"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />

      <button
        onClick={() => {
          addQuestion();
          testButtonClick();
        }}
        className="mt-4 px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 w-full"
      >
        {t("AskNow")}
      </button>

      <div className="mt-4">{message}</div>

      <div
        className={`mt-4 bg-gray-400 rounded-md p-2 ${typing ? "typing" : ""}`}
        style={{ whiteSpace: "pre-wrap", minHeight: "200px" }}
      >
        {t("answer")}: {outputMessage}
      </div>

      <div className="mt-4">{t("last10Questions")}:</div>
      <ul className="mt-2">
        {lastTenQuestions.map((item, index) => (
          <li
            key={index}
            className={`bg-orange-100 rounded-md p-4 flex flex-col md:flex-row items-start md:items-center justify-between mb-2 ${
              showQuestion && index === 0 ? "hidden" : ""
            }`}
          >
            <div className="flex-grow">{item.question}</div>
            <div>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 underline"
              >
                {t("delete")}
              </button>
            </div>
            {item.answer && (
              <div
                className={`mt-2 ${showAnswer && index === 0 ? "hidden" : ""}`}
                style={{ whiteSpace: "pre-wrap", minHeight: "200px" }}
              >
                {t("answer")}: {item.answer}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chatgpt;

import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { FaSearch } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import run from "../../config/Ai";
import { setLocalStorage } from "../../utils/localStorage";

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  // ✅ Task Fields State
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [asignTo, setAsignTo] = useState("");
  const [category, setCategory] = useState("");

  // ✅ AI Section State
  const [response, setResponse] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false); // ✅ Track if response is copied
  const chatContainerRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();

    const newTask = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      active: false,
      newTask: true,
      failed: false,
      completed: false,
    };

    const updatedData = userData.map((user) => {
      if (user.firstName === asignTo) {
        return {
          ...user,
          tasks: [...user.tasks, newTask], // Spread old tasks, add new task
          taskCounts: {
            ...user.taskCounts,
            newTask: user.taskCounts.newTask + 1,
          },
        };
      } else {
        return user; // No change for other users
      }
    });

    setUserData(updatedData); // Correctly setting updated state
    localStorage.setItem("employees", JSON.stringify(updatedData));

    console.log("Updated Data Hunter", updatedData);

    // Clear form fields
    setTaskTitle("");
    setCategory("");
    setAsignTo("");
    setTaskDate("");
    setTaskDescription("");
  };

  // ✅ Handle Search Request
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchInput.trim() === "") return;

    // ✅ Clear Previous Response
    setResponse("");
    setIsTyping(true);

    try {
      // ✅ Call Gemini API
      const responseText = await run(searchInput);
      console.log(responseText, " I am a response");

      // ✅ Typing Effect Start
      typeWriterEffect(responseText);
      setSearchInput("");
    } catch (error) {
      console.error("Error:", error);

      // ✅ Error Handling
      if (error.response) {
        setResponse("❌ Failed to fetch response.");
      }
    } finally {
      setIsTyping(false);
    }
  };

  // ✅ Improved Typing Effect with Bullet Point Handling
  // ✅ Improved Typing Effect with Bold and Line Break Handling
  const typeWriterEffect = (text) => {
    let index = 0;
    let finalText = "";

    // ✅ Format text for bold and line breaks
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
      .replace(/\n\*/g, "<br />"); // New Line

    // ✅ Start typing effect
    const interval = setInterval(() => {
      if (index < formattedText.length) {
        finalText += formattedText.charAt(index);
        setResponse(finalText);
        index++;

        // ✅ Auto-scroll while typing
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 5);
  };

  // ✅ Copy To Clipboard Function
  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);

    // ✅ Show "Copied!" Message For 2 Seconds
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  // ✅ Smooth Scroll After Typing Complete
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [response]);

  return (
    <div className="p-5 bg-[#1c1c1c] mt-5 rounded">
      <form
        className="flex flex-wrap w-full items-start justify-between md:flex-row flex-col"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        {/* ✅ Left Section */}
        <div className="w-full md:w-1/2">
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Make a UI design"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Date</h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-white"
              type="date"
              style={{
                colorScheme: "dark", // Ensures dark mode compatibility
                WebkitAppearance: "none",
                appearance: "none",
                backgroundColor: "transparent",
                color: "white",
              }}
            />
          </div>

          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Assign to</h3>
            <select
              value={asignTo}
              onChange={(e) => setAsignTo(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-gray-300 appearance-none"
              style={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <option value="" disabled className="bg-gray-900">
                Select Employee
              </option>
              <option value="Arjun" className="bg-gray-900 text-white">
                Arjun
              </option>
              <option value="Sneha" className="bg-gray-900 text-white">
                Sneha
              </option>
              <option value="Ashu" className="bg-gray-900 text-white">
                Ashu
              </option>
              <option value="Alka" className="bg-gray-900 text-white">
                Alka
              </option>
              <option value="Krishna" className="bg-gray-900 text-white">
                Krishna
              </option>
            </select>
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-gray-300 appearance-none"
              style={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <option value="" disabled className="bg-gray-900">
                Select Category
              </option>
              <option value="Developer" className="bg-gray-900 text-white">
                Developer
              </option>
              <option value="Designer" className="bg-gray-900 text-white">
                Designer
              </option>
              <option value="Tester" className="bg-gray-900 text-white">
                Tester
              </option>
            </select>
          </div>
          <div className="w-4/5">
            <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="text-sm py-2 px-4 w-full rounded outline-none bg-transparent border-[1px] border-gray-400"
              rows="4"
              placeholder="Write task description"
            ></textarea>
            <button className="bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full">
              Create Task
            </button>
          </div>
        </div>

        {/* ✅ Right Section */}
        <div className="w-full md:w-2/5 mt-4 md:mt-0">
          <h3 className="text-sm text-gray-300 mb-0.5">
            Ask Artificial Intelligence ( AI )
          </h3>
          {/* ✅ Input With Search */}
          <div className="w-full flex items-center border-[1px] border-gray-400 rounded mb-4 px-3 py-2 gap-2">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Ask anything..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full text-sm py-1 px-2 outline-none bg-transparent"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
            />
            <button
              className="bg-blue-500 text-white text-sm px-4 py-1 rounded hover:bg-blue-600 transition"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          {/* ✅ AI Response Section */}
          <div
            className="w-full text-sm text-gray-300 overflow-auto"
            ref={chatContainerRef}
            style={{
              maxHeight: response ? "24rem" : "auto", // ✅ Set max height only when response comes
              transition: "max-height 0.3s ease-in-out", // ✅ Smooth transition
            }}
          >
            {/* ✅ Initial Greeting */}
            {!response && !isTyping && (
              <div>
                {/* ✅ Big Gradient Text */}
                <p
                  style={{
                    background:
                      "linear-gradient(to right, #9ed7ff , #ffffff , #9ed7ff)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    fontSize: "3.3rem", // ✅ Big Text
                    fontWeight: "bold",
                    lineHeight: "3.6rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  Hello Admin! <span>🤖</span>
                </p>

                {/* ✅ Subtext */}
                <p
                  style={{
                    fontSize: "1.2rem",
                    color: "#b0b0b0",
                    lineHeight: "1.8rem",
                    fontWeight: "500",
                  }}
                >
                  How can I help you today ?
                </p>
              </div>
            )}

            {/* ✅ Typing Effect */}
            {isTyping ? (
              <div className="animate-pulse">
                <div
                  className="h-4 w-2/3 mb-2 rounded"
                  style={{
                    background:
                      "linear-gradient(to right, #9ed7ff , #ffffff , #9ed7ff)",
                  }}
                ></div>
                <div
                  className="h-4 w-full mb-2 rounded"
                  style={{
                    background:
                      "linear-gradient(to right, #9ed7ff , #ffffff , #9ed7ff)",
                  }}
                ></div>
                <div
                  className="h-4 w-1/2 rounded"
                  style={{
                    background:
                      "linear-gradient(to right, #9ed7ff , #ffffff , #9ed7ff)",
                  }}
                ></div>
              </div>
            ) : (
              response && (
                <pre
                  style={{
                    fontSize: "1.1rem",
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.5rem",
                    maxHeight: "24rem",
                    overflowY: "auto",
                  }}
                  dangerouslySetInnerHTML={{ __html: response }} // ✅ Keep only this
                />
              )
            )}
          </div>

          {/* ✅ Copy Response Button */}
          {response && (
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="bg-emerald-500 text-white text-sm px-4 py-2 rounded flex items-center gap-2 hover:bg-emerald-600 transition"
              >
                <FaRegCopy /> Copy Response
              </button>
              {copied && (
                <span className="text-green-400 text-sm">
                  ✅ Copied Successfully!
                </span>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateTask;

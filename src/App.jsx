import './App.css'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import LoginForm from './components/LoginForm';
import { runGemini } from "./gemini";
import ReactMarkdown from "react-markdown";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  const navigate = useNavigate();
  const [user, setUserdets] = useState({});
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserdets(user);
        console.log("User is signed in:", user);
        navigate("/dashboard");
      } else {
        console.log("User is signed out.");
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [display, setDisplay] = useState(true);
  // const [response, setResponse] = useState("");

  // const GeminiResponse = async () => {
  //   setResponse("Thinking...");
  //   const output = await runGemini(prompt);
  //   setResponse(output);
  // }
  return (
    <>
      <div className='main w-screen h-screen flex justify-center flex-col items-center gap-4'>
        <Navbar displayName = {user.displayName}/>        
        <div className='flex flex-col w-[80%] h-[calc(100vh-80px)] bg-zinc-800 items-center p-4 gap-4'>
          <div className='w-full overflow-y-auto scroll-smooth h-[calc(100%-65px)] rounded-xl clear-both flex flex-col gap-3 '>
            {/* <div className='w-1/2 h-fit bg-red-500 flex-shrink-0 self-end text-left p-4 flex items-center'>{userPrompt}</div>
            <div className='w-full h-fit bg-red-500 flex-shrink-0 self-start text-left p-6 flex items-center'>{aiMessage}</div> */}
            <div className={`intro ${display ? "flex" : "hidden"} justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
              <h1 className='text-white text-4xl'>Welcome back 😊, {user.displayName}
                <br /><p className='text-white text-center text-2xl'>How can I help you today ?</p>
              </h1>
            </div>
            {
              chatHistory.map((msg,index) => (
                <div key={index} className={`w-${msg.sender === "user" ? "1/2 self-end p-4 justify-end bg-zinc-700 rounded-xl" : "full self-start p-6 text-left"} h-fit flex-shrink-0  flex flex-col items-center text-white whitespace-pre-wrap`}>
                  <ReactMarkdown>{msg.message}</ReactMarkdown>
                </div>
              ))
            }
            
          </div>
          <div className='flex w-full gap-4 p-2 bg-[#222] rounded-lg h-[65px]'>
            <div className='fileinputArea w-[5%]  rounded-sm flex items-center justify-center p-3 cursor-pointer hover:bg-[#3e3e3e]'>
              <label htmlFor="file" className='cursor-pointer'><PlusCircleIcon className="size-7 text-white" /></label>
              <input type="file" name="file" id="file" className='text-white w-[50%]' hidden/>
            </div>
            <div className='textinputArea w-[95%] flex justify-center '>
              <textarea name="textInput" id="textInput" className='w-full rounded-md  text-white  outline-none min-h-10 resize-none px-4 py-1 focus:bg-[#3e3e3e] hover:bg-[#3e3e3e]' value={prompt} placeholder='Enter your prompt here ....' onChange={(e)=>{
                setPrompt(e.target.value);
              }} onKeyDown={async (e) => {
                if (e.key == "Enter" && !e.shiftKey){
                  e.preventDefault();
                  setDisplay(false);
                  const userMessage = {sender: "user",message:prompt};
                  setChatHistory(prev => [...prev, userMessage]);
                  setPrompt("");

                  try {
                    const thinkingMessage = { sender: "ai", message: "Thinking" };
                    setChatHistory((prev) => [...prev,thinkingMessage]);
                    const output = await runGemini(prompt);
                    setChatHistory((prev) =>
                      prev.slice(0, -1).concat({ sender: "ai", message: output })
                    );
                  } catch (err) {
                    const errorMessage = { sender: "ai", message: "Failed to get response from Gemini." };
                    setChatHistory((prev) => [...prev, errorMessage]);
                  }
                }
              }}></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App


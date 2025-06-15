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
import SideBar from './components/SideBar';
import { Bars2Icon } from '@heroicons/react/24/outline';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import analysePDF from './utils/analysePDF';

function App() {
  const navigate = useNavigate();
  const [user, setUserdets] = useState({});
  const [display, setDisplay] = useState(true);
  const [file, setFile] = useState(null);
  const handlePDF = async () => {
    const response = await analysePDF(file);
    const aiMessage = { sender: "ai", message: response }
    setChatHistory((prev) =>
      prev.slice(0, -1).concat(aiMessage)
    );
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserdets(user);
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [displaySidebar, setDisplaySidebar] = useState(null);
  return (
    <>
      <div className='main w-screen h-screen flex justify-between  items-center gap-2'>
        <div className='w-[60px] flex justify-center items-center h-full'>
          <SideBar display = {displaySidebar} setDisplaySidebar= {setDisplaySidebar} displayName = {user.displayName} photo={user.photoURL}/>
          <Bars2Icon className='z-10 h-8 w-8 cursor-pointer text-white absolute top-6 left-3' onClick={() => {
            displaySidebar ? setDisplaySidebar(false) : setDisplaySidebar(true);
          }}/>
        </div>
        <div className='w-[100%] flex flex-col'>
          <Navbar displayName = {user.displayName} profilePicture = {user.photoURL}/>        
          <div className='flex flex-col w-[100%] md:w-full h-[calc(100vh-80px)] bg-zinc-800 items-center p-4 gap-4'>
            <div className='w-full overflow-y-auto scroll-smooth h-[calc(100%-65px)] rounded-xl clear-both flex flex-col gap-2'>
              {/* <div className='w-1/2 h-fit bg-red-500 flex-shrink-0 self-end text-left p-4 flex items-center'>{userPrompt}</div>
              <div className='w-full h-fit bg-red-500 flex-shrink-0 self-start text-left p-6 flex items-center'>{aiMessage}</div> */}
              <div className={`z-1 intro ${display ? "flex" : "hidden"} justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                <h1 className='text-white text-lg xl:text-4xl'>Welcome back 😊,<span className='text-center'>{user.displayName}</span>
                  <br /><p className='text-white text-center text-sm xl:text-xl'>How can I help you today ?</p>
                </h1>
              </div>
              {
                chatHistory.map((msg,index) => (
                  <div key={index} className={`w-${msg.sender === "user" ? "1/2 self-end p-4 justify-end bg-zinc-700 rounded-xl" : "full self-start p-6 text-left"} h-fit flex-shrink-0  flex flex-col gap-3 text-white whitespace-pre-wrap`}>
                    <ReactMarkdown
                      children={msg.message}
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    />
                  </div>
                ))
              }
              
            </div>
            <div className='flex w-full gap-4 p-2 bg-[#222] rounded-lg h-[65px]'>
              <div className='fileinputArea w-[5%]  rounded-sm flex items-center justify-center p-3 cursor-pointer hover:bg-[#3e3e3e]'>
                <label htmlFor="file" className='cursor-pointer'><PlusCircleIcon className="size-7 text-white" /></label>
                <input type="file" name="file" id="file" className='text-white w-[50%]' hidden onChange={(e) => {
                  setFile(e.target.files[0])
                }}/>
              </div>
              <button className='text-white border cursor-pointer' onClick={() => {
                const userMessage = {sender: "user",message:"File uploaded Please analyse it"};
                setChatHistory(prev => [...prev, userMessage]);
                setDisplay(false)
                handlePDF();
              }}>Analyse PDF</button>
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
        
      </div>
    </>
  )
}

export default App


    import "./Chat.css"
    import React, { useState  } from 'react'
    import gptIcon from "../../../public/images/chaticon.png"
    import person from "../../../public/images/person.jpeg"

    import { GoogleGenAI } from "@google/genai";

    // The client gets the API key from the environment variable `GEMINI_API_KEY`.
    const ai = new GoogleGenAI({
        apiKey : "AIzaSyBPUlkt3LkZ7vtNIpRjb-qzS8M-rvr7coM",
    });



    function Chat() {
        const [input, setInput] = useState("")
        const [active, setActive] = useState(false)
        const [messages, setMessages] = useState([])
        const [loading, setLoading] = useState(false)



        const handleInput = (e) => {
            const value = e.target.value
            setInput(value)
            if (value == "") {
                setActive(false)
            } else {
                setActive(true)
            }
            
        }


        const handleMessages = async () => {
            setMessages((prev) =>
                [...prev, { type: "client", text: input }]
            )
            setInput("")
            setLoading(true)
            setActive(false)
            try {
        const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                role: "user",
                parts: [{ text: input }],
            },
        ],
        });
        const fullText = response.text.replace(/[^a-zA-Z0-9\s]/g, '')
        let index = 0;
        setMessages((prev) => [...prev, { type: "gpt", text: "" }]);
        const typingInterval = setInterval(() => {
        index++;
        setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1].text = fullText.slice(0, index);
            return updated;
        });
        if (index >= fullText.length) {
            clearInterval(typingInterval);
        }
        }  , 30);
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setLoading(false)
            }
            
        }




        const messagesHtml = messages.map((mes, index) => {
            return (
                <div key={index} className={mes.type == "client" ? "person-text" : "gpt-text"}>
                    <img src={mes.type == "client" ? person : gptIcon} alt="img" />
                    <h4 className="text"> {mes.text} </h4>
                </div>
            )
        })


    return (
        <div className="chat-box">
            <div className="texts">
                <div className="text">
                    {messagesHtml}
                    <div className={loading?"loading active":"loading"}><span></span><span></span><span></span></div>
                </div>
            </div>
            <div className="input-box">
                <input value={input} onChange={handleInput} type="text" placeholder="your message" />
                <i onClick={handleMessages} className={active?"bi bi-send active" :"bi bi-send"}></i>
            </div>
        </div>
    )
    }

    export default Chat



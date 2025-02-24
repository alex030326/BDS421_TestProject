"use client";

import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ASK_AI = gql`
  query AskAI($query: String!) {
    askAI(query: $query)
  }
`;

const GET_CHAT_HISTORY = gql`
  query GetChatHistory {
    getChatHistory
  }
`;

export default function Home() {
    const [input, setInput] = useState("");
    const [askAI, { data, loading }] = useLazyQuery(ASK_AI);
    const { data: historyData, refetch } = useQuery(GET_CHAT_HISTORY);

    useEffect(() => {
        refetch(); // Aktualisiert die Historie nach jeder Anfrage
    }, [data]);

    return (
        <div className="chat-container">
            <div className="chat-box">
                <h1 className="text-3xl font-bold text-center mb-4">🤖 KI Chat</h1>
                <div className="message-container">
                    <div className="input-group">
                        <input
                            className="input-field"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Stelle eine Frage..."
                        />
                        <button
                            className="send-button"
                            onClick={() => {
                                askAI({ variables: { query: input } });
                                setInput("");
                            }}
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                    {loading && <p className="loading-text">⏳ Denke nach...</p>}
                    {data && (
                        <div className="response-box">
                            <p>{data.askAI}</p>
                        </div>
                    )}
                    {/* Historie anzeigen */}
                    <div className="history-container">
                        <h2 className="history-title">🔍 Letzte Anfragen</h2>
                        <ul className="history-list">
                            {historyData?.getChatHistory?.map(([question, answer], index) => (
                                <li key={index} className="history-item">
                                    <p className="question">❓ {question}</p>
                                    <p className="answer">💡 {answer}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

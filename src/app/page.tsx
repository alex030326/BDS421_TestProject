"use client";

import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ASK_AI = gql`
  query AskAI($query: String!) {
    askAI(query: $query)
  }
`;

export default function Home() {
    const [input, setInput] = useState("");
    const [askAI, { data, loading }] = useLazyQuery(ASK_AI);

    return (
        <div className="chat-container">
            <div className="chat-box">
                <div className="chat-title">
                    <span>🤖</span>
                    <h1>KI Chat</h1>
                </div>
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
                            onClick={() => askAI({ variables: { query: input } })}
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
                </div>
            </div>
        </div>
    );
}

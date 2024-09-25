import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Chat.module.css";
import Input from "../../../shared/ui/Input/Input";

export default function Chat() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [username, setUsername] = useState<string>();
  const [saved, setSaved] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("disconnected");

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    setSocket(newSocket);

    newSocket.onmessage = (event) => {
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          setMessages((prevMessages) => [
            ...prevMessages,
            reader.result as string,
          ]);
        };
        reader.readAsText(event.data);
      } else {
        event.data;
        setMessages((prevMessages) => [...prevMessages, event.data]);
      }
    };

    newSocket.onopen = () => {
      setStatus("online");
    };

    newSocket.onclose = () => {
      setStatus("disconnected");
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const fullMessage = `${username}: ${message}`;
      socket.send(fullMessage);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>
      {!saved ? (
        <Input
          label="Enter your name"
          type="text"
          value={username}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setUsername(evt.target.value)
          }
          endContent={
            <button
              type={"button"}
              onClick={() => {
                setSaved(true);
              }}
              className={styles.end_content_button}
            >
              Save
            </button>
          }
        />
      ) : (
        <>
          <h3>
            Welcome, {username} status: {status}
          </h3>
          <div className={styles.chatbox}>
            {messages.map((msg, index) => (
              <p className={styles.chat_item} key={index}>
                {msg}
              </p>
            ))}
          </div>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="input message"
            endContent={
              <button
                type={"button"}
                onClick={() => {
                  sendMessage();
                }}
                className={styles.end_content_button}
              >
                <svg
                  viewBox="0 0 48 48"
                  width="22"
                  height="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.02 42l41.98-18-41.98-18-.02 14 30 4-30 4z" />
                  <path d="M0 0h48v48h-48z" fill="none" />
                </svg>
              </button>
            }
          />
        </>
      )}
    </div>
  );
}

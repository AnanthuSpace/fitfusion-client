import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../../assets/styles/trainers/TrainerChat.css";
import { localhostURL } from "../../utils/url";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CustomerList from "./CustomerList";
import TrainerChatScreen from "./TrainerChatScreen";
import { fetchAlreadyChattedCustomer } from "../../redux/trainers/trainerThunk";


const socket = io(localhostURL);

function TrainerChat() {
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const [currentCustomerName, setCurrentCustomerName] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [chatHistory, setChatHistory] = useState([])
  const location = useLocation();
  const dispatch = useDispatch()

  const trainerData = useSelector((state) => state.trainer.trainerData);
  const alreadyChattedCustomer = useSelector((state) => state.trainer.alreadyChattedCustomer);

  useEffect(() => {
    setCurrentCustomerId(location.state?.customerId);
    setCurrentCustomerName(location.state?.customerName);
  }, [location.state]);

  useEffect(() => {
    if (selectedId !== "") {
      try {
        socket.emit("joinRoom", { userId: selectedId, trainerId: trainerData.trainerId });
      } catch (error) {
        console.log("Error : ", error);
      }
    }
  }, [selectedId]);

  useEffect(() => {
    dispatch(fetchAlreadyChattedCustomer(trainerData.alreadychattedUsers))
  },[])

  useEffect(() => {
    socket.on("receiveMessage", (messageDetails) => {
      setChatHistory([{...messageDetails},...chatHistory ]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  });

  const handleSendMessage = () => {
    
    if (newMessage.trim()) {
      const message = {
        senderId: trainerData.trainerId,
        recieverId: selectedId,
        text: newMessage,
      };
      
      const firstTimeChat = chatHistory.length === 0 ? true : false;    
      socket.emit("sendMessage",{ message, firstTimeChat})
      setNewMessage("");
    }
  };


  const handleSelectCustomer = (customerId, customerName) => {
    setSelectedId(customerId);
    setSelectedName(customerName);
  };

  return (
    <div className="d-flex flex-grow-1 overflow-hidden">
      <CustomerList
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentCustomerId={currentCustomerId}
        currentCustomerName={currentCustomerName}
        onSelectCustomer={handleSelectCustomer}
        setChatHistory={setChatHistory}
        alreadyChattedCustomer={alreadyChattedCustomer}
      />
      <TrainerChatScreen
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        currentCustomerName={selectedName}
        currentCustomerId={selectedId}
        chatHistory={chatHistory}
        receiverId={trainerData.trainerId}
      />
    </div>
  );
}

export default TrainerChat;

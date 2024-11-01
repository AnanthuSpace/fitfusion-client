import React, { useState, useEffect } from "react";
import "../../assets/styles/trainers/TrainerChat.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CustomerList from "./CustomerList";
import TrainerChatScreen from "./TrainerChatScreen";
import { fetchAlreadyChattedCustomer } from "../../redux/trainers/trainerThunk";
import { useSocket } from "../../context/SocketContext";


function TrainerChat() {
  const socket = useSocket()
  const [searchTerm, setSearchTerm] = useState("");
  const [directChatId, setDirectChatId] = useState("");
  const [directChatName, setDirectChatName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const [currentCustomerName, setCurrentCustomerName] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [ rerender, setRerender] = useState(false)
  const location = useLocation();
  const dispatch = useDispatch();

  const trainerData = useSelector((state) => state.trainer.trainerData);
  const alreadyChattedCustomer = useSelector(
    (state) => state.trainer.alreadyChattedCustomer
  );
  

  useEffect(() => {
    setCurrentCustomerId(location.state?.customerId);
    setCurrentCustomerName(location.state?.customerName);
    setDirectChatId(location.state?.customerId);
    setDirectChatName(location.state?.customerName);
  }, [location.state]);

  useEffect(() => {
    if (selectedId !== "") {
      try {
        socket.emit("joinRoom", {
          sender: trainerData.trainerId,
          reciver: selectedId,
        });
      } catch (error) {
        console.log("Error : ", error);
      }
    }
  }, [selectedId]);

  useEffect(() => {
    if(trainerData.alreadychattedUsers){
      dispatch(fetchAlreadyChattedCustomer(trainerData.alreadychattedUsers)).then((res)=>{
        if(res.meta.requestStatus == "fulfilled"){
          setRerender(true)
        } 
      })
    }
  }, [trainerData, chatHistory ]);

  useEffect(() => {
    socket.on("receiveMessage", (messageDetails) => {
      setChatHistory([{ ...messageDetails }, ...chatHistory]);
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
      console.log(message)
      const firstTimeChat = chatHistory.length ===0 ? true : false;
      socket.emit("sendMessage", { message, firstTimeChat });
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
        directChatId={directChatId}
        directChatName={directChatName}
        setSelectedId={setSelectedId}
        rerender= {rerender}
      />

      <TrainerChatScreen
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        currentCustomerName={selectedName}
        currentCustomerId={selectedId}
        chatHistory={chatHistory}
        receiverId={trainerData.trainerId}
        directChatId={directChatId}
        socket={socket}
      />
    </div>
  );
}

export default TrainerChat;

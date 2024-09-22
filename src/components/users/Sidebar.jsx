import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/users/userSlice";
import { IoIosNotifications, IoMdSettings } from "react-icons/io";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { LuSendHorizonal } from "react-icons/lu";
import { inactive } from "../../redux/users/userThunk";
import "../../assets/styles/users/Sidebar.css";
import {
  MdManageAccounts,
  MdSupportAgent,
  MdOutlineLogout,
} from "react-icons/md";

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData)

  const handleLogout = () => {
    dispatch(inactive({userId: userData.userId})).then((res)=> {
      console.log(res.payload);
      if(res.payload.message == "User is inactive"){
        dispatch(userLogout())
        navigate("/login")
      }
    })
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="backdrop" onClick={onClose}></div>
          <div className="sidebar">
            <div className="sidebar-profile-div">
              <img
                className="sidebar-profile"
                src="/profile-icon.jpg"
                alt="profile"
              />
              <h3>{userData.name}</h3>
            </div>
            <div className="sidebar-list" onClick={() => navigate("/profile")}>
              <p>
                <MdManageAccounts />
                <span>Account</span>
              </p>
            </div>
            <div className="sidebar-list" onClick={() => navigate("/user-chat")}>
              <p>
                <LuSendHorizonal />
                <span>Message</span>
              </p>
            </div>
            <div className="sidebar-list">
              <p>
                <IoIosNotifications />
                <span>Notification</span>
              </p>
            </div>
            <div className="sidebar-list" onClick={()=>navigate("/history")}>
              <p>
                <FaCircleDollarToSlot />
                <span>Subscription History</span>
              </p>
            </div>
            <div className="sidebar-list">
              <p>
                <MdSupportAgent />
                <span>Support</span>
              </p>
            </div>
            <div className="sidebar-list">
              <p>
                <IoMdSettings />
                <span>Settings</span>
              </p>
            </div>
            <div className="sidebar-list" onClick={handleLogout}>
              <p>
                <MdOutlineLogout />
                <span>Logout</span>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Sidebar;

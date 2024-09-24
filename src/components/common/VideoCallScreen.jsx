import React, { useRef, useState, useEffect } from "react";
import { MdOutlineVideocamOff, MdCallEnd } from "react-icons/md";
import { io } from "socket.io-client";
import { localhostURL } from "../../utils/url";

const socket = io(localhostURL);

const VideoCallScreen = ({ onClose, receiverId, senderId }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerConnection = useRef(null);
  const roomId = [senderId, receiverId].sort().join("_");

  const servers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }], 
  };

  useEffect(() => {
    socket.emit("joinVideoRoom", { senderId: senderId, receiverId: receiverId });

    socket.on("offer", async (offer) => {
      console.log("Received offer", offer);
      await handleOffer(offer); 
    });

    socket.on("answer", async (answer) => {
      console.log("Received answer", answer);
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    });

    socket.on("ice-candidate", (candidate) => {
      console.log("Received ICE candidate", candidate);
      if (candidate) {
        peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [senderId, receiverId]);

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;

      peerConnection.current = new RTCPeerConnection(servers);

      stream.getTracks().forEach((track) =>
        peerConnection.current.addTrack(track, stream)
      );

      peerConnection.current.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", { candidate: event.candidate, roomId });
        }
      };

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      console.log("Offer created:", offer);
      socket.emit("offer", { offer, roomId });
    } catch (error) {
      console.error("Error starting video call:", error);
    }
  };

  const handleOffer = async (offer) => {

    peerConnection.current = new RTCPeerConnection(servers);

    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(offer)
    );

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);
    localVideoRef.current.srcObject = stream;

    stream.getTracks().forEach((track) =>
      peerConnection.current.addTrack(track, stream)
    );

    peerConnection.current.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);

    socket.emit("answer", { answer, roomId });
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    setLocalStream(null);
    setRemoteStream(null);
    onClose();
  };

  return (
    <div className="video-call-modal">
      <div className="video-call-content">
        <div className="video-wrapper">
          <video
            className="remote-video"
            ref={remoteVideoRef}
            autoPlay
            playsInline
          />
          <video
            className="local-video"
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
          />
        </div>

        <div className="call-controls mt-3">
          <button className="btn btn-danger me-2" onClick={endCall}>
            <MdCallEnd /> End Call
          </button>
          <button className="btn btn-success" onClick={startCall}>
            <MdOutlineVideocamOff /> Start Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallScreen;

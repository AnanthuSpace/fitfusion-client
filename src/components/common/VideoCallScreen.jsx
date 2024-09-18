import React, { useRef, useState, useEffect } from "react";
import { MdOutlineVideocamOff, MdCallEnd } from "react-icons/md";
import { io } from "socket.io-client";
import { localhostURL } from "../../utils/url";
const socket = io(localhostURL);

const VideoCallScreen = ({ onClose }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerConnection = useRef(null);

  // ICE Servers (STUN)
  const servers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" }, // Public STUN server
    ],
  };

  useEffect(() => {
    // Listen for WebRTC offer from remote peer
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

    // Listen for ICE candidates from the remote peer
    socket.on("ice-candidate", (candidate) => {
      console.log("Received ICE candidate", candidate);
      if (candidate) {
        peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    return () => {
      // Clean up socket listeners when the component unmounts
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, []);

  const startCall = async () => {
    try {
      // Get local video/audio stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;

      // Create a new peer connection
      peerConnection.current = new RTCPeerConnection(servers);

      // Add local stream to the connection
      stream
        .getTracks()
        .forEach((track) => peerConnection.current.addTrack(track, stream));

      // When a remote track is received, set it to remote video
      peerConnection.current.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      // Handle ICE candidates
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", { candidate: event.candidate, roomId });
        }
      };

      // Create an offer and set it as the local description
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      console.log("Offer created:", offer);
      // Send the offer to the backend via socket.io
      socket.emit("offer", { offer, roomId });
    } catch (error) {
      console.error("Error starting video call:", error);
    }
  };


  const handleOffer = async (offer) => {
    peerConnection.current = new RTCPeerConnection(servers);

    // Set the remote description with the offer
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));

    // Get local video/audio stream
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);
    localVideoRef.current.srcObject = stream;

    // Add local stream to peer connection
    stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));

    // Handle remote stream
    peerConnection.current.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    // Create an answer and set it as the local description
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);

    // Send the answer to the remote peer via the backend
    socket.emit("answer", { answer, roomId });
  };

  const endCall = () => {
    // Stop local video stream
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    setLocalStream(null);
    setRemoteStream(null);
    onClose(); // Close the modal when the call ends
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

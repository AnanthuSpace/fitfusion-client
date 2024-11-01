import React, { useRef, useState, useEffect } from "react";
import { MdOutlineVideocamOff, MdCallEnd } from "react-icons/md";
import { useSocket } from "../../context/SocketContext";
import { useSelector } from "react-redux";

const TrainerVideoScreen = ({ onClose, receiverId, currentCustomerId }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const remoteStream = useRef(new MediaStream());
  const localStream = useRef(null);
  const socket = useSocket();
  const peerConnection = useRef(null);
  const roomId = [currentCustomerId, receiverId].sort().join("-");
  const trainerName = useSelector((state) => state.trainer.trainerData.name);

  const servers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

   useEffect(() => {
    socket.on("offer", async (offer) => {
      console.log("Received offer", offer);
      await handleOffer(offer);
    });

    socket.on("answer", async (answer) => {
      console.log("Received answer", answer);
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
      displayRemoteVideo();
    });

    socket.on("ice-candidate", (candidate) => {
      console.log("Received ICE candidate", candidate);
      if (peerConnection.current && candidate) {
        peerConnection.current
          .addIceCandidate(new RTCIceCandidate(candidate))
          .catch((e) =>
            console.error("Error adding received ICE candidate", e)
          );
      }
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
    };
  }, [currentCustomerId, receiverId, roomId]);

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    async function setupStreamAndConnection() {
      try {
        localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = localStream.current;

        peerConnection.current = new RTCPeerConnection(servers);

        localStream.current.getTracks().forEach(track => peerConnection.current.addTrack(track, localStream.current));

        peerConnection.current.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => remoteStream.current.addTrack(track));
          remoteVideoRef.current.srcObject = remoteStream.current;
        };

        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", { candidate: event.candidate, roomId });
          }
        };

        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.emit("offer", { offer, roomId });
      } catch (error) {
        console.error("Error setting up video call:", error);
      }
    }

    setupStreamAndConnection();

    socket.on("answer", async (answer) => {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("ice-candidate", async (candidate) => {
      try {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error("Error adding received ice candidate:", error);
      }
    });

    return () => {
      endCall();
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [currentCustomerId, receiverId, socket, roomId]);

  const startCall = async () => {
    try {
      socket.emit("startCall", { receivedId: currentCustomerId, receiverName: trainerName });
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStream.current = stream;
      localVideoRef.current.srcObject = stream;

      peerConnection.current = new RTCPeerConnection(servers);
      stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));

      peerConnection.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", { candidate: event.candidate, roomId });
        }
      };

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.emit("offer", { offer, roomId });
    } catch (error) {
      console.error("Error starting video call:", error);
    }
  };

  const handleOffer = async (offer) => {
    try {
      peerConnection.current = new RTCPeerConnection(servers);
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStream.current = stream;
      localVideoRef.current.srcObject = stream;

      stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));

      peerConnection.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.emit("answer", { answer, roomId });
    } catch (error) {
      console.error("Error handling offer:", error);
    }
  };

  const endCall = () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
    }
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
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

export default TrainerVideoScreen;

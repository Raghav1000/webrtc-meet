import { BsFillMicFill } from "react-icons/bs";
import { BsFillMicMuteFill } from "react-icons/bs";
import { BsFillCameraVideoOffFill } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { GrNext } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
import Room from "../room/Room";
import "./JoinScreen.css";

export const JoinScreen = () => {
  const [localAudioTrack, setLocalAudioTrack] =
    useState<MediaStreamTrack | null>(null);
  const [localVideoTrack, setLocalVideoTrack] =
    useState<MediaStreamTrack | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [joined, setJoined] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);

  const getCam = async () => {
    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const audioTrack = stream.getAudioTracks()[0];
    const videoTrack = stream.getVideoTracks()[0];
    setLocalAudioTrack(audioTrack);
    setLocalVideoTrack(videoTrack);
    if (!videoRef.current) {
      return;
    }
    videoRef.current.srcObject = new MediaStream([videoTrack, audioTrack]);
    videoRef.current.play();
  };

  useEffect(() => {
    if (videoRef && videoRef.current) {
      getCam();
    }
  }, [videoRef]);

  const toggleMic = async () => {
    if (localAudioTrack) {
      if (isMicOn) {
        localAudioTrack.stop();
        setIsMicOn(false);
      } else {
        const stream = await window.navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const newAudioTrack = stream.getAudioTracks()[0];
        setLocalAudioTrack(newAudioTrack);
        if (videoRef.current) {
          const videoTrack = localVideoTrack ? [localVideoTrack] : [];
          videoRef.current.srcObject = new MediaStream([
            newAudioTrack,
            ...videoTrack,
          ]);
          videoRef.current.play();
        }
        setIsMicOn(true);
      }
    }
  };

  const toggleCam = async () => {
    if (localVideoTrack) {
      if (isCamOn) {
        localVideoTrack.stop();
        setIsCamOn(false);
      } else {
        const stream = await window.navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const newVideoTrack = stream.getVideoTracks()[0];
        setLocalVideoTrack(newVideoTrack);
        if (videoRef.current) {
          const audioTrack = localAudioTrack ? [localAudioTrack] : [];
          videoRef.current.srcObject = new MediaStream([
            newVideoTrack,
            ...audioTrack,
          ]);
          videoRef.current.play();
        }
        setIsCamOn(true);
      }
    }
  };

  if (!joined) {
    return (
      <div className="join-screen-container">
        <h3 className="heading">
          Press Join to enter a room and Start interacting.
        </h3>
        <video className="video" autoPlay ref={videoRef}></video>
        <div className="controls">
          <button onClick={toggleMic} className="control">
            {isMicOn ? (
              <BsFillMicMuteFill size={18} color="red" />
            ) : (
              <BsFillMicFill size={18} color="green" />
            )}
          </button>
          <button onClick={toggleCam} className="control">
            {isCamOn ? (
              <BsFillCameraVideoOffFill size={18} color="red" />
            ) : (
              <BsFillCameraVideoFill size={18} color="green" />
            )}
          </button>
        <button
          className="join"
          onClick={() => {
            setJoined(true);
          }}
        >
          Join
          <GrNext />
        </button>
        </div>
      </div>
    );
  }

  return (
    <Room localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
  );
};

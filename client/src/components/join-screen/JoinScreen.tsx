import { GrNext } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
import Room from "../room/Room";
import "./JoinScreen.css";

export const JoinScreen = () => {
  const [localAudioTrack, setLocalAudioTrack] =
    useState<MediaStreamTrack | null>(null);
  const [localVidioTrack, setLocalVideoTrack] =
    useState<MediaStreamTrack | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [joined, setJoined] = useState(false);

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

  if (!joined) {
    return (
      <div className="join-screen-container">
        <h3 className="heading">Press Join to enter a room and Start interacting.</h3>
        <video className="video" autoPlay ref={videoRef}></video>
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
    );
  }

  return (
    <Room localAudioTrack={localAudioTrack} localVideoTrack={localVidioTrack} />
  );
};

import { BsFillChatLeftFill } from "react-icons/bs";
import { IoChevronForward } from "react-icons/io5";
import "./App.css";
import Input from "./components/input/input";
import { useNavigate } from "react-router-dom";
import { HiVideoCamera } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { AtomUserName } from "./store/store";

const App = () => {
  const [name, setName] = useRecoilState(AtomUserName);
  const navigate = useNavigate();

  const enterJoinPage = () => {
    if (!name) return;
    else navigate("room");
  };

  return (
    <div className="app-container">
      <div className="left-container">
        <div className="heading-container">
          <h2>WebRTC one-one Meet</h2>
          <span className="sub-heading">
            Supporting peer to peer video calls and chats.
          </span>
        </div>
        <div className="input-container">
          <Input
            type="text"
            placeholder="Enter your name to start"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <IoChevronForward onClick={enterJoinPage} />
        </div>
      </div>
      <div className="right-container">
        <img
          src="https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-66609.jpg"
          alt="person-1"
          className="img-1"
        />
        <img
          src="https://media.istockphoto.com/id/1190928923/video/overjoyed-woman-make-videocall-chatting-with-relatives-feels-happy.jpg?s=640x640&k=20&c=1D9mhMjDEYCzvMzxAl17W0C8NoFJonrBObxL_wv5OII="
          alt="person-2"
          className="img-2"
        />
        <HiVideoCamera className="camera" size={20} />
        <BsFillChatLeftFill className="chat" size={18} />
      </div>
    </div>
  );
};

export default App;

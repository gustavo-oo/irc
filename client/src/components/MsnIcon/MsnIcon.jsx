import "./MsnIcon.css";
import msnAvatar from "../../msn_avatar.png";
export default function MsnIcon() {
  return (
    <div className="border">
      <img src={msnAvatar} className="img" alt=""></img>
    </div>
  );
}

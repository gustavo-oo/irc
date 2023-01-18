import MsnIcon from "../../components/MsnIcon/MsnIcon";
import "./HomePage.css";
import { useState } from "react";
export default function HomePage() {
  const [nick, setNick] = useState("");
  const [username, setUserName] = useState("");
  const [fullname, setFullName] = useState("");

  function onSubmit() {
    return;
  }
  return (
    <div className="wholePage">
      <div className="header">
        <div className="firstLine">Entrar no</div>
        <div className="secondLine">Internet Relay Chat</div>
      </div>
      <div className="contentConteiner">
        <div className="iconConteiner">
          <MsnIcon />
        </div>
        <div className="inputConteiner">
          <label for="fname">Apelido:</label>
          <input
            placeholder="Nick"
            value={nick}
            onChange={(event) => setNick(event.target.value)}
          ></input>
          <label for="fname">Nome do Usuário:</label>
          <input
            placeholder="Username"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
          ></input>
          <label for="fname">Nome Completo:</label>
          <input
            placeholder="Full Name"
            value={fullname}
            onChange={(event) => setFullName(event.target.value)}
          ></input>
          <button className="enterButton" onClick={onSubmit}>
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

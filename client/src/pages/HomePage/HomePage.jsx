import MsnIcon from "../../Components/MsnIcon/MsnIcon";
import "./HomePage.css";
import { useState } from "react";
export default function HomePage({ onSubmit, isLoading, setIsLoading, nick, setNick }) {
  const [username, setUserName] = useState("");
  const [fullname, setFullName] = useState("");

  function handleSubmit() {
    const nickCommand = `NICK ${nick}`;
    const userCommand = `USER ${username} foo foo :${fullname}`;
    onSubmit(nickCommand);
    onSubmit(userCommand);
    setIsLoading(true);
  }

  return (
    <div className="wholePage">
      <div className="headerhome">
        <div className="firstLine">Entrar no</div>
        <div className="secondLine">Internet Relay Chat</div>
      </div>
      <div className="contentConteiner">
        <div className="iconConteiner">
          <MsnIcon />
        </div>
        <div className="inputConteiner">
          <label htmlFor="fname">Apelido:</label>
          <input
            placeholder="Nick"
            value={nick}
            onChange={(event) => setNick(event.target.value)}
          ></input>
          <label htmlFor="fname">Nome do Usuário:</label>
          <input
            placeholder="Username"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
          ></input>
          <label htmlFor="fname">Nome Completo:</label>
          <input
            placeholder="Full Name"
            value={fullname}
            onChange={(event) => setFullName(event.target.value)}
          ></input>
          <button disabled={isLoading} className="enterButton" onClick={handleSubmit}>
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

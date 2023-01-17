import MsnIcon from "../../components/MsnIcon/MsnIcon";
import "./HomePage.css";
export default function HomePage() {
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
          <input placeholder="Nick"></input>
          <label for="fname">Nome do Usuário:</label>
          <input placeholder="Username"></input>
          <label for="fname">Nome Completo:</label>
          <input placeholder="Full Name"></input>
          <button className="enterButton">Entrar</button>
        </div>
      </div>
    </div>
  );
}

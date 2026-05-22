import "./Header.css"

export default function Header() {
  return (
    <header className="header">

      <div className="logo-area">
        <img
          src="/logo1.png"
          alt="Logo"
          className="logo"
        />
      </div>

      <nav className="menu">
        <a href="#">Início</a>
        <a href="#">Quadras</a>
        <a href="#">Como Funciona</a>
      </nav>

      <div className="buttons">
        <button className="btn-login">
          Entrar
        </button>

        <button className="btn-cadastro">
          Cadastrar
        </button>
      </div>

    </header>
  )
}
import "./Header.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Login from "../Login/Login"
import Cadastro from "../Cadastro/Cadastro"

export default function Header() {
  const [mostrarLogin, setMostrarLogin] = useState(false)
  const [mostrarCadastro, setMostrarCadastro] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)
  const [usuarioLogado, setUsuarioLogado] = useState(null)

  useEffect(() => {
    const salvo = localStorage.getItem("usuarioLogado")
    if (salvo) setUsuarioLogado(JSON.parse(salvo))
  }, [])

  function handleLogin(usuario) {
    if (!usuario) return
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario))
    setUsuarioLogado(usuario)
    setMostrarLogin(false)
  }

  function handleLogout() {
    localStorage.removeItem("usuarioLogado")
    setUsuarioLogado(null)
  }

  return (
    <>
      <header className="header">

        <div className="logo-area">
          <Link to="/">
            <img src="/logo1.png" alt="Logo" className="logo" />
          </Link>
        </div>

        <nav className={`menu ${menuAberto ? "aberto" : ""}`}>
          <Link to="/" onClick={() => setMenuAberto(false)}>Início</Link>
          <Link to="/quadras" onClick={() => setMenuAberto(false)}>Quadras</Link>
          <Link to="/sobre" onClick={() => setMenuAberto(false)}>Sobre</Link>
        </nav>

        <div className="buttons">
          {usuarioLogado ? (
            <>
              <span className="usuario-nome">Olá, {usuarioLogado.nome}!</span>
              <button className="btn-login" onClick={handleLogout}>Sair</button>
            </>
          ) : (
            <>
              <button className="btn-login" onClick={() => setMostrarLogin(true)}>Entrar</button>
              <button className="btn-cadastro" onClick={() => setMostrarCadastro(true)}>Cadastrar</button>
            </>
          )}
        </div>

        <button className="menu-toggle" onClick={() => setMenuAberto(!menuAberto)}>
          {menuAberto ? "✕" : "☰"}
        </button>

      </header>

      {mostrarLogin && <Login onFechar={handleLogin} />}
      {mostrarCadastro && <Cadastro onFechar={() => setMostrarCadastro(false)} />}
    </>
  )
}
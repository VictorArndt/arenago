import { useState } from "react"
import "./Login.css"

export default function Login({ onFechar }) {

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    if (!email || !senha) {
      setErro("Por favor, preencha todos os campos.")
      return
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    const resposta = await fetch(`http://localhost:3000/usuarios?email=${email}`)
    const usuarios = await resposta.json()

    if (usuarios.length === 0) {
      setErro("E-mail ou senha incorretos.")
      return
    }

    const usuario = usuarios[0]

    if (usuario.senha !== senha) {
      setErro("E-mail ou senha incorretos.")
      return
    }

    setErro("")
    onFechar(usuario)
  }

  return (
    <div className="login-fundo">
      <div className="login-box">

        <button className="login-fechar" onClick={() => onFechar(null)}>✕</button>

        <h2 className="login-titulo">Entrar</h2>
        <p className="login-subtitulo">Acesse sua conta para fazer reservas</p>

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="login-campo">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-campo">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {erro && <p className="login-erro">⚠️ {erro}</p>}

          <button className="login-btn" type="submit">
            Entrar
          </button>

        </form>

      </div>
    </div>
  )
}
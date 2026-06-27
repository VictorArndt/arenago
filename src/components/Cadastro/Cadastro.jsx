import { useState } from "react"
import "./Cadastro.css"

export default function Cadastro({ onFechar }) {

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (!nome || !email || !senha || !confirmarSenha) {
      setErro("Por favor, preencha todos os campos.")
      return
    }

    if (nome.trim().length < 3) {
      setErro("O nome deve ter pelo menos 3 caracteres.")
      return
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.")
      return
    }

    // Verifica se o e-mail já existe
    const verificacao = await fetch(`http://localhost:3000/usuarios?email=${email}`)
    const jaExiste = await verificacao.json()

    if (jaExiste.length > 0) {
      setErro("E-mail já cadastrado.")
      return
    }

    // Cadastra o novo usuário
    await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha })
    })

    setErro("")
    setSucesso(true)
  }

  return (
    <div className="cadastro-fundo">
      <div className="cadastro-box">

        <button className="cadastro-fechar" onClick={onFechar}>✕</button>

        <h2 className="cadastro-titulo">Criar conta</h2>
        <p className="cadastro-subtitulo">Cadastre-se para fazer suas reservas</p>

        {sucesso ? (
          <div className="cadastro-sucesso">
            <p>✅ Cadastro realizado com sucesso!</p>
            <button className="cadastro-btn" onClick={onFechar}>Fechar</button>
          </div>
        ) : (
          <form className="cadastro-form" onSubmit={handleSubmit}>

            <div className="cadastro-campo">
              <label>Nome completo</label>
              <input
                type="text"
                placeholder="Digite seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="cadastro-campo">
              <label>E-mail</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="cadastro-campo">
              <label>Senha</label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div className="cadastro-campo">
              <label>Confirmar senha</label>
              <input
                type="password"
                placeholder="Repita sua senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>

            {erro && <p className="cadastro-erro">⚠️ {erro}</p>}

            <button className="cadastro-btn" type="submit">
              Cadastrar
            </button>

          </form>
        )}

      </div>
    </div>
  )
}

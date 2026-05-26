import "./Reserva.css"
import { useState } from "react"
import { quadras } from "../../data/quadras"

export default function Reserva() {

  const [quadra, setQuadra] = useState("")
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [data, setData] = useState("")
  const [horario, setHorario] = useState("18:00")
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState(false)

  function formatarData(data) {
    const [ano, mes, dia] = data.split("-")
    return `${dia}/${mes}/${ano}`
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!nome || !email || !data || !quadra) {
      setErro("Por favor, preencha todos os campos.")
      return
    }

    if (nome.trim().length < 3) {
      setErro("O nome deve ter pelo menos 3 caracteres.")
      return
    }

    const hoje = new Date().toISOString().split("T")[0]
    if (data < hoje) {
      setErro("A data não pode ser no passado.")
      return
    }

    // Salva a reserva no json-server
    await fetch("http://localhost:3001/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, quadra, data, horario })
    })

    setErro("")
    setSucesso(true)
  }

  return (
    <section className="reserva-container">
      <div className="reserva-box">

        <h2> Dados da Reserva</h2>

        {sucesso && (
          <div className="popup-fundo">
            <div className="popup-box">
              <p>✅ Reserva confirmada para {formatarData(data)} às {horario}!</p>
              <button className="btn-fechar" onClick={() => setSucesso(false)}>Fechar</button>
            </div>
          </div>
        )}

        <form className="form-reserva" onSubmit={handleSubmit}>

          <div className="campo">
            <label>Nome completo</label>
            <input
              type="text"
              placeholder="Digite seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="campo">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="campo">
            <label>Quadra</label>
            <select value={quadra} onChange={(e) => setQuadra(e.target.value)}>
              <option value="">Selecione uma quadra</option>
              {quadras.map((q) => (
                <option key={q.id} value={q.nome}>{q.nome}</option>
              ))}
            </select>
          </div>

          <div className="linha">
            <div className="campo">
              <label>Data</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>

            <div className="campo">
              <label>Horário</label>
              <select value={horario} onChange={(e) => setHorario(e.target.value)}>
                <option>18:00</option>
                <option>19:00</option>
                <option>20:00</option>
                <option>21:00</option>
                <option>22:00</option>
                <option>23:00</option>
              </select>
            </div>
          </div>

          {erro && <p className="mensagem-erro">⚠️ {erro}</p>}

          <button className="btn-confirmar" type="submit">
            Confirmar Reserva
          </button>

          <p className="seguro">
            🔒 Ambiente 100% seguro e criptografado
          </p>

        </form>
      </div>
    </section>
  )
}

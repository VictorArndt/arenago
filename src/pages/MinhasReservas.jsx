import "./MinhasReservas.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function MinhasReservas() {
  const navigate = useNavigate()
  const [reservas, setReservas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [confirmandoCancelamento, setConfirmandoCancelamento] = useState(null)
  const [mensagem, setMensagem] = useState("")

  useEffect(() => {
    const salvo = localStorage.getItem("usuarioLogado")
    if (!salvo) {
      navigate("/")
      return
    }
    const usuario = JSON.parse(salvo)
    setUsuarioLogado(usuario)
    buscarReservas(usuario.email)
  }, [])

  async function buscarReservas(email) {
    setCarregando(true)
    try {
      const res = await fetch(`http://localhost:3000/reservas?email=${email}`)
      const dados = await res.json()
      // Ordena: futuras primeiro, passadas depois
      const hoje = new Date().toISOString().split("T")[0]
      const futuras = dados.filter(r => r.data >= hoje).sort((a, b) => a.data.localeCompare(b.data))
      const passadas = dados.filter(r => r.data < hoje).sort((a, b) => b.data.localeCompare(a.data))
      setReservas([...futuras, ...passadas])
    } catch {
      setMensagem("Erro ao carregar reservas. Verifique se o servidor está rodando.")
    }
    setCarregando(false)
  }

  async function cancelarReserva(id) {
    try {
      await fetch(`http://localhost:3000/reservas/${id}`, { method: "DELETE" })
      setReservas(prev => prev.filter(r => r.id !== id))
      setMensagem("✅ Reserva cancelada com sucesso.")
      setTimeout(() => setMensagem(""), 4000)
    } catch {
      setMensagem("❌ Erro ao cancelar reserva.")
    }
    setConfirmandoCancelamento(null)
  }

  function formatarData(data) {
    const [ano, mes, dia] = data.split("-")
    return `${dia}/${mes}/${ano}`
  }

  function isPast(data) {
    const hoje = new Date().toISOString().split("T")[0]
    return data < hoje
  }

  if (carregando) {
    return (
      <div className="mr-container">
        <div className="mr-loading">
          <div className="mr-spinner"></div>
          <p>Carregando suas reservas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mr-container">
      <div className="mr-inner">

        <div className="mr-topo">
          <div>
            <h1 className="mr-titulo">Minhas Reservas</h1>
            <p className="mr-subtitulo">Olá, <strong>{usuarioLogado?.nome}</strong>! Aqui estão suas reservas.</p>
          </div>
          <button className="mr-btn-nova" onClick={() => navigate("/reserva")}>
            + Nova Reserva
          </button>
        </div>

        {mensagem && (
          <div className="mr-mensagem">{mensagem}</div>
        )}

        {reservas.length === 0 ? (
          <div className="mr-vazio">
            <span className="mr-vazio-icone">📋</span>
            <p>Você ainda não tem reservas.</p>
            <button className="mr-btn-nova" onClick={() => navigate("/reserva")}>
              Fazer primeira reserva
            </button>
          </div>
        ) : (
          <div className="mr-lista">
            {reservas.map((reserva) => {
              const passada = isPast(reserva.data)
              return (
                <div key={reserva.id} className={`mr-card ${passada ? "mr-card-passada" : ""}`}>

                  <div className="mr-card-esquerda">
                    <span className={`mr-status ${passada ? "mr-status-passada" : "mr-status-ativa"}`}>
                      {passada ? "Concluída" : "Confirmada"}
                    </span>
                    <h3 className="mr-quadra">{reserva.quadra}</h3>
                    <div className="mr-detalhes">
                      <span>📅 {formatarData(reserva.data)}</span>
                      <span>🕐 {reserva.horario}</span>
                    </div>
                  </div>

                  <div className="mr-card-direita">
                    {!passada && (
                      <button
                        className="mr-btn-cancelar"
                        onClick={() => setConfirmandoCancelamento(reserva.id)}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>

                </div>
              )
            })}
          </div>
        )}

      </div>

      {/* Modal de confirmação de cancelamento */}
      {confirmandoCancelamento && (
        <div className="mr-modal-fundo" onClick={() => setConfirmandoCancelamento(null)}>
          <div className="mr-modal" onClick={e => e.stopPropagation()}>
            <h3>Cancelar reserva?</h3>
            <p>Tem certeza que deseja cancelar esta reserva?</p>
            <div className="mr-modal-acoes">
              <button className="mr-btn-voltar" onClick={() => setConfirmandoCancelamento(null)}>
                Voltar
              </button>
              <button className="mr-btn-confirmar-cancel" onClick={() => cancelarReserva(confirmandoCancelamento)}>
                Sim, cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

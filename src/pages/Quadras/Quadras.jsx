import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Quadras.css"
import { quadras } from "../../data/quadras"

function Estrelas({ valor, onChange }) {
  const [hover, setHover] = useState(0)

  return (
    <div className="estrelas">
      {[1, 2, 3, 4, 5].map((e) => (
        <span
          key={e}
          className={`estrela ${e <= (hover || valor) ? "ativa" : ""}`}
          onClick={() => onChange && onChange(e)}
          onMouseEnter={() => onChange && setHover(e)}
          onMouseLeave={() => onChange && setHover(0)}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function mediaAvaliacoes(avaliacoes) {
  if (!avaliacoes.length) return 0
  return avaliacoes.reduce((acc, a) => acc + a.nota, 0) / avaliacoes.length
}

export default function Quadras() {
  const navigate = useNavigate()
  const [listaQuadras, setListaQuadras] = useState(quadras)
  const [filtro, setFiltro] = useState("Todas")
  const [modalAberto, setModalAberto] = useState(null)
  const [notaSelecionada, setNotaSelecionada] = useState(0)
  const [comentario, setComentario] = useState("")
  const [erroAvaliacao, setErroAvaliacao] = useState("")

  function handleReservar() {
    const logado = localStorage.getItem("usuarioLogado")
    if (logado) {
      navigate("/reserva")
    } else {
      window.dispatchEvent(new CustomEvent("abrirLogin", { detail: { redirecionarPara: "/reserva" } }))
    }
  }
  const filtradas = filtro === "Todas"
    ? listaQuadras
    : listaQuadras.filter((q) => q.modalidade === filtro)

  function abrirModal(id) {
    setModalAberto(id)
    setNotaSelecionada(0)
    setComentario("")
    setErroAvaliacao("")
  }

  function fecharModal() {
    setModalAberto(null)
  }

  function enviarAvaliacao(quadraId) {
    if (!notaSelecionada) {
      setErroAvaliacao("Selecione uma nota antes de enviar.")
      return
    }

    setListaQuadras((prev) =>
      prev.map((q) =>
        q.id === quadraId
          ? { ...q, avaliacoes: [...q.avaliacoes, { nota: notaSelecionada, comentario }] }
          : q
      )
    )
    setModalAberto(null)
  }

  const quadraModal = listaQuadras.find((q) => q.id === modalAberto)

  return (
    <div className="quadras-container">

      <div className="quadras-topo">
        <h1 className="quadras-titulo">Nossas Quadras</h1>
        <p className="quadras-subtitulo">Escolha a quadra ideal para o seu jogo</p>

        <div className="quadras-filtros">
          {["Todas", "Futebol Society", "Futsal"].map((f) => (
            <button
              key={f}
              className={`btn-filtro ${filtro === f ? "ativo" : ""}`}
              onClick={() => setFiltro(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="quadras-grid">
        {filtradas.map((quadra) => {
          const media = mediaAvaliacoes(quadra.avaliacoes)

          return (
            <div className="quadra-card" key={quadra.id}>

              <div className="quadra-foto">
                {quadra.foto
                  ? <img src={quadra.foto} alt={quadra.nome} />
                  : <span className="quadra-foto-placeholder">⚽</span>
                }
              </div>

              <div className="quadra-info">
                <span className="quadra-modalidade">{quadra.modalidade}</span>
                <h2 className="quadra-nome">{quadra.nome}</h2>
                <p className="quadra-descricao">{quadra.descricao}</p>

                <div className="quadra-rodape">
                  <span className="quadra-preco">{quadra.preco}</span>

                  <div className="quadra-avaliacao-resumo">
                    <Estrelas valor={Math.round(media)} />
                    <span className="quadra-num-avaliacoes">
                      {quadra.avaliacoes.length > 0
                        ? `${media.toFixed(1)} (${quadra.avaliacoes.length})`
                        : "Sem avaliações"}
                    </span>
                  </div>
                </div>

                <div className="quadra-acoes">
                  <button className="btn-reservar-quadra" onClick={handleReservar}>
                    Reservar
                  </button>
                  <button className="btn-avaliar" onClick={() => abrirModal(quadra.id)}>
                    Avaliar
                  </button>
                </div>
              </div>

            </div>
          )
        })}
      </div>

      {modalAberto && quadraModal && (
        <div className="modal-fundo" onClick={fecharModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-fechar" onClick={fecharModal}>✕</button>
            <h3 className="modal-titulo">Avaliar {quadraModal.nome}</h3>
            <p className="modal-subtitulo">Selecione uma nota</p>

            <Estrelas valor={notaSelecionada} onChange={setNotaSelecionada} />

            <textarea
              className="modal-comentario"
              placeholder="Deixe um comentário (opcional)"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />

            {erroAvaliacao && <p className="modal-erro">⚠️ {erroAvaliacao}</p>}

            <button className="btn-enviar-avaliacao" onClick={() => enviarAvaliacao(quadraModal.id)}>
              Enviar avaliação
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

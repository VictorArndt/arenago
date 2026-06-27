import "./Pagamento.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Pagamento() {
  const [metodo, setMetodo] = useState("");

  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="pagamento-container">
        <h2>Nenhuma reserva encontrada.</h2>
      </div>
    );
  }

  async function confirmarPagamento() {
    try {
      await fetch("http://localhost:3000/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      alert("Pagamento realizado com sucesso! Reserva confirmada.");

      navigate("/");
    } catch (error) {
      alert("Erro ao confirmar pagamento.");
    }
  }

  return (
    <div className="pagamento-container">
      <h1>Pagamento da Reserva</h1>

      <div className="resumo">
        <h3>Resumo da Reserva</h3>

        <p>
          <strong>Nome:</strong> {state.nome}
        </p>

        <p>
          <strong>Email:</strong> {state.email}
        </p>

        <p>
          <strong>Quadra:</strong> {state.quadra}
        </p>

        <p>
          <strong>Data:</strong> {state.data}
        </p>

        <p>
          <strong>Horário:</strong> {state.horario}
        </p>

        <p className="valor">R$ 120,00</p>
      </div>

      <h3>Escolha a forma de pagamento</h3>

      <div className="metodos">
        <button onClick={() => setMetodo("pix")}>Pix</button>
        <button onClick={() => setMetodo("cartao")}>Cartão</button>
      </div>

      {metodo === "pix" && (
        <div className="pagamento-box">
          <h4>Pagamento via Pix</h4>
          <p>Chave Pix: arenago@pagamentos.com</p>

          <button onClick={confirmarPagamento}>
            Confirmar Pagamento
          </button>
        </div>
      )}

      {metodo === "cartao" && (
        <div className="pagamento-box">
          <input type="text" placeholder="Número do Cartão" />
          <input type="text" placeholder="Nome do Titular" />
          <input type="text" placeholder="Validade" />
          <input type="text" placeholder="CVV" />

          <button onClick={confirmarPagamento}>
            Pagar
          </button>
        </div>
      )}
    </div>
  );
}
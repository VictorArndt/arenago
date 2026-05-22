import "./Reserva.css"

export default function Reserva() {
  return (
    <section className="reserva-container">

      <div className="reserva-box">

        <h2>📅 Dados da Reserva</h2>

        <form className="form-reserva">

          <div className="campo">
            <label>Nome completo</label>
            <input
              type="text"
              placeholder="Digite seu nome completo"
            />
          </div>

          <div className="campo">
            <label>Modalidade</label>

            <select>
              <option>Futebol Society</option>
              <option>Futsal</option>
              <option>Futebol 7</option>
            </select>
          </div>

          <div className="linha">
            <div className="campo">
              <label>Data</label>
              <input type="date" />
            </div>

            <div className="campo">
              <label>Horário</label>

              <select>
                <option>18:00</option>
                <option>19:00</option>
                <option>20:00</option>
              </select>
            </div>
          </div>

          <div className="linha">
            <div className="campo">
              <label>Quantidade de jogadores</label>

              <input
                type="number"
                placeholder="Ex: 10"
              />
            </div>

            <div className="campo">
              <label>Observações</label>

              <textarea
                placeholder="Alguma observação adicional..."
              ></textarea>
            </div>
          </div>

          <button className="btn-confirmar">
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
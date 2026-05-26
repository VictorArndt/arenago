import "./Inicio.css"
import { useNavigate } from "react-router-dom"

export default function Inicio() {
  const navigate = useNavigate()

  return (
    <div className="inicio">
      <section className="hero">
        <div className="hero-conteudo">         
          <h1 className="hero-titulo">
            SUA PRÓXIMA<br />
            <span className="destaque">PARTIDA</span> COMEÇA<br />
            AQUI.
          </h1>

          <p className="hero-subtitulo">
            Agende quadras de forma rápida, prática e segura.<br />
            Mais tempo jogando, menos tempo organizando.
          </p>

          <div className="hero-botoes">
            <button className="btn-reservar" onClick={() => navigate("/reserva")}>
               Reservar agora
            </button>
            <button className="btn-ver-quadras" onClick={() => navigate("/quadras")}>
              Ver quadras disponíveis
            </button>
          </div>

          <div className="hero-selos">
            <div className="selo">🛡️ <span><strong>Seguro e confiável</strong><br />Seus dados protegidos</span></div>
            <div className="selo">⚡ <span><strong>Agendamento rápido</strong><br />Em poucos cliques</span></div>
            <div className="selo">📋 <span><strong>Cancelamento fácil</strong><br />Mais flexibilidade</span></div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <div className="feature-icone">🏟️</div>
          <div>
            <h3>Diversas quadras</h3>
            <p>Encontre a quadra ideal para o seu jogo.</p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-icone">📅</div>
          <div>
            <h3>Agendamento online</h3>
            <p>Escolha data, hora e faça sua reserva.</p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-icone">🔒</div>
          <div>
            <h3>Pagamento seguro</h3>
            <p>Transações 100% seguras e protegidas.</p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-icone">👥</div>
          <div>
            <h3>Para todos os esportes</h3>
            <p>Futebol, society, futsal e muito mais.</p>
          </div>
        </div>
      </section>

      <section className="como-funciona">
        <p className="como-label">COMO FUNCIONA</p>
        <h2 className="como-titulo">Agendar sua quadra é fácil</h2>
        <div className="como-linha"></div>
        <div className="como-passos">
          <div className="passo">
            <div className="passo-icone">🔍</div>
            <h4>1. Escolha a quadra</h4>
            <p>Encontre a quadra ideal para o seu esporte e localização.</p>
          </div>
          <div className="passo-seta">- - -</div>
          <div className="passo">
            <div className="passo-icone">📅</div>
            <h4>2. Selecione data e hora</h4>
            <p>Escolha o melhor dia e horário para o seu jogo.</p>
          </div>
          <div className="passo-seta">- - -</div>
          <div className="passo">
            <div className="passo-icone">💳</div>
            <h4>3. Faça o pagamento</h4>
            <p>Pagamento seguro e confirmação imediata da reserva.</p>
          </div>
          <div className="passo-seta">- - -</div>
          <div className="passo">
            <div className="passo-icone">⚽</div>
            <h4>4. É só jogar!</h4>
            <p>Prepare-se e bom jogo! Nos vemos na quadra.</p>
          </div>
        </div>
      </section>

    </div>
  )
}

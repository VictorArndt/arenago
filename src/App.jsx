import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import Inicio from "./pages/Inicio/Inicio"
import Reserva from "./pages/Reserva/Reserva"
import Sobre from "./pages/Sobre/Sobre"
import Quadras from "./pages/Quadras/Quadras"
import MinhasReservas from "./pages/MinhasReservas"
import Pagamento from "./pages/Pagamento/Pagamento"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/reserva" element={<Reserva />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/quadras" element={<Quadras />} />
        <Route path="/minhas-reservas" element={<MinhasReservas />} />
        <Route path="/pagamento" element={<Pagamento />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

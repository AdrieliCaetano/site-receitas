import {useState} from "react"
import Cupcake from "./assets/cupcake-inicio.jpg"
import * as Dialog from "@radix-ui/react-dialog"
import "./styles/main.css"
import AddReceitaModal from "./components/AddReceitaModal"

function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bg-[#fc939a] h-screen grid grid-cols-2 p-10 gap-10">
        <div className="flex flex-col text-start justify-center w-full h-full">
          <div className="flex flex-col h-[80%] justify-center px-10 text-white">
            <p className="text-6xl mb-4 font-bold font-serif">
              De tudo um pouco
            </p>
            <p className="text-6xl mb-8 font-bold font-serif">Receitas</p>
            <p className="text-xl">
              Em nosso site você encontra de tudo um pouco: doces, bebidas,
              tortas, pratos típicos... O que você quiser!
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img className="w-[70%] rounded-[30%]" src={Cupcake} alt="" />
        </div>
      </div>
      <div className="bg-yellow-100 h-screen flex flex-row gap-8 py-10">
        <div className="flex flex-col bg-red-500/20 w-[20%] p-3 items-center gap-10">
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className="bg-[#fc939a] py-4 w-3/4 uppercase font-bold hover:bg-[#ff767f] text-white">
              Adicionar Receita
            </Dialog.Trigger>

            <AddReceitaModal />

          </Dialog.Root>
          <p>Tipos de Refeição:</p>
        </div>
        <div className="grid grid-cols-3 bg-blue-500/20 w-[80%]">teste</div>
      </div>
    </>
  )
}

export default App

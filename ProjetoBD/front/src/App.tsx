import {useState} from "react"
import Cupcake from "./assets/cupcake-inicio.jpg"
import * as Dialog from "@radix-ui/react-dialog"
import "./styles/main.css"
import AddReceitaModal from "./components/AddReceitaModal"
import * as RadioGroup from "@radix-ui/react-radio-group"
import ReceitaCard from "./components/RaceitaCard"

function App() {
  const [open, setOpen] = useState(false)
  const [filtro, setFiltro] = useState("")

  console.log(filtro)
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
      <div className="bg-yellow-100 h-fit flex flex-row gap-8 p-8">
        <div className="flex flex-col w-[20%] items-center gap-3">
          <div className="flex flex-col w-full items-center gap-3">
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger className="bg-[#fc939a] py-4 w-full uppercase font-bold hover:bg-[#ff767f] text-white rounded-md">
                Adicionar Chef
              </Dialog.Trigger>

              <AddReceitaModal />
            </Dialog.Root>
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger className="bg-[#fc939a] py-4 w-full uppercase font-bold hover:bg-[#ff767f] text-white rounded-md">
                Adicionar Receita
              </Dialog.Trigger>

              <AddReceitaModal />
            </Dialog.Root>
          </div>
          <div className="bg-[#fc939a] w-full h-fit px-5 py-8 rounded-md text-white text-xl">
            <p className="font-bold mb-5 uppercase border-b-2 text-center">Tipos de Refeição</p>
            <div className="flex flex-col gap-3">
              <div>
                <input
                  type="radio"
                  name="tipo"
                  value="Todas"
                  onClick={() => setFiltro("Todas")}
                />{" "}
                Todas
              </div>
              <div>
                <input
                  type="radio"
                  name="tipo"
                  value="Almoço/Jantar"
                  onClick={() => setFiltro("Almoço/Jantar")}
                />{" "}
                Almoço/Jantar
              </div>
              <div>
                <input
                  type="radio"
                  name="tipo"
                  value="Bebidas"
                  onClick={() => setFiltro("Bebidas")}
                />{" "}
                Bebidas
              </div>
              <div>
                <input
                  type="radio"
                  name="tipo"
                  value="Café/Lanches"
                  onClick={() => setFiltro("Café/Lanches")}
                />{" "}
                Café/Lanches
              </div>
              <div>
                <input
                  type="radio"
                  name="tipo"
                  value="Sobremesas"
                  onClick={() => setFiltro("Sobremesas")}
                />{" "}
                Sobremesas
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 bg-[#fc939a] w-[80%] h-fit gap-10 p-10 rounded-md">
          <ReceitaCard />
          <ReceitaCard />
          <ReceitaCard />
          <ReceitaCard />
          <ReceitaCard />
          <ReceitaCard />
          <ReceitaCard />
          <ReceitaCard />
          <ReceitaCard />
          <ReceitaCard />
          <ReceitaCard />
          <ReceitaCard />
        </div>
      </div>
    </>
  )
}

export default App

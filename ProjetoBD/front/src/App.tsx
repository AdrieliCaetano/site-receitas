import {useState, Suspense, lazy, useEffect} from "react"
import Cupcake from "./assets/cupcake-inicio.jpg"
import * as Dialog from "@radix-ui/react-dialog"
import "./styles/main.css"
import ReceitaCard from "./components/RaceitaCard"
import AddUsuarioModal from "./components/AddUsuarioModal"
import AddCategoriaModal from "./components/AddCategoriaModal"
import axios from "axios"

const LazyAddReceitaModal = lazy(() => import("./components/AddReceitaModal"))

function App() {
  const [openCategoria, setOpenCategoria] = useState(false)
  const [openReceita, setOpenReceita] = useState(false)
  const [openUsuario, setOpenUsuario] = useState(false)
  const [categorias, setCategorias] = useState([])
  const [receitas, setReceitas] = useState([])
  const [filtro, setFiltro] = useState("")

  useEffect(() => {
    axios
      .get("http://localhost:5000/categorias")
      .then((response) => response.data)
      .then((data) => setCategorias(data))
  }, [])

  useEffect(() => {
    axios
      .get("http://localhost:5000/receitas")
      .then((response) => response.data)
      .then((data) => setReceitas(data))
  }, [])

  console.log(receitas)
  return (
    <>
      <div className="bg-[#fc939a] h-screen grid grid-cols-2 p-10 gap-10">
        <div className="flex flex-col text-start justify-center w-full h-full">
          <div className="flex flex-col h-[80%] justify-center px-10 text-white">
            <p className="text-7xl mb-4 font-bold font-serif border-b-[6px] border-white pb-3 w-fit">
              Chef na Web
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
            <Dialog.Root open={openCategoria} onOpenChange={setOpenCategoria}>
              <Dialog.Trigger className="bg-[#fc939a] py-4 w-full uppercase font-bold hover:bg-[#ff767f] text-white rounded-md">
                Adicionar Categoria
              </Dialog.Trigger>

              <AddCategoriaModal />
            </Dialog.Root>
            <Dialog.Root open={openUsuario} onOpenChange={setOpenUsuario}>
              <Dialog.Trigger className="bg-[#fc939a] py-4 w-full uppercase font-bold hover:bg-[#ff767f] text-white rounded-md">
                Adicionar Usuário
              </Dialog.Trigger>

              <AddUsuarioModal />
            </Dialog.Root>
            <Dialog.Root open={openReceita} onOpenChange={setOpenReceita}>
              <Dialog.Trigger className="bg-[#fc939a] py-4 w-full uppercase font-bold hover:bg-[#ff767f] text-white rounded-md">
                Adicionar Receita
              </Dialog.Trigger>

              {openReceita && (
                <Suspense>
                  <LazyAddReceitaModal categorias={categorias} />
                </Suspense>
              )}
            </Dialog.Root>
          </div>
          <div className="bg-[#fc939a] w-full h-fit px-5 py-8 rounded-md text-white text-xl">
            <p className="font-bold mb-5 uppercase border-b-2 text-center">
              Filtrar por categoria
            </p>
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
              {categorias.map((categoria) => {
                return (
                  <div key={categoria["nome_categoria"]}>
                    <input
                      type="radio"
                      name="tipo"
                      value={categoria["nome_categoria"]}
                      onClick={() => setFiltro(categoria["nome_categoria"])}
                    />{" "}
                    {categoria["nome_categoria"]}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 bg-[#fc939a] w-[80%] h-fit min-h-[380px] gap-10 p-10 rounded-md">
          {receitas.map((receita) => {
            return (
              <ReceitaCard
                key={receita["id"]}
                receita_id={receita["id"]}
                autor_id={receita["autor"]}
                categoria={receita["categoria"]}
                link_imagem={receita["link_imagem"]}
                modo_preparo={receita["modo_preparo"]}
                nome_receita={receita["nome_receita"]}
                porcoes={receita["porcoes"]}
                tempo_preparo={receita["tempo_preparo"]}
              />
            )
          })}
          {/* <ReceitaCard />
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
          <ReceitaCard /> */}
        </div>
      </div>
    </>
  )
}

export default App

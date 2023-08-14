import {Plus, Pencil, Trash} from "@phosphor-icons/react"
import * as Dialog from "@radix-ui/react-dialog"
import {useState, useEffect} from "react"
import AddIngrediente from "./AddIngrediente"
import axios from "axios"
import DeleteReceita from "./DeleteReceita"
import EditReceita from "./EditReceita"

interface ReceitaInfoProps {
  receita_id: number
  nome_receita: string
  tempo_preparo: number
  modo_preparo: string
  porcoes: number
  link_imagem: string
  categoria: string
  autor_id: number
}

function ReceitaInfo(props: ReceitaInfoProps) {
  const [openIngredientes, setOpenIngredientes] = useState(false)
  const [openEditar, setOpenEditar] = useState(false)
  const [openDeletar, setOpenDeletar] = useState(false)
  const [ingredientes, setIngredientes] = useState([])
  const [usuario, setUsuario] = useState()

  const formataModo = () => {
    const str = props.modo_preparo.split("\n")
    return str
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/receitas/${props.receita_id}/ingredientes`)
      .then((response) => response.data)
      .then((data) => setIngredientes(data))
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:5000/usuarios/${props.autor_id}`)
      .then((response) => response.data)
      .then((data) => setUsuario(data))
  }, [])

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 inset-0 fixed" />
        <Dialog.Content className="fixed bg-yellow-100 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[70rem] h-[40rem] shadow-lg shadow-black/25 overflow-auto">
          <Dialog.Title className="text-[#fc939a] uppercase font-bold text-center text-2xl font-serif p-2 border-[3px] border-[#fc939a] mb-10">
            Informações da Receita
          </Dialog.Title>
          <div className="grid grid-cols-2 gap-5 w-full h-[30rem]">
            <div className="flex flex-col gap-5 text-start text-[#fc939a] border-[3px] border-[#fc939a] p-3 relative mb-10">
              <p className="text-2xl uppercase font-bold text-center">
                {props.nome_receita}
              </p>
              <div>
                <p className="font-bold uppercase">Ingredientes</p>
                {ingredientes.map((ingrediente) => {
                  return (
                    <div
                      className="grid grid-cols-2 text-start"
                      key={ingrediente["ingrediente"]}
                    >
                      <p>{ingrediente["quantidade"]}</p>
                      <p>{ingrediente["ingrediente"]}</p>
                    </div>
                  )
                })}
              </div>
              <div>
                <p className="font-bold uppercase">Modo de Preparo</p>
                {formataModo().map((str) => {
                  return <p key={JSON.stringify(str)}>{str}</p>
                })}
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <img
                src={props.link_imagem}
                alt="Imagem"
                className="rounded-md w-full h-[340px]"
              />
              <div className="flex flex-col text-center text-xl font-bold text-[#fc939a]">
                <p>Rende {props.porcoes} porções</p>
                <p>Tempo de preparo: {props.tempo_preparo} minutos</p>
                <p className="text-base mt-5">
                  Autor: {usuario === undefined ? "" : usuario["nome"]}{" "}
                  {usuario === undefined ? "" : usuario["sobrenome"]}
                </p>
              </div>
            </div>
            <div className="absolute flex flex-col w-fit h-fit right-10 bottom-2 gap-2">
              <Dialog.Root
                open={openIngredientes}
                onOpenChange={setOpenIngredientes}
              >
                <Dialog.Trigger
                  title="Adicionar Ingrediente"
                  className="rounded-[50%] bg-[#fc939a] py-2 px-2 text-white hover:bg-[#ff7a83] font-bold text-xs shadow-sm shadow-black/25"
                >
                  <Plus size={17} weight="bold" />
                </Dialog.Trigger>
                <AddIngrediente receita_id={props.receita_id} />
              </Dialog.Root>

              <Dialog.Root open={openEditar} onOpenChange={setOpenEditar}>
                <Dialog.Trigger
                  title="Editar Receita"
                  className="rounded-[50%] bg-gray-500 py-2 px-2 text-white hover:bg-gray-700 font-bold text-xs shadow-sm shadow-black/25"
                >
                  <Pencil size={17} weight="bold" />
                </Dialog.Trigger>
                <EditReceita
                  nome_receita={props.nome_receita}
                  receita_id={props.receita_id}
                />
              </Dialog.Root>

              <Dialog.Root open={openDeletar} onOpenChange={setOpenDeletar}>
                <Dialog.Trigger
                  title="Excluir Receita"
                  className="rounded-[50%] bg-red-500 py-2 px-2 text-white hover:bg-red-700 font-bold text-xs shadow-sm shadow-black/25"
                >
                  <Trash size={17} weight="bold" />
                </Dialog.Trigger>
                <DeleteReceita
                  receita_id={props.receita_id}
                  nome_receita={props.nome_receita}
                />
              </Dialog.Root>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}

export default ReceitaInfo

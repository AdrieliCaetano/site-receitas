import {Plus, Pencil, Trash} from "@phosphor-icons/react"
import * as Dialog from "@radix-ui/react-dialog"
import {useState} from "react"

interface ReceitaInfoProps {
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

  console.log(props.modo_preparo)

  const formataModo = () => {
    const str = props.modo_preparo.split("\n")
    return str
  }

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 inset-0 fixed" />
        <Dialog.Content className="fixed bg-yellow-100 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[70rem] h-[40rem] shadow-lg shadow-black/25 overflow-auto">
          <Dialog.Title className="text-[#fc939a] uppercase font-bold text-center text-2xl font-serif p-2 border-[3px] border-[#fc939a] mb-10">
            Informações da Receita
          </Dialog.Title>
          <div className="grid grid-cols-2 gap-5 w-full h-[30rem]">
            <div className="flex flex-col gap-5 text-start text-[#fc939a] border-[3px] border-[#fc939a] p-3 relative">
              <p className="text-2xl uppercase font-bold text-center">
                {props.nome_receita}
              </p>
              <div>
                <p className="font-bold">Ingredientes</p>
              </div>
              <div>
                <p className="font-bold">Modo de Preparo</p>
                {formataModo().map((str) => {
                  return <p>{str}</p>
                })}
              </div>
              <div className="absolute w-full h-fit justify-center text-center left-0 bottom-2 flex gap-2">
                <Dialog.Root
                  open={openIngredientes}
                  onOpenChange={setOpenIngredientes}
                >
                  <Dialog.Trigger
                    title="Adicionar Ingrediente"
                    className="rounded-[50%] bg-[#fc939a] mt-3 py-2 px-2 text-white hover:bg-[#ff7a83] font-bold text-xs shadow-sm shadow-black/25"
                  >
                    <Plus size={17} weight="bold" />
                  </Dialog.Trigger>
                  {/* <LazyConfirmDeleteModal /> */}
                </Dialog.Root>
                <Dialog.Root open={openEditar} onOpenChange={setOpenEditar}>
                  <Dialog.Trigger
                    title="Editar Receita"
                    className="rounded-[50%] bg-gray-500 mt-3 py-2 px-2 text-white hover:bg-gray-700 font-bold text-xs shadow-sm shadow-black/25"
                  >
                    <Pencil size={17} weight="bold" />
                  </Dialog.Trigger>
                  {/* <LazyConfirmDeleteModal /> */}
                </Dialog.Root>
                <Dialog.Root open={openDeletar} onOpenChange={setOpenDeletar}>
                  <Dialog.Trigger
                    title="Excluir Receita"
                    className="rounded-[50%] bg-red-500 mt-3 py-2 px-2 text-white hover:bg-red-700 font-bold text-xs shadow-sm shadow-black/25"
                  >
                    <Trash size={17} weight="bold" />
                  </Dialog.Trigger>
                  {/* <LazyConfirmDeleteModal /> */}
                </Dialog.Root>
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
                <p className="text-base mt-5">Autor: {props.autor_id}</p>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}

export default ReceitaInfo

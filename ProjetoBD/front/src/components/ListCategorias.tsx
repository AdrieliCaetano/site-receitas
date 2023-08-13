import {useEffect, useState} from "react"
import * as Dialog from "@radix-ui/react-dialog"
import axios from "axios"
import {Pencil, Trash} from "@phosphor-icons/react"
import EditCategoria from "./EditCategoria"
import DeleteCategoria from "./DeleteCategoria"

function ListCategorias() {
  const [categorias, setCategorias] = useState([])
  const [openEditar, setOpenEditar] = useState(false)
  const [openDeletar, setOpenDeletar] = useState(false)

  useEffect(() => {
    axios
      .get(`http://localhost:5000/categorias`)
      .then((response) => response.data)
      .then((data) => setCategorias(data))
  }, [])

  console.log(categorias)
  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 inset-0 fixed" />
        <Dialog.Content className="fixed bg-yellow-100 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[30rem] h-fit shadow-lg shadow-black/25 overflow-auto">
          <Dialog.Title className="text-[#fc939a] uppercase font-bold text-center text-2xl font-serif p-2 border-[3px] border-[#fc939a] mb-10">
            Listagem das Categoria
          </Dialog.Title>
          <div className="w-full h-full text-[#fc939a] flex flex-col gap-2">
            {categorias.map((categoria) => {
              return (
                <div className="flex py-4 border-b-2 border-[#fc939a] rounded-lg text-xl relative">
                  {categoria["nome_categoria"]}
                  <div className="flex flex-row gap-1 absolute right-0">
                    <Dialog.Root open={openEditar} onOpenChange={setOpenEditar}>
                      <Dialog.Trigger
                        title="Editar Categoria"
                        className="rounded-[50%] bg-gray-500 py-2 px-2 text-white hover:bg-gray-700 font-bold text-xs shadow-sm shadow-black/25"
                      >
                        <Pencil size={17} weight="bold" />
                      </Dialog.Trigger>
                      <EditCategoria
                        nome_categoria={categoria["nome_categoria"]}
                      />
                    </Dialog.Root>

                    <Dialog.Root
                      open={openDeletar}
                      onOpenChange={setOpenDeletar}
                    >
                      <Dialog.Trigger
                        title="Excluir Categoria"
                        className="rounded-[50%] bg-red-500 py-2 px-2 text-white hover:bg-red-700 font-bold text-xs shadow-sm shadow-black/25"
                      >
                        <Trash size={17} weight="bold" />
                      </Dialog.Trigger>
                      <DeleteCategoria
                        nome_categoria={categoria["nome_categoria"]}
                      />
                    </Dialog.Root>
                  </div>
                </div>
              )
            })}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}

export default ListCategorias

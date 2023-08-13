import * as Dialog from "@radix-ui/react-dialog"
import axios from "axios"

interface DeleteCategoriaProps {
  nome_categoria: string
}

const DeleteCategoria = (props: DeleteCategoriaProps) => {
  const handleClick = async () => {
    await axios
      .delete(`http://localhost:5000/categorias/${props.nome_categoria}`)
      .then(() => alert("Categoria excluída."))
      .then(() => window.location.reload())
  }

  return (
    <div>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 inset-0 fixed" />
        <Dialog.Content className="fixed bg-yellow-100 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[30rem] h-[16rem] shadow-lg shadow-black/25 overflow-auto">
          <Dialog.Title className="text-[#fc939a] uppercase font-bold text-center text-2xl font-serif p-2 border-[3px] border-[#fc939a] mb-10">
            Deseja Deletar a Categoria: {props.nome_categoria}?
          </Dialog.Title>

          <div className="grid grid-cols-2 gap-5">
            <button
              className="rounded bg-[#fc939a] mt-3 py-2 px-3 text-white hover:bg-[#fe7881] font-bold text-xl"
              onClick={handleClick}
            >
              CONFIRMAR
            </button>

            <Dialog.Close className="rounded bg-gray-500 mt-3 py-2 px-3 text-white hover:bg-gray-700 font-bold text-xl">
              CANCELAR
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </div>
  )
}

export default DeleteCategoria

import * as Dialog from "@radix-ui/react-dialog"
import axios from "axios"
import {useForm} from "react-hook-form"

interface EditCategoriaProps {
  nome_categoria: string
}

function EditCategoria(props: EditCategoriaProps) {
  const {register, handleSubmit, reset} = useForm()

  const onSubmit = async (data: any) => {
    try {
      axios
        .put(`http://127.0.0.1:5000/categorias/${props.nome_categoria}`, data)
        .then((response) => response.data)
        .then(() => alert(`Categoria editada com sucesso.`))
        .then(() => window.location.reload())
    } catch (error) {
      throw new Error(`Erro no back-end.\n${error}`)
    } finally {
      reset()
    }
  }

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 inset-0 fixed" />
        <Dialog.Content className="fixed bg-yellow-100 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[30rem] h-[20rem] shadow-lg shadow-black/25 overflow-auto">
          <Dialog.Title className="text-[#fc939a] uppercase font-bold text-center text-2xl font-serif p-2 border-[3px] border-[#fc939a] mb-10">
            Editar Categoria {props.nome_categoria}
          </Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col mb-5">
                <label
                  htmlFor=""
                  className="font-bold text-[16px] text-[#fc939a] uppercase"
                >
                  Descrição
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  className="bg-gray-200 text-black rounded py-3 px-4 shadow-xl"
                  {...register("nome_categoria", {required: true})}
                />
              </div>
            </div>
            <button className="bg-[#fc939a] text-base font-bold rounded-md p-3 text-white hover:bg-[#ff767f] shadow-md shadow-black/25 absolute right-0 uppercase">
              Editar
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}

export default EditCategoria

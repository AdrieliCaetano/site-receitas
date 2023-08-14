import * as Dialog from "@radix-ui/react-dialog"
import axios from "axios"
import {useForm} from "react-hook-form"

interface AddIngredienteProps {
  receita_id: number
}

function AddIngrediente(props: AddIngredienteProps) {
  const {register, handleSubmit, reset} = useForm()

  const onSubmit = async (data: any) => {
    const editData = {
      ...data,
      receita_id: props.receita_id,
    }
    try {
      axios
        .post(
          `http://127.0.0.1:5000/receitas/${props.receita_id}/ingredientes`,
          editData
        )
        .then((response) => response.data)
        .then(() => alert(`Ingrediente criado com sucesso.`))
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
        <Dialog.Content
          className="fixed bg-yellow-100 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[30rem] h-[26rem] shadow-lg shadow-black/25 overflow-auto"
          onCloseAutoFocus={() => window.location.reload()}
        >
          <Dialog.Title className="text-[#fc939a] uppercase font-bold text-center text-2xl font-serif p-2 border-[3px] border-[#fc939a] mb-10">
            Adicionar Novo Ingrediente à Receita
          </Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col mb-5">
                <label
                  htmlFor=""
                  className="font-bold text-[16px] text-[#fc939a] uppercase"
                >
                  Ingrediente
                </label>
                <input
                  type="text"
                  className="bg-gray-200 text-black rounded py-3 px-4 shadow-xl"
                  {...register("ingrediente", {required: true})}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col mb-5">
                <label
                  htmlFor=""
                  className="font-bold text-[16px] text-[#fc939a] uppercase"
                >
                  Quantidade
                </label>
                <input
                  type="text"
                  className="bg-gray-200 text-black rounded py-3 px-4 shadow-xl"
                  {...register("quantidade", {required: true})}
                />
              </div>
            </div>
            <button className="bg-[#fc939a] text-base font-bold rounded-md p-3 text-white hover:bg-[#01141f]/50 shadow-md shadow-black/25 absolute right-0 uppercase">
              Adicionar
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}

export default AddIngrediente

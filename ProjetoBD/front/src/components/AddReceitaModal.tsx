import * as Dialog from "@radix-ui/react-dialog"
import {useForm} from "react-hook-form"

function AddReceitaModal() {
  const {register, handleSubmit, reset} = useForm()

  const onSubmit = async (data: any) => {
    console.log(data)
  }

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 inset-0 fixed" />
        <Dialog.Content className="fixed bg-yellow-100 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[70rem] h-[38rem] shadow-lg shadow-black/25 overflow-auto">
          <Dialog.Title className="text-[#fc939a] uppercase font-bold text-center text-2xl font-serif p-2 border-[3px] border-[#fc939a] mb-10">
            Adicionar Nova Receita
          </Dialog.Title>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative grid grid-cols-2 gap-5"
          >
            <div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col mb-5">
                  <label
                    htmlFor=""
                    className="font-bold text-[16px] text-[#fc939a] uppercase"
                  >
                    CHEF RESPONSÁVEL
                  </label>
                  <select
                    {...register("chef", {required: true})}
                    className="bg-gray-200 text-black rounded py-3 px-4 shadow-xl"
                  >
                    <option value=""></option>
                    {/* {instituicoes.map((inst) => (
                    <option key={inst["nome"]} value={inst["nome"]}>
                      {inst["nome"]}
                    </option>
                  ))} */}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col mb-5">
                  <label
                    htmlFor=""
                    className="font-bold text-[16px] text-[#fc939a] uppercase"
                  >
                    NOME DA RECEITA
                  </label>
                  <input
                    type="text"
                    className="bg-gray-200 text-black rounded py-3 px-4 shadow-xl"
                    {...register("nome", {required: true})}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col mb-5">
                  <label
                    htmlFor=""
                    className="font-bold text-[16px] text-[#fc939a] uppercase"
                  >
                    LINK PARA IMAGEM
                  </label>
                  <input
                    type="text"
                    className="bg-gray-200 text-black rounded py-3 px-4 shadow-xl"
                    {...register("imagem", {required: true})}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col mb-5">
                  <label
                    htmlFor=""
                    className="font-bold text-[16px] text-[#fc939a] uppercase"
                  >
                    CATEGORIA
                  </label>
                  <select
                    {...register("instituicao", {required: true})}
                    className="bg-gray-200 text-black rounded py-3 px-4 shadow-xl"
                  >
                    <option value=""></option>
                    <option value="Almoço/Jantar">Almoço/Jantar</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Café/Lanches">Café/Lanches</option>
                    <option value="Sobremesas">Sobremesas</option>
                    {/* {instituicoes.map((inst) => (
                    <option key={inst["nome"]} value={inst["nome"]}>
                      {inst["nome"]}
                    </option>
                  ))} */}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col mb-5">
                  <label
                    htmlFor=""
                    className="font-bold text-[16px] text-[#fc939a] uppercase"
                  >
                    Duração (em minutos)
                  </label>
                  <input
                    type="number"
                    className="bg-gray-200 text-black rounded py-3 px-4 shadow-xl"
                    {...register("duracao", {required: true})}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col mb-5">
                  <label
                    htmlFor=""
                    className="font-bold text-[16px] text-[#fc939a] uppercase"
                  >
                    Porções
                  </label>
                  <input
                    type="number"
                    className="bg-gray-200 text-black rounded py-3 px-4 shadow-xl"
                    {...register("porcoes", {required: true})}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col mb-5">
                  <label
                    htmlFor=""
                    className="font-bold text-[16px] text-[#fc939a] uppercase"
                  >
                    INGREDIENTES
                  </label>
                  <input
                    type="text"
                    className="bg-gray-200 text-black rounded py-3 px-4 shadow-xl"
                    {...register("ingredientes", {required: true})}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col mb-5">
                  <label
                    htmlFor=""
                    className="font-bold text-[16px] text-[#fc939a] uppercase"
                  >
                    MODO DE PREPARO
                  </label>
                  <input
                    type="text"
                    className="bg-gray-200 text-black rounded py-3 px-4 shadow-xl"
                    {...register("preparo", {required: true})}
                  />
                </div>
              </div>
            </div>

            <button className="bg-[#fc939a] text-base font-bold rounded-md p-3 text-white hover:bg-[#01141f]/50 shadow-md shadow-black/25 absolute right-0 bottom-4 uppercase">
              Adicionar
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}

export default AddReceitaModal

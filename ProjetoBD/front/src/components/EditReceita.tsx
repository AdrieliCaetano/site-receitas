import * as Dialog from "@radix-ui/react-dialog"
import axios from "axios"
import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"

interface EditReceitaProps {
  receita_id: number
  nome_receita: string
}

function EditReceita(props: EditReceitaProps) {
  const {register, handleSubmit, reset} = useForm()
  const [usuarios, setUsuarios] = useState([])
  const [categorias, setCategorias] = useState([])

  const onSubmit = async (data: any) => {
    try {
      axios
        .put(`http://127.0.0.1:5000/receitas/${props.receita_id}`, data)
        .then((response) => response.data)
        .then(() => alert(`Receita editada com sucesso.`))
        .then(() => window.location.reload())
    } catch (error) {
      throw new Error(`Erro no back-end.\n${error}`)
    } finally {
      reset()
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/usuarios")
      .then((response) => response.data)
      .then((data) => setUsuarios(data))
  }, [])

  useEffect(() => {
    axios
      .get("http://localhost:5000/categorias")
      .then((response) => response.data)
      .then((data) => setCategorias(data))
  }, [])

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 inset-0 fixed" />
        <Dialog.Content className="fixed bg-yellow-100 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[70rem] h-[38rem] shadow-lg shadow-black/25">
          <Dialog.Title className="text-[#fc939a] uppercase font-bold text-center text-2xl font-serif p-2 border-[3px] border-[#fc939a] mb-10">
            Editar Receita {props.nome_receita}
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
                    AUTOR
                  </label>
                  <select
                    {...register("autor", {required: true})}
                    className="bg-gray-200 text-black rounded py-3 px-4 shadow-xl"
                  >
                    <option value=""></option>
                    {usuarios.map((usuario) => (
                      <option key={usuario["username"]} value={usuario["id"]}>
                        {usuario["nome"]} {usuario["sobrenome"]}
                      </option>
                    ))}
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
                    {...register("nome_receita", {required: true})}
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
                    {...register("link_imagem", {required: true})}
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
                    {...register("categoria", {required: true})}
                    className="bg-gray-200 text-black rounded py-3 px-4 shadow-xl"
                  >
                    <option value=""></option>
                    {categorias.map((categoria) => (
                      <option
                        key={categoria["nome_categoria"]}
                        value={categoria["nome_categoria"]}
                      >
                        {categoria["nome_categoria"]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col mb-5">
                  <label
                    htmlFor=""
                    className="font-bold text-[16px] text-[#fc939a] uppercase"
                  >
                    Tempo de Preparo (em minutos)
                  </label>
                  <input
                    type="number"
                    className="bg-gray-200 text-black rounded py-3 px-4 shadow-xl"
                    {...register("tempo_preparo", {required: true})}
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
                    Porções
                  </label>
                  <input
                    type="number"
                    className="bg-gray-200 text-black rounded py-3 px-4 shadow-xl"
                    {...register("porcoes", {required: true})}
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
                  <textarea
                    className="bg-gray-200 text-black rounded py-3 px-4 shadow-xl"
                    {...register("modo_preparo", {required: true})}
                  />
                </div>
              </div>
            </div>

            <button
              className="bg-[#fc939a] text-base font-bold rounded-md p-3 text-white hover:bg-[#01141f]/50 shadow-md shadow-black/25 absolute right-0 bottom-4 uppercase"
              type="submit"
            >
              Adicionar
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}

export default EditReceita

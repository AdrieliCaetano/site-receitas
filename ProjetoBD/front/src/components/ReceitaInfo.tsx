import * as Dialog from "@radix-ui/react-dialog"

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
  console.log(props.modo_preparo)

  const formataModo = () => {
    const str = props.modo_preparo.split("\n")
    return str
  }

  console.log(formataModo())
  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 inset-0 fixed" />
        <Dialog.Content className="fixed bg-yellow-100 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[70rem] h-[40rem] shadow-lg shadow-black/25 overflow-auto">
          <Dialog.Title className="text-[#fc939a] uppercase font-bold text-center text-2xl font-serif p-2 border-[3px] border-[#fc939a] mb-10">
            Informações da Receita
          </Dialog.Title>
          <div className="grid grid-cols-2 gap-5 w-full h-[30rem]">
            <div className="flex flex-col gap-5 text-start text-[#fc939a] border-[3px] border-[#fc939a] p-3">
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
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}

export default ReceitaInfo

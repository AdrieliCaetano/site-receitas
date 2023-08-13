import {useState} from "react"
import * as Dialog from "@radix-ui/react-dialog"
import ReceitaInfo from "./ReceitaInfo"

interface ReceitaCardProps {
  receita_id: number
  nome_receita: string
  tempo_preparo: number
  modo_preparo: string
  porcoes: number
  link_imagem: string
  categoria: string
  autor_id: number
}

function ReceitaCard(props: ReceitaCardProps) {
  const [open, setOpen] = useState(false)
  console.log(props)
  return (
    <>
      <div className="bg-yellow-100 h-full rounded-md shadow-lg">
        <img
          src={props.link_imagem}
          alt="imagem"
          className="rounded-md w-full h-[218px]"
        />
        <div className="flex flex-col text-center my-5 items-center gap-3">
          <p className="text-xl uppercase font-bold">{props.nome_receita}</p>
          <p className="text-sm uppercase font-bold">{props.categoria}</p>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className="bg-red-500 py-2 w-1/2 uppercase font-bold hover:bg-red-600 text-white rounded-md">
              Ver Receita
            </Dialog.Trigger>

            <ReceitaInfo
            receita_id={props.receita_id}
              autor_id={props.autor_id}
              categoria={props.categoria}
              link_imagem={props.link_imagem}
              modo_preparo={props.modo_preparo}
              nome_receita={props.nome_receita}
              porcoes={props.porcoes}
              tempo_preparo={props.tempo_preparo}
            />
          </Dialog.Root>
        </div>
      </div>
    </>
  )
}

export default ReceitaCard

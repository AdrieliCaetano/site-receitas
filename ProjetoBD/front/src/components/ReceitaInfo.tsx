import * as Dialog from "@radix-ui/react-dialog"

function ReceitaInfo() {
  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 inset-0 fixed" />
        <Dialog.Content className="fixed bg-yellow-100 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[70rem] h-[40rem] shadow-lg shadow-black/25 overflow-auto">
          <Dialog.Title className="text-[#fc939a] uppercase font-bold text-center text-2xl font-serif p-2 border-[3px] border-[#fc939a] mb-10">
            Informações da Receita
          </Dialog.Title>
          <div className="grid grid-cols-2 gap-5 w-full h-[30rem]">
            <div className="bg-red-500">
              teste
            </div>
            <div className="bg-blue-500">
              <img
                src="https://www.comidaereceitas.com.br/wp-content/uploads/2016/07/Feijoada-de-boteco-freepik.jpg"
                alt="Imagem"
                className="rounded-md w-full"
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}

export default ReceitaInfo

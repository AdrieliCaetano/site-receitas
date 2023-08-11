interface ReceitaCardProps {}

function ReceitaCard(props: ReceitaCardProps) {
  return (
    <>
      <div className="bg-yellow-100 h-full rounded-md shadow-lg">
        <img
          src="https://www.comidaereceitas.com.br/wp-content/uploads/2016/07/Feijoada-de-boteco-freepik.jpg"
          alt="imagem"
          className="rounded-md w-full"
        />
        <div className="flex flex-col text-center my-5 items-center gap-3">
          <p className="text-xl uppercase font-bold">Nome Da Receita</p>
          <button className="bg-red-500 py-2 w-1/2 uppercase font-bold hover:bg-red-600 text-white rounded-md">
            Ver Receita
          </button>
        </div>
      </div>
    </>
  )
}

export default ReceitaCard
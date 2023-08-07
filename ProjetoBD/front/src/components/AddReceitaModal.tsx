import * as Dialog from "@radix-ui/react-dialog"
import { useForm } from "react-hook-form"

function AddReceitaModal() {
	const { register, handleSubmit, reset } = useForm()

	return (
		<>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-black/50 inset-0 fixed" />
				<Dialog.Content className="fixed bg-yellow-100 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[30rem] h-[31rem] shadow-lg shadow-black/25">
					<Dialog.Title className="text-[#fc939a] uppercase font-bold text-center text-2xl font-serif p-2 border-[3px] border-[#fc939a]">
						Adicionar Nova Receita
					</Dialog.Title>

				</Dialog.Content>
			</Dialog.Portal>
		</>
	)
}

export default AddReceitaModal

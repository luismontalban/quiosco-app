import useQuiosco from "@/hooks/useQuiosco"
import Image from "next/image"


const Categoria = ({categoria}) => {

    const {id, nombre, icono} = categoria
    const {categoriaActual, handleClickCategoria} = useQuiosco()


  return (
    <div className={`${categoriaActual?.id === id ? "bg-amber-400" : ""} flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}>
    <Image src={`/assets/img/icono_${icono}.svg`} width={70} height={70} alt="Imagen icono"/>
    <button type="button" className="text-2xl font-bold hover:cursor-pointer " onClick={() => {
      handleClickCategoria(id)
    }}>
      {nombre}
    </button>

    </div>
  )
}

export default Categoria
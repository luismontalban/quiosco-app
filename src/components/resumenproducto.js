import Image from "next/image"
import useQuiosco from "@/hooks/useQuiosco";

import { formatearDinero } from "@/helpers"

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";





export default function ResumenProducto({producto}) {



    const {handleEditarCantidades, handleEliminarProducto } = useQuiosco()
  return (
    <div className='shadow p-5 mb-3 flex gap-10 items-center'>
        <div className='md:w-1/6'>
        <Image
         width={300}
         height={400}
         alt={`Imagen producto ${producto.nombre}`}
         src={`/assets/img/${producto.imagen}.jpg`}
         />
        </div>

        <div className="md:w-4/6">
            <p className="text-3xl font-bold">{producto.nombre}</p>
            <p className="text-xl font-bold mt-2">Cantidad: {producto.cantidad}</p>
            <p className="text-xl font-bold text-amber-500 mt-2">Precio: {formatearDinero(producto.precio)}</p>
            <p className="text-sm text-gray-700 mt-2">Subtotal: {formatearDinero(producto.precio * producto.cantidad)}</p>
        </div>

        <div>
            <button type="button" onClick={() => handleEditarCantidades(producto.id)} className="bg-sky-700 flex gap-2 px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full">
            <FaRegEdit className="h-6 w-6" />
                Editar
            </button>


            <button type="button" onClick={() => handleEliminarProducto(producto.id)} className="bg-red-700 flex gap-2 px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full mt-3 ">
            <MdDeleteForever className="h-6 w-6" />
                Eliminar
            </button>
        </div>
    </div>
  )
}

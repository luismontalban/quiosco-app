import { useEffect, useState } from "react";
import { formatearDinero } from "@/helpers"
import useQuiosco from "@/hooks/useQuiosco"
import Image from "next/image"
import { FaMinusCircle } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";



const ModalProducto = () => {

const { producto,handleChangeModal, handleAgregarPedido, pedido} = useQuiosco()

const [cantidad, setCantidad] = useState(1)
const [edicion, setEdicion] = useState(false)



useEffect(() => {

    if (pedido.some((pedidoState) => pedidoState.id === producto.id)) 
{
    
    const productoEdicion = pedido.find((pedidoState) => pedidoState.id === producto.id)
    setEdicion(true)
    setCantidad(productoEdicion.cantidad)
}
  

  
}, [producto, pedido])






    return (
    <div className="md:flex gap-10">

        <div className="md:w-1/3">
        <Image 
        width={300}
        height={400}
        alt={`Imagen producto ${producto.nombre}`}
        src={`/assets/img/${producto.imagen}.jpg`}
        
        />
        </div>

        <div className="md:w-2/3">

           <div className="flex justify-end">
           <button onClick={handleChangeModal}>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
<path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
</svg>

</button>
           </div>
        <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
        <p className="mt-5 font-black text-5xl text-amber-500">{formatearDinero(producto.precio)}</p>


        <div className="flex gap-4 mt-5">

            <button type="button" onClick={() => {
                if (cantidad <= 1) return
                setCantidad(cantidad -1)
            }}>
            <FaMinusCircle className="h-7 w-6" />
            </button>
                <p className="text-3xl">{cantidad}</p>
            <button type="button" onClick={() => {
                if (cantidad >= 5) return
                        
                setCantidad(cantidad +1)
            }}>
            <CiCirclePlus className="h-7 w-6"/>
            </button>
        </div>


        <button type="button" className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded" onClick={() => handleAgregarPedido({...producto, cantidad})}>{edicion ? 'Guardar Pedido' : 'Añadir al Pedido'}</button>
        
        </div>


    </div>
  )
}

export default ModalProducto
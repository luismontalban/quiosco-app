import Layout from "@/app/layout"
import { formatearDinero } from "@/helpers";
import useQuiosco from "@/hooks/useQuiosco";
import { useCallback, useEffect } from "react";



export default function Total() {


    const {pedido, nombre, setNombre, colocarOrden, total} = useQuiosco()

    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3
    }, [pedido, nombre])

    useEffect(() => {
      
    
      comprobarPedido()
    }, [pedido, comprobarPedido])
    

   
  return (
    <Layout title="Total">
        <h1 className="text-4xl font-black">Total y confirmar pedido</h1>
        <p className="text-2xl my-10">Confirma tu pedido ahora</p>
        <form onSubmit={colocarOrden}>
            <label htmlFor="nombre" className="block uppercase text-slate-800 font-bold text-xl">Nombre</label>
            <input id="nombre" type="text" className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md" value={nombre} onChange={e => setNombre(e.target.value)} />

            <div className="mt-10">


                <p className="text-2xl">Total a pagar: {''}<span className="font-bold">{formatearDinero(total)}</span></p>
            </div>

            <div className="mt-5">
                <input type="submit" disabled={comprobarPedido()} className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800'} w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center cursor-pointer`} value="Confirmar Pedido"/>
            </div>
        </form>
    </Layout>
  )
}

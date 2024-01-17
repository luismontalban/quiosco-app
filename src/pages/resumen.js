import Layout from "@/app/layout"
import ResumenProducto from "@/components/resumenproducto"
import useQuiosco from "@/hooks/useQuiosco"



export default function Resumen() {

    const {pedido} = useQuiosco()
  return (
    <Layout title="Resumen">
        <h1 className="text-4xl font-black">Resumen</h1>
        <p className="text-2xl my-10">Revisa tu pedido</p>
        {pedido.length === 0 ? (
            <p className="text-2xl text-center">No hay elementos en tu pedido</p>
        ) : (
            pedido.map(producto => (
                    <ResumenProducto key={producto.id} producto={producto} />
            ))
        )}
    </Layout>
  )
}

import useSWR from "swr"
import AdminLayout from "@/app/adminlayout"
import axios from "axios"
import Orden from "@/components/orden"



export default function Admin() {
const fetcher = () => axios('/api/ordenes').then(datos => datos.data)
const { data, error, isLoading } = useSWR("/api/ordenes", fetcher, {refreshInterval: 100})

  return (
    <AdminLayout title="Admin">
          <h1 className="text-4xl font-black">Panel Admin</h1>
        <p className="text-2xl my-10">Administra las Ordenes</p>

        {data && data.length ? data.map(orden => (
          <Orden key={data.id} orden={orden} />
        )) : 'No hay Ordenes'  }
    </AdminLayout>
  )
}

import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { useState, useEffect, createContext } = require("react");


const QuioscoContext = createContext()


const QuioscoProvider = ({children}) => {


    const [categorias, setCategorias] = useState([])

    const [categoriaActual, setCategoriaActual] = useState({})

    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)

    const [pedido, setPedido] = useState([])

    const [nombre, setNombre] = useState('')

    const [total, setTotal] = useState(0)


    const router = useRouter()

  

    const obtenerCategorias = async () => {

        const { data } = await axios('api/categorias')

        setCategorias(data)
    }

    useEffect(() => {
            obtenerCategorias()
    }, [])
    


    useEffect(() => {
      
    
        setCategoriaActual(categorias[0])
    }, [categorias])
    

    useEffect(() => {
      
    const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad )+ total, 0)
    setTotal(nuevoTotal)
      
    }, [pedido])
    

    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push("/")
    }


    const handleSetProducto = producto => {
        setProducto(producto)
    }


    const handleChangeModal = () => {
        setModal(!modal)
    }


    const handleAgregarPedido = ({categoriaId, ...producto}) => {

        if (pedido.some((productoState) => productoState.id === producto.id)) {

            // Actualizar cantidad

            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)

            toast.success("Guardado con exito", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })

        }else{
        setPedido([...pedido, producto])

        toast.success("Agregado al Pedido", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })

        }

        setModal(false)
    }



    const handleEditarCantidades = id => {
        
        const productoActualizar = pedido.filter(producto => producto.id === id)
        setProducto(productoActualizar[0])
        
        setModal(!modal)
    }



    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
    }

    const colocarOrden = async (e) => {
        e.preventDefault()

       try {
        await axios.post('/api/ordenes',{pedido, nombre, total, fecha: Date.now().toString()})


        // RESEAT APP AL HACER EL PEDIDO

        setCategoriaActual(categorias[0])
        setPedido([])
        setNombre('')
        setTotal(0)

        toast.success('Pedido realizado con exito')

        setTimeout(() => {
            router.push('/')
        }, 3000);

       } catch (error) {
            console.error(error)
       }
    }
  
    return (

        <QuioscoContext.Provider value={{
            categorias,
            categoriaActual,
            handleClickCategoria,
            producto,
            handleSetProducto,
            modal,
            handleChangeModal,
            pedido,
            handleAgregarPedido,
            handleEditarCantidades,
            handleEliminarProducto,
            nombre,
            setNombre,
            colocarOrden,
            total
           
        }}>


            {children}
        </QuioscoContext.Provider>
    )

}


export{
    QuioscoProvider
}

export default QuioscoContext
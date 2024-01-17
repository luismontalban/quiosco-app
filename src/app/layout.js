import ModalProducto from '@/components/modalproducto';
import Pasos from '@/components/pasos';
import Sidebar from '@/components/sidebar'
import useQuiosco from '@/hooks/useQuiosco';
import Head from 'next/head'
import Modal from 'react-modal'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#__next');

export default function Layout({children, title = '', description= ''}) {


  const {modal} = useQuiosco()

  
    return (
      <>

      <Head>
        <title>{`Quiosco - ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      

      <div className="md:flex contenido mx-auto">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5  md:h-screen ">
          <Sidebar />
        </aside>
        <main className="md:w-8/12 xl:w-3/4  2xl:w-4/5 md:h-screen md:overflow-y-scroll">
          <div className="p-10 mt-10">
           

           <Pasos />
              
            {children}
              
              
                         
          </div>
          
        </main>
</div>
    


{modal && <Modal isOpen={modal} style={customStyles} ><ModalProducto /></Modal>}
     

     <ToastContainer />
      </>
    )
  }
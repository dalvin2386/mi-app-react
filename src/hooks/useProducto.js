import {useState} from "react";
import Swal from "sweetalert2";
import {alertaSucess,alertaWarning,alertaError} from "../alerta.js";


const useProducto = () => {

    const [productos, setProductos] = useState([]);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [comprado, setComprado] = useState('');
    const [tituloModal, setTituloModal] = useState('');
    const [operacion, setOperacion] = useState('');



    const getProducto = () => {
        const localStorageProductos=localStorage.getItem('PRODUCTOS');
        const parsedProdcutos= localStorageProductos ? JSON.parse(localStorageProductos):[];
        return Array.isArray(parsedProdcutos)? parsedProdcutos : [];
    }




    const enviarSolicitud = (metodo,parametros={}) => {
        const saveUpdateProducto = [...productos];
        let mensaje = ''
        if (metodo === 'POST') {
            saveUpdateProducto.push({...parametros, id: Date.now()})
            mensaje = 'Producto ingresado correctamente'
        }else if(metodo==='PUT'){
            const productoIndex=saveUpdateProducto.findIndex(producto=>producto.id===parametros.id)

            if(productoIndex !==-1){
                saveUpdateProducto[productoIndex]={...parametros}
                mensaje='Producto actualizado correctamente'
            }

        }else if(metodo==='DELETE'){
            const productoArr=saveUpdateProducto.filter(producto=>producto.id!==parametros.id);
            localStorage.setItem('PRODUCTOS',JSON.stringify(productoArr));
            alertaSucess('Producto eliminado correctamente');
            return
        }
        localStorage.setItem('PRODUCTOS',JSON.stringify(saveUpdateProducto))
        setProductos(saveUpdateProducto);
        alertaSucess(mensaje);
        document.getElementById('btnCerrarModal').click();
    }

    const validar = () => {
        let metodo=''
        if(nombre===''){
            alertaWarning('Nombre del producto en blanco','nombre');
        }else if(descripcion===''){
            alertaWarning('Descripcion del producto en blanco','descripcion');
        }else if(precio===''){
            alertaWarning('Precio del producto en blanco','precio');
        }else{

            let payload={
                id:id||Date.now(),
                nombre:nombre,
                descripcion:descripcion,
                precio: parseFloat(precio),
                comprado:comprado,
            }

            if (operacion===1){
                metodo='POST';
            }else{
                metodo='PUT';
            }


            enviarSolicitud(metodo,payload);

        }

    }


    const deleteProducto = (id) => {
        Swal.fire({
            title:'Esta seguro de eliminar el producto?',
            icon:'question',
            text: "No hay marcha atras",
            showCancelButton: true,
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                enviarSolicitud('DELETE',{id});
            }
        }).catch((error) => {
            alertaError(error);
        })
    }


    const openModal = (valorOperacion,producto) => {

        if(valorOperacion===1){
            setTituloModal('Registrar Producto')
            setId('')
            setNombre('')
            setDescripcion('')
            setPrecio('')
            setComprado('')
            setOperacion(1)
        }else if(valorOperacion===2){
            setTituloModal('Editar Producto')
            setId(producto.id)
            setNombre(producto.nombre)
            setDescripcion(producto.descripcion)
            setPrecio(producto.precio)
            setComprado(producto.comprado)
            setOperacion(2)
        }

    }

    return{

        getProducto,
        productos,
        setProductos,
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        precio,
        setPrecio,
        comprado,
        setComprado,
        openModal,
        validar,
        tituloModal,
        deleteProducto,

    }
}

export default useProducto
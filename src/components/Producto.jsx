import { Campo } from "./Campo";
import useProducto from "../hooks/useProducto.js";
import { useEffect } from "react";

export const Producto = () => {
  const {
    getProducto,
    setProductos,
    productos,
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
  } = useProducto();

  useEffect(() => {
    setProductos(getProducto);
  }, [deleteProducto]);

  return (
    <>
    <div>
        <h1 class="text-center mt-5 mb-5">Lista de Compras</h1>
    </div>
      <div className="container-fluid ">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-grid mx-auto">
              <button
                className="btn btn-primary mb-5"
                data-bs-toggle="modal"
                data-bs-target="#modalProducto"
                onClick={() => openModal(1)}
              >
                <i className="fa-solid fa-circle-plus me-2"></i>Añadir
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-8 offset-lg-2">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead class="table-info">
                <tr>
                  <th>#</th>
                  <th>Producto</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Comprado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto, i) => (
                  <tr key={producto.id}>
                    <td>{i + 1}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td>
                      {producto.precio.toLocaleString("es-HN", {
                        style: "currency",
                        currency: "HNL",
                      })}
                    </td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={producto.comprado}
                        />
                      </div>
                    </td>
                    <td class="d-flex gap-2">

                        <button
                          className="btn btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#modalProducto"
                          onClick={() => openModal(2, producto)}
                        >
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProducto(producto.id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          id="modalProducto"
          className="modal fade"
          aria-hidden="true"
          tabIndex={-1}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary" >
                <label className="h5 text-white">{tituloModal}</label>
              </div>
              <div className="modal-body">
                <Campo
                  id="nombre"
                  iconName="fa-solid fa-gift"
                  inputType="text"
                  placeholder="Nombre"
                  onChange={(e) => setNombre(e.target.value)}
                  value={nombre}
                ></Campo>
                <Campo
                  id="descripcion"
                  iconName="fa-solid fa-comments"
                  inputType="text"
                  placeholder="Descripción"
                  onChange={(e) => setDescripcion(e.target.value)}
                  value={descripcion}
                ></Campo>
                <Campo
                  id="precio"
                  iconName="fa-solid fa-dollar-sign"
                  inputType="number"
                  placeholder="Precio"
                  onChange={(e) => setPrecio(e.target.value)}
                  value={precio}
                ></Campo>
                <div>
                  <input
                    className="form-check-input me-2"
                    id="comprado"
                    type="checkbox"
                    onChange={() => setComprado((state) => !state)}
                    checked={comprado}
                  />
                  <label className="form-check-label" htmlFor="comprado">
                    Comprado
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={() => validar()}>
                  <i className="fa-solid fa-floppy-disk me-2"></i>Guardar
                </button>
                <button
                  id="btnCerrarModal"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  <i className="fa-solid fa-circle-xmark me-2"></i>Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

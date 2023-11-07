import moment from "moment";
import "../css/tableStyle.css";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import endPoints from "../endpoints/endPoints";
import { useState } from "react";
import TableModalCoverage from "../pages/TableModalCoverage";

function Table({ datos }) {

  const { data, get } = useFetch();
  const [showModal, setShowModal] = useState(false)

  const showTableCoverage = (id) => {
    try {
      get(`${endPoints.Coverage.inInsurance}/${id}`)
    } catch (error) { 
      console.error(error)
    } finally {
      setShowModal(true)
    }
  } 

  const closeModal = () => {
    setShowModal(false)
  } 
  
  const handleDelete = (id) => {
    alert(id)
  }


  return (
    <>
    {showModal && (
      <TableModalCoverage datos={data} close={closeModal}/>
    )}
      <div className="table-container">
        <h2 className="table-title">Listado de polizas</h2>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Nombre poliza</th>
              <th>Fecha inicial</th>
              <th>Fecha final</th>
              <th>Número</th>
              <th>Identificación cliente</th>
              <th>Valor máximo cubierto</th>
              <th>Ciudad cliente</th>
              <th>Dirección cliente</th>
              <th>Modelo vehículo</th>
              <th>Licencia vehículo</th>
              <th>Inspeccionado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map(item => (
              <tr key={item.id}>
                <td>{item.policyName}</td>
                <td>{moment(item.insurancePolicyDate).utc().format('YYYY-MM-DD')}</td>
                <td>{moment(item.insurancePolicyEndDate).utc().format('YYYY-MM-DD')}</td>
                <td>{item.number}</td>
                <td>{item.customerId}</td>
                <td>{item.maxcovered.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                <td>{item.customerCity}</td>
                <td>{item.customerAddress}</td>
                <td>{item.vehicleModel}</td>
                <td>{item.licensePlate}</td>
                <td>{item.inspected ? 'Si' : 'No'}</td>
                <td className="acciones">
                  <button
                    className="btnEdit"
                    onClick={() => showTableCoverage(item.id)}
                  >
                    Coverturas
                  </button>
                  <button
                    className="btnDelete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

Table.propTypes = {
   datos: PropTypes.any,
}

export default Table
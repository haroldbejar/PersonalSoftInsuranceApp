import "../css/tableStyle.css";
import "../css/modalStyle.css";
import PropTypes from "prop-types";
import moment from "moment";

function TableModalCoverage({datos, close}) {

    return (
        <div className="modal">
            <div className="modal-content-table">
                <span onClick={() => close()} className="close">
                    &times;
                </span>
                <div className="table-container">
                    <h2 className="table-title">Coverturas</h2>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Nombre cobertura</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map(item => (
                                <tr key={item.id}>
                                    <td>{item.nameCoverage}</td>
                                    <td>{moment(item.coverageDate).utc().format('YYYY-DD-MM')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

TableModalCoverage.propTypes = {
    datos: PropTypes.any,
    close: PropTypes.func,
}

export default TableModalCoverage;
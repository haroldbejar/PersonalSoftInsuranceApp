import PropTypes from "prop-types";
import "../css/modalStyle.css";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import endPoints from "../endpoints/endPoints";
import moment from "moment";


function CoverageModal({ id, date, close }) {

    const { post } = useFetch();

    const [formCoverage, setFormCoverage] = useState({
        coverageDate: '',
        coverageName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormCoverage((prevData) => ({
            ...prevData,
            [name]:  value,
        }));
    };

    const mapedForSubmit = () => {
        const dataForm = {
            insuranceid: id,
            insurancedate: date,
            namecoverage: formCoverage.coverageName,
            coveragedate: moment(formCoverage.coverageDate).utc().format('YYYY-MM-DD')
        };
        return dataForm;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataMaped = mapedForSubmit(formCoverage)
        try {
           await post(endPoints.Coverage.base, dataMaped)
        } catch (error) {
            console.error(error)
        } finally {
            close()
            alert('Submited!!!')
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span onClick={() => close()} className="close">
                    &times;
                </span>
                <h2>Modal Coverturas</h2>
                <form>
                    <input type="hidden" name="insuranceId" value={formCoverage.insuracenId}/>
                    <label className="labeModal">Nombre cobertura</label>
                    <input type="text" name="coverageName" value={formCoverage.insuracenId} onChange={handleChange}/>
                    <label className="labeModal">Fecha covertura</label>
                    <input type="date" name="coverageDate" value={formCoverage.insuracenId} onChange={handleChange}/>
                    <button onClick={handleSubmit} className="btnModalSubmit">Grabar</button>
                </form>
            </div>
        </div>
    );
}

CoverageModal.propTypes = {
    id: PropTypes.string,
    date: PropTypes.string,
    close: PropTypes.func,
 }

export default CoverageModal;
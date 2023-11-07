import { useCallback, useEffect, useState, useContext } from "react";
import { InsuranceContext } from "../context/InsuranceContext";
import useFetch from "../hooks/useFetch";
import endPoints from "../endpoints/endPoints";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CoverageModal from "./CoverageModal";
import mapData from "../constants/mapData";
import moment from "moment/moment";
import "../css/form.css";

function InsuranceForm() {

    const { 
        idInsurance,
        dateInsurance, 
        setIdInsurance, 
        setDateInsurance 
    } = useContext(InsuranceContext);
    const { data, post, get } = useFetch();
    const navigate = useNavigate();
    const {param} = useParams();
    const [isLoading, setIsloading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        number: '',
        customerId: '',
        customerBornDate:'',
        insurancePolicyDate: '',
        insurancePolicyEndDate: '',
        Maxcovered: 0,
        policyName: '',
        customerCity: '',
        customerAddress: '',
        licensePlate: '',
        vehicleModel: '',
        Inspected: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const openModal = () => {
        setShowModal(true)
        console.log(`${idInsurance} - ${dateInsurance}`)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    // Allows the form data to be submitted mapped.
    const mapedForSubmit = () => {
        const dataForm = {
            number: formData.number,
            customerid: formData.customerId,
            customerborndate: moment(formData.customerBornDate).format('YYYY-MM-DD'),
            insurancepolicydate: moment(formData.insurancePolicyDate).format('YYYY-MM-DD'),
            insurancepolicyenddate: moment(formData.insurancePolicyEndDate).format('YYYY-MM-DD'),
            maxcovered: parseFloat(formData.Maxcovered),
            policyname: formData.policyName,
            customercity: formData.customerCity,
            customeraddress: formData.customerAddress,
            licenseplate: formData.licensePlate,
            vehiclemodel: formData.vehicleModel,
            inspected: formData.Inspected,
          };

          return dataForm;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataMaped = mapedForSubmit(formData)
        try {
            if (param) {
                alert('update data')
            } else {
                await post(endPoints.Insurances.policies, dataMaped);
            }
            navigate("/home");
        } catch (error) {
            console.error('Error en la llamada al servidor: ', error);
        }
    };

    // Maps the obtained data to be rendered.
    const mapFormStateData = useCallback(() => {
        const mapedData = mapData(data)
        setFormData(mapedData)
        setIdInsurance(data.id) 
        setDateInsurance(data.insurancePolicyEndDate)
    }, [ data, setIdInsurance, setDateInsurance ])
 

    useEffect(() => {
        const initData = async () => {
            if (param) {
                try {
                    if (isLoading) {
                       await get(`${endPoints.Insurances.policiesByParams}/${param}`);
                        setIsloading(false)  
                    }
                } catch(error) {
                    console.error(error)
                } finally {
                    mapFormStateData()
                }
            }
        }
        initData()
    }, [param, isLoading, mapFormStateData])
   
    

    return (
        <>
            {showModal && (
                <CoverageModal close={closeModal} id={idInsurance} date={dateInsurance}/>
            )}
            <div className="links">
                <Link to={"/home"} className="linkHome">Home</Link>
                { param ? 
                    <Link  onClick={openModal} className="linkHome">Agregar Coverturas</Link> :
                    null
                }
            </div>
            
            <h1>Creación Poliza</h1>
            <form>
                <div className="form-row">
                    <div>
                        <label>Fecha de Póliza:</label>
                        <input
                            type="date"
                            name="insurancePolicyDate"
                            value={formData.insurancePolicyDate}
                            onChange={handleChange}
                            className="inputForm"
                        />
                    </div>
                    <div>
                        <label>Fecha Final Póliza:</label>
                        <input
                            type="date"
                            name="insurancePolicyEndDate"
                            value={formData.insurancePolicyEndDate}
                            onChange={handleChange}
                            className="inputForm"
                        />
                    </div>
                    <div>
                        <label>Nombre de Póliza:</label>
                        <input
                            type="text"
                            name="policyName"
                            value={formData.policyName}
                            onChange={handleChange}
                            className="inputForm"
                        />
                    </div>
                    <div>
                        <label>Número:</label>
                        <input
                            type="text"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            className="inputForm"
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div>
                        <label>Identificación del Cliente:</label>
                        <input
                            type="text"
                            name="customerId"
                            value={formData.customerId}
                            onChange={handleChange}
                            className="inputForm"
                        />
                    </div>
                    <div>
                        <label>Fecha de Nacimiento del Cliente:</label>
                        <input
                            type="date"
                            name="customerBornDate"
                            value={formData.customerBornDate}
                            onChange={handleChange}
                            className="inputForm"
                        />
                    </div>
                    <div>
                        <label>Dirección del Cliente:</label>
                        <input
                            type="text"
                            name="customerAddress"
                            value={formData.customerAddress}
                            onChange={handleChange}
                            className="inputForm"
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div>
                        <label>Ciudad del Cliente:</label>
                        <input
                            type="text"
                            name="customerCity"
                            value={formData.customerCity}
                            onChange={handleChange}
                            className="inputForm"
                        />
                    </div>
                    <div>
                        <label>Modelo de Vehículo:</label>
                        <input
                            type="text"
                            name="vehicleModel"
                            value={formData.vehicleModel}
                            onChange={handleChange}
                            className="inputForm"
                        />
                    </div>
                    <div>
                        <label>Placa del Vehículo:</label>
                        <input
                            type="text"
                            name="licensePlate"
                            value={formData.licensePlate}
                            onChange={handleChange}
                            className="inputForm"
                        />
                    </div>
                </div>
                <div className="last">
                    <div>
                        <label>Máximo Coberturas:</label>
                        <input
                            type="number"
                            name="Maxcovered"
                            value={formData.Maxcovered}
                            onChange={handleChange}
                            className="inputForm"
                        />
                    </div>
                    <div>
                        <label>¿Inspeccionado?</label>
                        <input
                            type="checkbox"
                            name="Inspected"
                            checked={formData.Inspected}
                            onChange={handleChange}
                            className="inputForm"
                        />
                    </div>
                </div>
                <div>
                    <button onClick={handleSubmit}>Guardar Datos</button>
                </div>
            </form>
        </>
       
    );
}

export default InsuranceForm;
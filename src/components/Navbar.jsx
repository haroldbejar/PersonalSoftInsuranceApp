import { Link } from "react-router-dom";
import "../css/navbarStyle.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();
    const [searched, setSearched] = useState('');


    const handleClickLogout = () => {
        localStorage.removeItem('tokenApp');
    }

    const handleSearch = (e) => {
        setSearched(e.target.value);
    }

    const handleClickSearch = () => {
        if (searched) {
            navigate(`/editform/${searched}`);
        } else {
            navigate("/insurance");
        }
    }

  return (
    <nav className="navbar">
        <div className="brand">PersonalSoft-Test</div>
        <div className="insuranceItem">
            <Link to={"/insurance"} className="linkInsurance"> Polizas </Link>
        </div>
        <div className="search">
            <input
                name="txtSearch"
                placeholder="Ingresa el número poliza o placa vehículo..."
                className="txtSearch"
                onChange={handleSearch}
            />
            <button 
                className="btnSearch" 
                onClick={handleClickSearch}
            >
                Buscar
            </button>
        </div>
        <div className="usersession">
            <Link 
                to={"/"}
                onClick={handleClickLogout} 
                className="linkInsurance">
                Cerrar session
            </Link>
        </div>
    </nav>
  );
};

export default Navbar;
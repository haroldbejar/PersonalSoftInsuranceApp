import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import InsuranceForm from "../pages/InsuranceForm";

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="home"  element={<Home/>} />
            <Route path="insurance"  element={<InsuranceForm/>} />
            <Route path="editform/:param" element={<InsuranceForm/>}/>
        </Routes> 
    );
}

export default RoutesApp;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import endPoints from "../endpoints/endPoints";
import "../css/loginStyle.css";


function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(endPoints.Account.login, formData);
          const token = response.data.token;
          if (token) {
            localStorage.setItem("tokenApp", token);
            navigate("/home");
          } else {
            console.error("Token no encontrado!");
          }
        } catch (error) {
          console.error("Error de inicio de sesión:", error);
        }
      };

    return(
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nombre de usuario"
              className="inputLogin"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              className="inputLogin"
            />
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    );
}

export default Login;
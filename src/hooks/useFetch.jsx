import { useState } from "react";

function useFetch() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const token = localStorage.getItem("tokenApp");

    const fetchData = async (url, methodApp) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url,  { 
                method: methodApp, 
                headers: {
                    "Accept" : "*/*",
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`
                },
            });
            
            const responseData = await response.json();
            setData(responseData);
            
        } catch (err) {
            setError(err);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataBody = async (url, methodApp, data = null) => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("tokenApp");
        const dataBody = methodApp !== 'GET' ? data : null;
        
        try {
            const response = await fetch(url,  { 
                method: methodApp, 
                headers: {
                    "Accept" : "*/*",
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify(dataBody),  
            });

            if (!response.ok) {
                console.error(`HTTP Error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            setData(responseData);
            console.log(responseData);
        } catch (err) {
            setError(err);
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
   

    const get = (url) => fetchData(url, 'GET');
    const post = (url, data) => fetchDataBody(url, 'POST', data);
    const put = (url, data) => fetchDataBody(url, 'PUT', data);
    const del = (url) => fetchData(url, 'DELETE');

    return {
        data,
        loading,
        error,
        setData,
        get,
        post,
        put,
        del,
    };
}

export default useFetch;
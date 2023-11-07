import { createContext, useState } from "react";


export const InsuranceContext = createContext();

export const InsuranceProvider = ({children}) => {
   const [idInsurance, setIdInsurance] = useState('');
   const [dateInsurance, setDateInsurance] = useState('');
   const [dataCoverage, setDataCoverage] = useState({});

    const contextValues = {
        idInsurance,
        dateInsurance,
        dataCoverage,
        setIdInsurance,
        setDateInsurance,
        setDataCoverage
    };

    return (
        <InsuranceContext.Provider value={contextValues}>
            {children}
        </InsuranceContext.Provider>
    );
};

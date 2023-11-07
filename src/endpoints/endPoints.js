const baseUrl = "https://localhost:7087/api/"; // "http://localhost:5028/api/";
const endPoints = {
    Account: {
        login: `${baseUrl}Account/login`,
    },
    Insurances: {
        policies: `${baseUrl}Insurance`,
        policiesByParams: `${baseUrl}Insurance/insurancebyparam`
    },
    Coverage: {
        base: `${baseUrl}Coverage`,
        inInsurance: `${baseUrl}Coverage/coveragesbyinsuranceid`
    }
};

export default endPoints;
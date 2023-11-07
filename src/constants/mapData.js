import moment from "moment";

const mapData = (data) => {
    const dataMaped = {
        number: data.number || '',
        customerId: data.customerId || '',
        customerBornDate: moment(data.customerBornDate).utc().format('YYYY-MM-DD'),
        insurancePolicyDate:  moment(data.insurancePolicyDate).utc().format('YYYY-MM-DD'),
        insurancePolicyEndDate: moment(data.insurancePolicyEndDate).utc().format('YYYY-MM-DD'),
        Maxcovered: data.maxcovered || 0,
        policyName: data.policyName || '',
        customerCity: data.customerCity || '',
        customerAddress: data.customerAddress || '',
        licensePlate: data.licensePlate || '',
        vehicleModel: data.vehicleModel || '',
        Inspected: data.inspected || false
    }
    return dataMaped;
} 

export default mapData;
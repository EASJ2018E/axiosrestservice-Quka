import axios, {AxiosResponse, AxiosError} from "../../node_modules/axios/index";

interface ICustomer {
    id: number,
    firstName: string,
    lastName: string,
    year: number;
}

let uri: string = 'https://restcustomerservice20181011112426.azurewebsites.net/api/Customer';
let customers: ICustomer[] = [];
let HTMLContent = document.getElementById("content");

/**
 * Axios get request
 */
function getHttp(): void {
    
    let data: ICustomer[];
    axios.get <ICustomer[]> (uri)
    .then(function (response: AxiosResponse<ICustomer[]>): void {
        customers = response.data;
        
        console.log(customers);
        HTMLContent.innerHTML = JSON.stringify(customers);

    })
    .catch(function (error) {
        console.log(error);
    });
}

getHttp();
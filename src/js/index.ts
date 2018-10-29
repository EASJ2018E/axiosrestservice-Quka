import axios, {AxiosResponse, AxiosError} from "../../node_modules/axios/index";

interface ICustomer {
    id: number,
    firstName: string,
    lastName: string,
    year: number;
}

let uri: string = 'https://restcustomerservice20181011112426.azurewebsites.net/api/Customer';
let customers: ICustomer[] = [];
let HTMLContent = document.getElementById("output");

function updateHtml(customers: ICustomer[]): void {
    HTMLContent.innerHTML = JSON.stringify(customers);
}

/**
 * Axios get request
 */
function getHttp(): void {
    
    let data: ICustomer[];
    axios.get <ICustomer[]> (uri)
    .then(function (response: AxiosResponse<ICustomer[]>): void {
        customers = response.data;
        
        console.log(customers);
        updateHtml(customers);
    })
    .catch(function (error) {
        console.log(error);
    });
}


/**
 * Axios post request
 */
function postHttp(): void {
    //let idVal: number = Number( (<HTMLInputElement> document.getElementById("id")).value );
    let firstNameVal: string = (<HTMLInputElement> document.getElementById("firstName")).value;
    let lastNameVal: string = (<HTMLInputElement> document.getElementById("lastName")).value;
    let yearVal: number = Number((<HTMLInputElement> document.getElementById("year")).value);

    let newCustomer: ICustomer = <ICustomer> {
        firstName: firstNameVal,
        lastName: lastNameVal,
        year: yearVal
    }

    axios.post<ICustomer>(uri, newCustomer)
    .then(function(response: AxiosResponse<ICustomer>): void {
        if(response.status == 200) {
            console.log(response.data);
            let customerResult: ICustomer = response.data;
            
            customers.push(customerResult);

            updateHtml(customers);
        }
    })
    .catch(function(error){
        console.log(error);
    });
}

getHttp();

document.getElementById("postHttpBtn").addEventListener("click", postHttp);
import axios, {AxiosResponse, AxiosError} from "../../node_modules/axios/index";

interface ICoin {
    id: number,
    genstand: string,
    bud: number,
    navn: string;
}

let uri: string = 'https://restcoinservice20181102095913.azurewebsites.net/api/Coin';
let coins: ICoin[] = [];
let HTMLContent = document.getElementById("output");

function updateHtml(coins: ICoin[]): void {
    let result = "<table>";
    result += "<tr>" +
                "<td>id</td>" +
                "<td>genstand</td>" +
                "<td>bud</td>" +
                "<td>navn</td>" +
              "</tr>";


    for (let i = 0; i < coins.length; i++) {
        const c = coins[i];
        result += "<tr>" + "<td>" + c.id +  "</td>" + "<td>" + c.genstand +  "</td>" + "<td>" + c.bud +  "</td>" + "<td>" + c.navn +  "</td>" + "</tr>";
    }

    result += "</table>";

    HTMLContent.innerHTML = result;
}

/**
 * Axios get request
 */
function getHttp(): void {
    let data: ICoin[];

    axios.get <ICoin[]> (uri)
    .then(function (response: AxiosResponse<ICoin[]>): void {
        coins = response.data;

        console.log(coins);
        updateHtml(coins);
    })
    .catch(function (error) {
        console.log(error);
    });
}

/**
 * Axios get single
 */
function getSingleHttp(): void {
    let getId: number = Number((<HTMLInputElement> document.getElementById("getId")).value);
    let getUri: string = uri + "/" + getId;
    
    axios.get <ICoin> (getUri)
    .then(function (response: AxiosResponse<ICoin>): void {
        let coin: ICoin = response.data;

        console.log(coin);
        document.getElementById("getSingleOutput").innerHTML = JSON.stringify(coin);
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
    let genstandVal: string = (<HTMLInputElement> document.getElementById("genstand")).value;
    let budVal: number = Number( (<HTMLInputElement> document.getElementById("bud")).value );
    let navnVal: string = (<HTMLInputElement> document.getElementById("navn")).value;

    let newCoin: ICoin = <ICoin> {
        genstand: genstandVal,
        bud: budVal,
        navn: navnVal
    }

    axios.post<ICoin>(uri, newCoin)
    .then(function(response: AxiosResponse<ICoin>): void {
        if(response.status == 200) {
            console.log(response.data);
            let coinResult: ICoin = response.data;
            
            coins.push(coinResult);

            updateHtml(coins);
        }
    })
    .catch(function(error){
        console.log(error);
    });
}


/**
 * Axios delete request
 */
function deleteHttp(): void {
    let delId: string = (<HTMLInputElement> document.getElementById("delId")).value;

    axios.delete(uri + "/" + delId)
    .then(function(response): void {
        console.log(response)

        // Behold coins som ikke har den specifikke id (aka. slet fra array)
        let filteredcoins = coins.filter(c => {
            return c.id !== response.data.id
        })

        console.log(filteredcoins);

        updateHtml(filteredcoins);
    })
    .catch(function(error){
        console.log(error);
    });
}






getHttp();
document.getElementById("postHttpBtn").addEventListener("click", postHttp);
document.getElementById("deleteHttpBtn").addEventListener("click", deleteHttp);
document.getElementById("getHttpBtn").addEventListener("click", getSingleHttp);
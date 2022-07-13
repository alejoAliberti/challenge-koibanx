import mockData from '../recursosEstaticos/mockData.json'
import mockData2 from '../recursosEstaticos/mockData2.json'


const urlApi = 'https://api.koibanx.com/stores'


//simula el comportamiento y la respuesta de la api
const simulaApi = {
    

    traerTodaData: (pagina) => {
        if(pagina) {
            console.log(
                `${urlApi}?q{'page': ${pagina}}`
            )
            return pagina === 1 ?  mockData : mockData2   

        }
        return mockData;
    },
        

    traerDataPorValor: (valorBusqueda) => {
        let dataFiltrada = []; 
        let todaData = mockData.data.concat(mockData2.data);
        todaData.map( (objData) => {
            if(
                objData.commerce.match(valorBusqueda) ||
                objData.id.toString().match(valorBusqueda) ||
                objData.cuit.match(valorBusqueda)
            ) {
                dataFiltrada.push(objData)
            }
        });
        const respuesta = {
            'data': dataFiltrada,
            'pages': Math.round(dataFiltrada.length / 4),
            'rowsPerPage': 4,
            'total': 1000,
        }
        return respuesta;
    },

    traerDataPorEstado: (estado) => {
        let dataFiltrada = [];
        mockData.data.map( (objData) => {
            if(objData.active === estado) {
                dataFiltrada.push(objData);
            }
        });

        const respuesta = {
            'data': dataFiltrada,
            'pages': Math.round(dataFiltrada.length / 4),
            'rowsPerPage': 4,
            'total': 1000,
        };

        return respuesta;




    },

    traerDataPorValorYEstado: (valorBusqueda, estado) => {
        let dataFiltrada = [];
        let todaData = mockData.data.concat(mockData2.data)
        todaData.map( (objData) => {
            if(
                (objData.commerce.match(valorBusqueda)) ||
                 objData.id.toString().match(valorBusqueda) ||
                 objData.cuit.match(valorBusqueda) &&
                 objData.active === estado
            ) {
              dataFiltrada.push(objData)
            }
        });
        const respuesta = {
            'data': dataFiltrada,
            'pages': Math.round(dataFiltrada.length / 4),
            'rowsPerPage': 4,
            'total': 1000,
        };
        return respuesta
    },

    

};


//llama a la api y tra toda la data sin ningun filtro 

export const traerTodaData = (pagina) => {
    return simulaApi.traerTodaData(pagina);
    
};



//llamaa la api trayendo los datos  que coincidan con el valor de la busqueda
export const traerDataPorValor = (valorBusqueda) => {
    console.log(
        `${urlApi}?q={'$or':[{'commerce':{'$regex':.${valorBusqueda}*}},{id:{'$regex':.${valorBusqueda}*}},{cuit:{'$regex':.${valorBusqueda}*}}]}`
    );
    return simulaApi.traerDataPorValor(valorBusqueda);
};

//filtra los datos dependiendo de su estado, si el estado es 1 trae los datos ACTIVOS Y SI ES 0 TRAE LOS DATOS INACTIVOS 
export const traerDataPorEstado = (estado) => {
    

    console.log(`${urlApi}?q={'active':${estado}}`);
    return simulaApi.traerDataPorEstado(estado);

};


//Llama a la api trayendo todos los datos que coincidan con lo ingresado en el campo de la busqueda y el estado seleccionado Acito/ No Activo
export const traerDataPorValorYEstado = (valorBusqueda, estado) => {
    console.log(
        `${urlApi}?q={$and:[{'$or':[{'commerce':{'$regex':.${valorBusqueda}*}},{id:{'$regex':.${valorBusqueda}*}},{cuit:{'$regex':.${valorBusqueda}*}}]},{'active':${estado}}]}`
    );
    return simulaApi.traerDataPorValorYEstado(valorBusqueda, estado)
};







//Evalua el caso buscado y filtra de acorde a lo seleccionado. 

//los casos pueden ser "Todos", "Activos" y "No Activos".
export const dataFiltrada = (valorInput, valorSelect) => {
    if (valorInput && (valorSelect === "0" || valorSelect === "1")) {

        
        return traerDataPorValorYEstado(valorInput, valorSelect)
    }
    //chequea solo el valor del input 
    else if (valorInput && valorSelect === 'todos') {

        return traerDataPorValor(valorInput)
    }
    else if (!valorInput && (valorSelect === '0' || valorSelect === '1')) { // evalua si el valor del select es 1 o 0
        return traerDataPorEstado(valorSelect);
    }
    else if (valorSelect==='todos'){
        console.log(`${urlApi}`)
        return traerTodaData();  //Trae todos los resultados

    }

}



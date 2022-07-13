import { dataFiltrada } from "./FiltrosData"
import mockData from '../recursosEstaticos/mockData.json'

const urlApi = 'https://api.koibanx.com/stores'



//Ordenamiento de la seccion "Ordenar por:"  y tipo de orden "Ascendente" o "Descendente"
 export const orden = (valorInput, valorSelect) => {

    //Evaluamos si los datos ordenados son por Comercio, si el select es Ascendente o descendente y traemos la data Acorde a la opcion  si es asc va a retonar 1 y de lo contrario retorna 0
    if(valorInput === "commerce" && (valorSelect === "asc" || valorSelect === "desc") ){
        const valor = valorSelect === 'asc' ? 1 : 0;
        console.log(`${urlApi}?&h={"$orderby": {"commerce": ${valor} }}`)
        return mockData.data;
    }
    //Evaluamos si los datos ordenados son por Cuit, si el select es Ascendente o descendente y traemos la data Acorde a la opcion
    else if (valorInput === "cuit" && (valorSelect === "asc" || valorSelect === "desc")){
        
        const valor = valorSelect === 'asc' ? 1 : 0;
        console.log(`${urlApi}?&h={"$orderby": {"cuit": ${valor}}}`)
        return mockData.data
    } else {

        //En el caso de no elegir ninguna opcion nos muestra un mensaje y sigue mostrando la Data inicial
        alert('Seleccionar Comercio o Cuit y el tipo de ordenamiento')
         return mockData.data

    }
  
     
 } 


 
import React, { useEffect, useState } from 'react';
import './App.css';
import { BarraBusqueda } from './componentes/BarraNavegacion';
import { TablaData } from './componentes/TablaData';
import {dataFiltrada, traerTodaData } from './servicios/FiltrosData';
import { orden } from './servicios/OrdenData';


function App() {

  const [ dataParaUsar, setDataParaUsar] = useState();
  const [ paginaActual, setPaginaActual] = useState(1);
  const [ filasParaMostrar, setFilasParaMostrar] = useState(traerTodaData().data)

  
  //estructura  de las columnas de la tabla con su respectivo ID y nombre
  
  const columnas = [  
    { id: 'id', label: 'ID' },
    { id: 'commerce', label: 'Comercio' },
    { id: 'cuit', label: 'CUIT' },
    { id: 'concept1', label: 'Concepto 1' },
    { id: 'concept2', label: 'Concepto 2' },
    { id: 'concept3', label: 'Concepto 3' },
    { id: 'concept4', label: 'Concepto 4' },
    { id: 'concept5', label: 'Concepto 5' },
    { id: 'concept6', label: 'Concepto 6' },
    { id: 'currentBalance', label: 'Balance Actual'},
    { id: 'active', label: 'Activo' },
    { id: 'lastSale', label: 'Ultima Venta'},
  ]
  

  //paginacion de la talba, trale las filas para mostrar en la pagina anterior o la siguiente 
  const generarPagina = (tipoGenerado, maximoPaginas) => {

    
    if (tipoGenerado === 'Siguiente' && paginaActual < maximoPaginas){
      const {data} = traerTodaData(paginaActual + 1);
      setPaginaActual((paginaActual) => paginaActual + 1);
      setFilasParaMostrar(data)
    } else if (tipoGenerado === 'Anterior' && paginaActual > 1) {
      
      const {data} = traerTodaData(paginaActual - 1);
      setPaginaActual((paginaActual) => paginaActual - 1);
      setFilasParaMostrar(data)

    }
  }


//Analiza la informacion recibida y a travez de la api trae el resultado final
const buscador = (e) => {
      e.preventDefault();
      const valorInput = e.target[0].value;
      const valorSelect = e.target[1].value;

      let nuevaDataParaUsar = dataFiltrada(valorInput, valorSelect);
      if(nuevaDataParaUsar.data.length){
        setFilasParaMostrar(nuevaDataParaUsar.data);
        setDataParaUsar(nuevaDataParaUsar);
      }else {
        return alert('No hay coincidencias');
      }
  }

//organiza los valores que recibio en el evento y define en el estado el resultado de la funcion "orden()"
const ordenamiento = (e) => {
  e.preventDefault();
  let valorInput = e.target[0].checked
                  ? e.target[0].value
                  : e.target[1].checked
                  ? e.target[1].value
                  : '';

  let valorSelect = e.target[2].value;
  let dataParaUsar = orden(valorInput, valorSelect )
  setFilasParaMostrar(dataParaUsar);
  dataParaUsar.data =  dataParaUsar;
 }  
 



  
  useEffect( ()=> {
    setDataParaUsar(traerTodaData())
  }, []);

 
  
  return (
    <>
    
    <BarraBusqueda
    buscador={buscador}
    mostrarPor={ordenamiento}
    />

    <TablaData
    columnas ={columnas}
    filas={filasParaMostrar}
    paginaActual={paginaActual}
    generarPagina={generarPagina}
    maximoPaginas={dataParaUsar?.pages}
    filasParaMostrar={dataParaUsar?.rowsPerPage}
    />
    
    </>
  );


}

export default App;

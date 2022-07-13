import React from 'react'


export const TablaData = ({ 
    
    columnas,
    filas,
    paginaActual,
    generarPagina,
    maximoPaginas,
    filasParaMostar,

    
}) => {

let filasInicio = [];

if (filas.length > filasParaMostar) {
     filasInicio = filas.slice(0, filasParaMostar);
 }else {
     filasInicio = filas;
 }
    return(

        
        <div className='tabla'>
        <h2>informacion de Comercios</h2>
        <br></br>
        <table>
            <thead>
                <tr>
                    {columnas.map((columna, index)=> (
                        <th key={index} id={columna.id} >
                            {columna.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {filas?.length && filas.map((infoFila, index) => {
                    return(
                        <tr key={index}>
                            {Object.entries(infoFila).map(([key, value], index) => {
                                return key === 'active' ? ( 
                                    <td headers={key} key={index}>
                                        {value ? 'Si' : 'No'}
                                    </td>
                                ) : (
                                    <td headers={key} key={index}>
                                          {value}
                                    </td>
                                 );
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
        

            <div className='divPaginas'>
                <button
                    value='Anterior'
                    onClick={(e) => generarPagina(e.target.value)}
                    >
                    {'<'}
                </button>
                <p >
                    {paginaActual}/{maximoPaginas === 0 ? 1 : maximoPaginas}
                </p>
                <button
                    value='Siguiente'
                    onClick={(e) => generarPagina(e.target.value, maximoPaginas)}
                >
                    {'>'}
                </button>
            </div>
        
        
        
        </div>
    )
} 
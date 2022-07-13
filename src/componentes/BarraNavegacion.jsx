import React  from 'react'


export const BarraBusqueda = ({ buscador, mostrarPor }) => {

    return (

        <div className='divBarra'>

        <div>
            <form onSubmit={(e) => buscador(e)}>
                <input type='text' placeholder='Buscar' className='inputBuscar' ></input>
                <span>Estado:</span>
                <select name="status" id="status">
                    <option value='todos'>Todos</option>
                    <option value='1'>Activo</option>
                    <option value='0'>No Activo</option>
                </select>
                <button type='submit' name='buscar'>Buscar</button>     
            </form>
        </div>

        <div>
            <form onSubmit = {(e) => mostrarPor(e)} name="ordenForm">
                <span>Mostrar por:</span>
                <br></br>
                
                <label>Comercio
                    <input type='radio' value="commerce" name='ordenarPor'/>
                </label>

                <label>Cuit
                    <input type='radio' value="cuit" name='ordenarPor'/>
                </label>

                <span>Tipo de orden</span>

                <select name="ordenaTipo" id='ordenaTipo'>
                    <option value="seleccioneUno">Eliga una opción</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>

                <button type='submit'>Ordenar</button>

            </form>
        </div>


        </div>
    )

}
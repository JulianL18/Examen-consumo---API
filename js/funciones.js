// const url = 'https://api-node2.onrender.com/membresia '
const url = 'https://api-examen-7n3o.onrender.com/donaciones'

const regresarListar = () => {
    window.location.href = 'index.html';
}

const recargarListaDonaciones = () => {
    listarDonaciones();
};

const cogerPrecioDolar = async () => {
    try {
        const response = await fetch('https://www.datos.gov.co/resource/mcec-87by.json');
        if (!response.ok) {
            throw new Error('Error al capturar el dólar');
        }
        const data = await response.json();
        const precioDolar = parseFloat(data[0].valor);
        document.getElementById('precio').value = precioDolar.toFixed(2);
    } catch (error) {
    }
};

document.addEventListener('DOMContentLoaded', cogerPrecioDolar);

const listarDonaciones = async () => {
    let objectId = document.getElementById('contenido')
    let contenido = '';

    await cogerPrecioDolar();

    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((res) => res.json())
        .then(function (data) {
            let listarDonacion = data.msg

            listarDonacion.map(function (donaciones) {
                objetoDonaciones = Object.keys(donaciones).map(key => key + '=' + encodeURIComponent(donaciones[key])).join('&')

                const gramo = donaciones.gramaje;

                if (gramo > 0) {
                    donaciones.gramaje = "(" + gramo + ' Gramos )'
                } else {
                    donaciones.gramaje = ''
                }

                contenido = contenido + '<tr>' +
                    `<td>` + donaciones.idDonacion + `</td>` +
                    `<td>` + donaciones.idDonante + '</td>' +
                    `<td>` + donaciones.tipoDonacion + `</td>` +
                    `<td>` + donaciones.cantidad + " " + donaciones.gramaje + `</td>` +
                    `<td>` + donaciones.tipo + `</td>` +
                    `<td>` + donaciones.fechaDonado + `</td>` +
                    `<td>` + donaciones.fechaRegistroDonacion + `</td>` +
                    `<td>` + donaciones.precioDolar + `</td>` +
                    `<td> <button type="button" onclick="redireccionarEditar('${objetoDonaciones}')" class="btn btn-success">Editar: Dinero</button></td>` +
                    `<td> <button type="button" onclick="redireccionarEditarMedicamento('${objetoDonaciones}')" class="btn btn-primary">Editar: Medicamento</button></td>` +
                    `<td> <button type="button" class="btn btn-danger btnEliminar" onclick="eliminarDonacion('${donaciones.idDonacion}');">Eliminar</button></td>` +
                    `</tr>`
            })
            objectId.innerHTML = contenido
        })
}

const registrarDonacionDinero = () => {

    const idDona = document.getElementById('idDonacion').value
    const idDonan = document.getElementById('idDonante').value
    const tipoDona = document.getElementById('tipoDonacion').value
    const cantida = document.getElementById('cantidad').value
    const type = document.getElementById('tipo').value
    const fechaDona = document.getElementById('fechaDonado').value
    const fechaRegi = document.getElementById('fechaRegistro').value
    const dolar = document.getElementById('precio').value

    if (idDona.length == 0) {
        document.getElementById('idDonacionHelp').innerHTML = 'Dato requerido'

    }
    else if (idDonan.length == 0) {
        document.getElementById('idDonanteHelp').innerHTML = 'Dato requerido'
    }
    else if (tipoDona == 0) {
        document.getElementById('tipoDonaHelp').innerHTML = 'Dato requerido'
    }
    else if (cantida == 0) {
        document.getElementById('cantidadHelp').innerHTML = 'Dato requerido'
    }
    else if (type == 0) {
        document.getElementById('tipoHelp').innerHTML = 'Dato requerido'
    }
    else if (fechaDona == 0) {
        document.getElementById('fechaHelp').innerHTML = 'Dato requerido'
    }
    else if (fechaRegi == 0) {
        document.getElementById('fechaReistroHelp').innerHTML = 'Dato requerido'
    }
    else if (dolar == 0) {
        document.getElementById('dolarHelp').innerHTML = 'Dato requerido'
    }else {
        let Donacion = {
            idDonacion: idDona, //lo primero es la clave, lo segundo es lo que se va a enviar.
            idDonante: idDonan,
            tipoDonacion: tipoDona,
            cantidad: cantida,
            tipo: type,
            fechaDonado: fechaDona,
            fechaRegistroDonacion: fechaRegi,
            precioDolar: dolar
        }
        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(Donacion), //Convertir el objeto a JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())//Obtener respuesta de la petición
            .then(json => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Donación registrada exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    regresarListar();
                }, 2000);
            })

            cogerPrecioDolar()
    }

}

const registrarDonacionMedicamentos = () => {

    const idDona = document.getElementById('idDonacion').value
    const idDonan = document.getElementById('idDonante').value
    const tipoDona = document.getElementById('tipoDonacion').value
    const cantida = document.getElementById('cantidad').value
    const gramo = document.getElementById('gramaje').value
    const medicamento = document.getElementById('tipo').value
    const fechaDona = document.getElementById('fechaDonado').value
    const fechaRegi = document.getElementById('fechaRegistro').value

    if (idDona.length == 0) {
        document.getElementById('idDonacionHelp').innerHTML = 'Dato requerido'

    }
    else if (idDonan.length == 0) {
        document.getElementById('idDonanteHelp').innerHTML = 'Dato requerido'
    }
    else if (tipoDona == 0) {
        document.getElementById('tipoDonaHelp').innerHTML = 'Dato requerido'
    }
    else if (cantida == 0) {
        document.getElementById('cantidadHelp').innerHTML = 'Dato requerido'
    }
    else if (gramo == 0) {
        document.getElementById('gramajeHelp').innerHTML = 'Dato requerido'
    }
    else if (medicamento == 0) {
        document.getElementById('medicamentoHelp').innerHTML = 'Dato requerido'
    }
    else if (fechaDona == 0) {
        document.getElementById('fechaHelp').innerHTML = 'Dato requerido'
    }
    else if (fechaRegi == 0) {
        document.getElementById('fechaReistroHelp').innerHTML = 'Dato requerido'
    } else {
        let Donacion = {
            idDonacion: idDona, //lo primero es la clave, lo segundo es lo que se va a enviar.
            idDonante: idDonan,
            tipoDonacion: tipoDona,
            cantidad: cantida,
            gramaje: gramo,
            tipo: medicamento,
            fechaDonado: fechaDona,
            fechaRegistroDonacion: fechaRegi

        }
        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(Donacion), //Convertir el objeto a JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())//Obtener respuesta de la petición
            .then(json => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Donación registrada exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    regresarListar();
                }, 2000);
            })

    }

}

const eliminarDonacion = async (idDonacion) => {
    try {
        const deleteUrl = `${url}`;  // Solo la ruta base, ya que el ID irá en el cuerpo de la solicitud

        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ idDonacion })  // Incluye el ID en el cuerpo de la solicitud
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar. Código de respuesta: ${response.status}`);
        }

        const json = await response.json();
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Donación eliminada exitosamente",
            showConfirmButton: false,
            timer: 1500
        });

        setTimeout(() => {
            regresarListar();
        }, 2000);

        // Puedes realizar alguna acción adicional después de eliminar, como recargar la lista de donaciones
        // por ejemplo:
        // recargarListaDonaciones();
    } catch (error) {
        console.error('Error al eliminar la donación:', error.message);
        // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario.
        alert('Error al eliminar la donación. Por favor, inténtalo de nuevo más tarde.');
    }
};



const actualizarDonacionDinero = () => {

    const idDona = document.getElementById('idDonacion').value
    const idDonan = document.getElementById('idDonante').value
    const tipoDona = document.getElementById('tipoDonacion').value
    const cantida = document.getElementById('cantidad').value
    const type = document.getElementById('tipo').value
    const fechaDona = document.getElementById('fechaDonado').value
    const fechaRegi = document.getElementById('fechaRegistro').value
    const dolar = document.getElementById('precioDolar').value

    if (idDona.length == 0) {
        document.getElementById('idDonacionHelp').innerHTML = 'Dato requerido'

    }
    else if (idDonan.length == 0) {
        document.getElementById('idDonanteHelp').innerHTML = 'Dato requerido'
    }
    else if (tipoDona == 0) {
        document.getElementById('tipoDonaHelp').innerHTML = 'Dato requerido'
    }
    else if (cantida == 0) {
        document.getElementById('cantidadHelp').innerHTML = 'Dato requerido'
    }
    else if (type == 0) {
        document.getElementById('tipoHelp').innerHTML = 'Dato requerido'
    }
    else if (fechaDona == 0) {
        document.getElementById('fechaHelp').innerHTML = 'Dato requerido'
    }
    else if (fechaRegi == 0) {
        document.getElementById('fechaReistroHelp').innerHTML = 'Dato requerido'
    }
    else if (dolar == 0) {
        document.getElementById('dolarHelp').innerHTML = 'Dato requerido'
    }else {
        let Donacion = {
            idDonacion: idDona, //lo primero es la clave, lo segundo es lo que se va a enviar.
            idDonante: idDonan,
            tipoDonacion: tipoDona,
            cantidad: cantida,
            tipo: type,
            fechaDonado: fechaDona,
            fechaRegistroDonacion: fechaRegi,
            precioDolar: dolar
        }
        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(Donacion), //Convertir el objeto a JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())//Obtener respuesta de la petición
            .then(json => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Donación actualizada exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    regresarListar();
                }, 2000);
                //Imprimir el mensaje de la transacción
            })
            cogerPrecioDolar();
    }

}

const redireccionarEditar = (donacion) => {
    document.location.href = "editarDonacionDinero.html?donacion" + donacion
}

const editarDonacionDinero = () => {
    var urlparams = new URLSearchParams(window.location.search);

    document.getElementById('idDonacion').value = urlparams.get('idDonacion');
    document.getElementById('idDonante').value = urlparams.get('idDonante');
    document.getElementById('tipoDonacion').value = urlparams.get('tipoDonacion');
    document.getElementById('cantidad').value = urlparams.get('cantidad');
    document.getElementById('tipo').value = urlparams.get('tipo');
    document.getElementById('fechaDonado').value = urlparams.get('fechaDonado');
    document.getElementById('fechaRegistro').value = urlparams.get('fechaRegistro');
    document.getElementById('precioDolar').value = urlparams.get('precioDolar');
}

const actualizarDonacionMedicamento = () => {

    const idDona = document.getElementById('idDonacion').value
    const idDonan = document.getElementById('idDonante').value
    const tipoDona = document.getElementById('tipoDonacion').value
    const cantida = document.getElementById('cantidad').value
    const gramo = document.getElementById('gramaje').value
    const medicamento = document.getElementById('tipo').value
    const fechaDona = document.getElementById('fechaDonado').value
    const fechaRegi = document.getElementById('fechaRegistro').value

    if (idDona.length == 0) {
        document.getElementById('idDonacionHelp').innerHTML = 'Dato requerido'

    }
    else if (idDonan.length == 0) {
        document.getElementById('idDonanteHelp').innerHTML = 'Dato requerido'
    }
    else if (tipoDona == 0) {
        document.getElementById('tipoDonaHelp').innerHTML = 'Dato requerido'
    }
    else if (cantida == 0) {
        document.getElementById('cantidadHelp').innerHTML = 'Dato requerido'
    }
    else if (gramo == 0) {
        document.getElementById('gramajeHelp').innerHTML = 'Dato requerido'
    }
    else if (medicamento == 0) {
        document.getElementById('medicamentoHelp').innerHTML = 'Dato requerido'
    }
    else if (fechaDona == 0) {
        document.getElementById('fechaHelp').innerHTML = 'Dato requerido'
    }
    else if (fechaRegi == 0) {
        document.getElementById('fechaReistroHelp').innerHTML = 'Dato requerido'
    } else {
        let Donacion = {
            idDonacion: idDona, //lo primero es la clave, lo segundo es lo que se va a enviar.
            idDonante: idDonan,
            tipoDonacion: tipoDona,
            cantidad: cantida,
            gramaje: gramo,
            tipo: medicamento,
            fechaDonado: fechaDona,
            fechaRegistroDonacion: fechaRegi

        }

        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(Donacion), //Convertir el objeto a JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())//Obtener respuesta de la petición
            .then(json => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Donación actualizada exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    regresarListar();
                }, 2000);
                //Imprimir el mensaje de la transacción
            })
    }

}

const redireccionarEditarMedicamento = (donacion) => {
    document.location.href = "editarDonacionesMedicamentos.html?donacion" + donacion
}

const editarDonacionMedicamento = () => {
    var urlparams = new URLSearchParams(window.location.search);

    document.getElementById('idDonacion').value = urlparams.get('idDonacion');
    document.getElementById('idDonante').value = urlparams.get('idDonante');
    document.getElementById('tipoDonacion').value = urlparams.get('tipoDonacion');
    document.getElementById('cantidad').value = urlparams.get('cantidad');
    document.getElementById('gramaje').value = urlparams.get('gramaje');
    document.getElementById('tipo').value = urlparams.get('tipo');
    document.getElementById('fechaDonado').value = urlparams.get('fechaDonado');
    document.getElementById('fechaRegistro').value = urlparams.get('fechaRegistro');
}



if (document.querySelector('#btnRegistrar')) { //Si objeto exitste
    document.querySelector('#btnRegistrar').addEventListener('click', registrarDonacionDinero)
}

if (document.querySelector('#btnActualizar')) {//Si objeto existe
    document.querySelector('#btnActualizar').addEventListener('click', actualizarDonacionDinero)
}

if (document.querySelector('#btnRegistrarMedicamento')) { //Si objeto exitste
    document.querySelector('#btnRegistrarMedicamento').addEventListener('click', registrarDonacionMedicamentos)
}

if (document.querySelector('#btnActualizarMedicamento')) {//Si objeto existe
    document.querySelector('#btnActualizarMedicamento').addEventListener('click', actualizarDonacionMedicamento)
}

if (document.querySelector('#btnEliminar')) {//Si objeto existe
    document.querySelector('#btnEliminar')
        .addEventListener('click', eliminarDonacion)

}
let loaded = e => {
    cargartabla()
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        // calls de no llenado
        //if{}


        const nombres = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const otro = document.getElementById('otro').value;
        const motivo = document.getElementById("motivos").value;

        const datos = {
                nombres:nombres,
                email:email,
                otro:otro,
                motivo:motivo
        };



        console.log(datos)
        fetch('https://proyecto-1-1387c-default-rtdb.firebaseio.com/collection.json', {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(respuesta => respuesta.json())
            .then(datos => {
                console.log(datos);

            })
            .catch(error => console.error(error));
    });
}

async function cargartabla() {
    let response = await fetch('https://proyecto-1-1387c-default-rtdb.firebaseio.com/collection.json');

    try {
        let datos = await response.json();
        let tabla = document.getElementById("tabla")


        console.log(datos)
        // new map
        // for key in datos
        //let conteo 

        // otro for para crear las filas din fo r(let key of map.keys())
        //template = tablebody.innerHTML += template

        //varb total map.get(key)
        //table. innerhtml +=
        // <tr>
        // vienen los td
        //termina funcion

    } catch (error) {
        console.log(error)
    }

}

window.addEventListener('DOMContentLoaded', loaded);
let loaded = e => {
    cargartabla();
    const formulario = document.getElementById('contact-form');

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombres = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const otro = document.getElementById('other').value.trim();
        const motivo = document.getElementById("motivos").value;

        const datos = {
            nombres: nombres,
            email: email,
            otro: otro,
            motivo: motivo
        };

        if (!nombres || !email || !motivo) {
            mostrarMensaje('Data fields are missing', 'error');
            return;
        }


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
            mostrarMensaje('The information was successfully uploaded.', 'success');
            cargartabla();
        })
        .catch(error => {
            console.error(error);
            mostrarMensaje('error in', 'error');
        });
    });
}

function mostrarMensaje(mensaje, tipo) {
    const contenedorMensaje = document.createElement('div');
    contenedorMensaje.className = `alert ${tipo === 'error' ? 'alert-danger' : 'alert-success'}`;
    contenedorMensaje.textContent = mensaje;

    const formulario = document.getElementById('contact-form');
    formulario.insertBefore(contenedorMensaje, formulario.firstChild);

    setTimeout(() => {
        contenedorMensaje.remove();
    }, 3000);
}

async function cargartabla() {
    let response = await fetch('https://proyecto-1-1387c-default-rtdb.firebaseio.com/collection.json');

    try {
        let datos = await response.json();
        let tabla = document.getElementById("tablebody");
        tabla.innerHTML = '';

        let conteo = {
            'm1': 0,
            'm2': 0,
            'm3': 0
        };

        for (let key in datos) {
            if (datos.hasOwnProperty(key)) {
                conteo[datos[key].motivo]++;
            }
        }

        let rows = [
            { motivo: 'Refund', count: conteo['m1'] },
            { motivo: 'Additional Information', count: conteo['m2'] },
            { motivo: 'Post-Sale Support', count: conteo['m3'] }
        ];

        rows.forEach(row => {
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${row.motivo}</td><td>${row.count}</td>`;
            tabla.appendChild(tr);
        });

    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('DOMContentLoaded', loaded);
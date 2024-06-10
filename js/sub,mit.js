const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombres = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;
    const datos = {
        nombres: name,
        email: email,
        contraseña: contraseña
    };
    fetch('https://proyecto-1-1387c-default-rtdb.firebaseio.com/collection.json', {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos); // Imprimir la respuesta del
            servidor
        })
        .catch(error => console.error(error));
});
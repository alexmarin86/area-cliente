const inputBuscar = document.querySelector('#buscar')
const inputCantidad = document.querySelector('#cantidad')
const botonBuscar = document.querySelector('.enviar')

const obtenerDatos = async () => {
	try {
		const response = await fetch('./datos.json')
		return await response.json()
	} catch (error) {
		console.log(error)
	}
}

const filtrarDatos = async (busqueda) => {
	const datos = await obtenerDatos()
	const resultadoBusqueda = datos.filter((art) => {
		return art.refArt == busqueda
	})
	return resultadoBusqueda
}
// console.log(filtrarDatos('0c08A'))

botonBuscar.addEventListener('click', async (e) => {
	e.preventDefault()
	const busqueda = inputBuscar.value
	console.log(filtrarDatos(busqueda))
})

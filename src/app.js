const inputBuscar = document.querySelector('#buscar')
const inputCantidad = document.querySelector('#cantidad')
const botonBuscar = document.querySelector('.enviar')
const divAlerta = document.querySelector('.alerta')
const elemTabla = document.querySelector('table')

const obtenerDatos = async () => {
	try {
		const response = await fetch('./datos.json', { cache: 'no-store' })
		return await response.json()
	} catch (error) {
		console.log(error)
	}
}

const filtrarDatos = async (busqueda, cantidad) => {
	const datos = await obtenerDatos()
	divAlerta.textContent = ''
	elemTabla.innerHTML = ''
	const resultadoBusqueda = datos.find((art) => {
		return art.refArt == busqueda
	})

	if (!resultadoBusqueda) {
		divAlerta.textContent =
			'No se han encontrado resultados. Introduzca otra referencia.'
		return
	}
	if (!cantidad || cantidad < 1) {
		divAlerta.textContent = 'Debe introducir una cantidad.'
		return
	}
	if (cantidad > 20) {
		divAlerta.innerHTML = `Consulte con un comercial para consultas superiores a 20 unidades. <a href="tel:+34963267365" class="text-zinc-300 underline">963 267 365</a>`
		return
	}

	const { refArt, codigoEan, nombreArt, stock, prodTransito } =
		resultadoBusqueda
	elemTabla.innerHTML = `
		<tr>
				<th class="border-2 p-1">Referencia Art</th>
				<th class="border-2 p-1">Código EAN</th>
				<th class="border-2 p-1">Nombre Art</th>
				<th class="border-2 p-1">Stock</th>
				<th class="border-2 p-1">Producción y tránsito</th>
			</tr>
			<tr>
				<td class="border-2 p-1">${refArt}</td>
				<td class="border-2 p-1">${codigoEan}</td>
				<td class="border-2 p-1">${nombreArt}</td>
				<td class="border-2 p-1 resalte">${hayStock(stock, cantidad)}</td>
				<td class="border-2 p-1">${prodTransito}</td>
			</tr>
	`
	const celdaResalte = document.querySelector('.resalte')
	if (celdaResalte.textContent == 'Disponible') {
		celdaResalte.style.backgroundColor = 'lime'
		return
	}
	celdaResalte.style.backgroundColor = 'tomato'
	console.log(resultadoBusqueda)
}
function hayStock(numero, cantidad) {
	if (numero - cantidad >= 0) {
		return 'Disponible'
	}
	return 'Agotado'
}
// console.log(filtrarDatos('0c08A'))

botonBuscar.addEventListener('click', async (e) => {
	e.preventDefault()
	const busqueda = inputBuscar.value
	const cantidad = inputCantidad.value
	filtrarDatos(busqueda, cantidad)
})

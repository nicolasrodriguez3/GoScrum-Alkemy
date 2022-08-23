import { Link } from "react-router-dom"

const Donate = () => {
	return (
		<main className="centered">
			<h1>Doná a GoScrum</h1>
			<a href="https://mpago.la/" target="_blank" rel="noreferrer" className="btn-primary">Donar</a>
			<Link to="/" className="secondary">Volver al inicio</Link>
		</main>
	)
}

export default Donate

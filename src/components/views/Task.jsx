import useResize from "../../hooks/useResize"
import "../../styles/task.styles.css"

function Task(props) {
	const { isPhone } = useResize()

	const limitString = string => {
		if (string.length > 170) {
			return {string: string.substring(0, 167) + "...", addButton: true}
		}
		return {string: string, addButton: false}
	}

	return (
		<>
		{/* Agregar header */}
			<main id="tasks">
				<section className="wrapper-list">
					<div className="list-header">
						<h2>Mis tareas</h2>
					</div>
					{ isPhone ? (
					<div className="list phone">
						<div className="card">
							<div className="close">x</div>
							<h3>Tarea 1</h3>
							<h6>24/01/2022 10:40</h6>
							<h5>Nico R</h5>
							<button>Nueva</button>
							<button>Alta</button>
							<p>Descripcion</p>
						</div>
						<div className="card">
							<div className="close">x</div>
							<h3>Tarea 1</h3>
							<h6>24/01/2022 10:40</h6>
							<h5>Nico R</h5>
							<button>Nueva</button>
							<button>Alta</button>
							<p>Descripcion</p>
						</div>
						<div className="card">
							<div className="close">x</div>
							<h3>Tarea 1</h3>
							<h6>24/01/2022 10:40</h6>
							<h5>Nico R</h5>
							<button>Nueva</button>
							<button>Alta</button>
							<p>Descripcion</p>
						</div>
						<div className="card">
							<div className="close">x</div>
							<h3>Tarea 1</h3>
							<h6>24/01/2022 10:40</h6>
							<h5>Nico R</h5>
							<button>Nueva</button>
							<button>Alta</button>
							<p>Descripcion</p>
						</div>
					</div>
					) : (
						<div className="list">
						<div className="card">
							<div className="close">x</div>
							<h3>Tarea 1</h3>
							<h6>24/01/2022 10:40</h6>
							<h5>Nico R</h5>
							<button>Nueva</button>
							<button>Alta</button>
							<p>Descripcion</p>
						</div>
						<div className="card">
							<div className="close">x</div>
							<h3>Tarea 1</h3>
							<h6>24/01/2022 10:40</h6>
							<h5>Nico R</h5>
							<button>Nueva</button>
							<button>Alta</button>
							<p>Descripcion</p>
						</div>
						<div className="card">
							<div className="close">x</div>
							<h3>Tarea 1</h3>
							<h6>24/01/2022 10:40</h6>
							<h5>Nico R</h5>
							<button>Nueva</button>
							<button>Alta</button>
							<p>Descripcion</p>
						</div>
						<div className="card">
							<div className="close">x</div>
							<h3>Tarea 1</h3>
							<h6>24/01/2022 10:40</h6>
							<h5>Nico R</h5>
							<button>Nueva</button>
							<button>Alta</button>
							<p>Descripcion</p>
						</div>
					</div>
					)}
				</section>
			</main>
		</>
	)
}

export default Task

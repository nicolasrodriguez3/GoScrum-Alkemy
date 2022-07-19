import useResize from "../../hooks/useResize"
import Header from "../Header/Header"
import Card from "../Card/Card"
import TaskForm from "../TaskForm/TaskForm"
import { cardsData } from "./data"

import "../../styles/task.styles.css"

function Task(props) {
	const { isPhone } = useResize()

	const renderCards = () => {
		return cardsData.map((card) => <Card key={card.id} data={card} />)
	}

	return (
		<>
			<Header />
			<main id="tasks">
				<TaskForm />
				<section className="wrapper-list">
					<div className="list-header">
						<h2>Mis tareas</h2>
					</div>
					{isPhone ? (
						renderCards()
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
						</div>
					)}
				</section>
			</main>
		</>
	)
}

export default Task

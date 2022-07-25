import { useState, useEffect } from "react"
import useResize from "../../hooks/useResize"
import Header from "../Header/Header"
import Card from "../Card/Card"
import TaskForm from "../TaskForm/TaskForm"

import "../../styles/task.styles.css"

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

function Task(props) {
	const [list, setList] = useState([])
	const { isPhone } = useResize()

	useEffect(() => {
		fetch(`${API_ENDPOINT}task`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setList(data.result))
	}, [])

	const renderAllCards = () => {
		return list?.map((card) => <Card key={card._id} data={card} />)
	}
	const renderNewCards = () => {
		return list
			?.filter((data) => data.status === "NEW")
			.map((card) => <Card key={card._id} data={card} />)
	}
	const renderInProgressCards = () => {
		return list
			?.filter((data) => data.status === "IN PROGRESS")
			.map((card) => <Card key={card._id} data={card} />)
	}
	const renderFinishedCards = () => {
		return list
			?.filter((data) => data.status === "FINISHED")
			.map((card) => <Card key={card._id} data={card} />)
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
						renderAllCards()
					) : (
						<>
							<div className="list">
								<h4>Nuevas</h4>
								{renderNewCards()}
							</div>
							<div className="list">
								<h4>En proceso</h4>
								{renderInProgressCards()}
							</div>
							<div className="list">
								<h4>Finalizadas</h4>
								{renderFinishedCards()}
							</div>
						</>
					)}
				</section>
			</main>
		</>
	)
}

export default Task

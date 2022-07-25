import { useState, useEffect } from "react"
import useResize from "../../hooks/useResize"
import Header from "../header/Header"
import Card from "../Card/Card"
import TaskForm from "../TaskForm/TaskForm"

import "../../styles/task.styles.css"
import { Skeleton } from "@mui/material"

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

function Task() {
	const [list, setList] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

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
			.then((data) => {
				setList(data.result)
				setIsLoading(false)
			})
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
						isLoading ? (
							<>
								<Skeleton width={300} height={40} />
								<Skeleton width={200} height={100} />
							</>
						) : list?.length === 0 ? (
							<div>No hay tareas creadas</div>
						) : (
							<div className="list phone">{renderAllCards()}</div>
						)
					) : isLoading ? (
						<div>
							<Skeleton width={300} height={40} />
							<Skeleton width={200} height={150} />
						</div>
					) : (
						<div className="list-group">
							{list?.length === 0 ? (
								<div>No hay tareas creadas</div>
							) : (
								<div>
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
								</div>
							)}
						</div>
					)}
				</section>
			</main>
		</>
	)
}

export default Task

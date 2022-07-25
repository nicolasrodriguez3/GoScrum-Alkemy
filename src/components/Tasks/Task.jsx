import { useState, useEffect } from "react"
import useResize from "../../hooks/useResize"
import Header from "../header/Header"
import Card from "../Card/Card"
import TaskForm from "../TaskForm/TaskForm"
import { Skeleton, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import debounce from "lodash/debounce"

import "../../styles/task.styles.css"

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

function Task() {
	const [list, setList] = useState(null)
	const [renderList, setRenderList] = useState(null)
	const [taskFromWho, setTaskFromWho] = useState("ALL")
	const [search, setSearch] = useState("")
	const [isLoading, setIsLoading] = useState(true)

	const { isPhone } = useResize()

	useEffect(() => {
		setIsLoading(true)
		const tasksOwner = taskFromWho === "ME" ? "/me" : ""
		fetch(`${API_ENDPOINT}task${tasksOwner}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setList(data.result)
				setRenderList(data.result)
				setIsLoading(false)
			})
	}, [taskFromWho])

	useEffect(() => {
		if(search){
			const filteredList = list.filter(task => task.title.toLowerCase().includes(search.toLowerCase()))
			setRenderList(filteredList)
		}
		else{
			setRenderList(list)
		}
	}, [search])

	const renderAllCards = () => {
		return renderList?.map((card) => <Card key={card._id} data={card} />)
	}
	const renderColumnCards = ( text ) => {
		return renderList
			?.filter((data) => data.status === text)
			.map((card) => <Card key={card._id} data={card} />)
	}

	const handleChangeImportance = (e) => {
		if (e.target.value === "ALL") setRenderList(list)
		else setRenderList(list?.filter((data) => data.importance === e.target.value))
	}

	const handleSearch = debounce((e) => {
		setSearch(e?.target?.value)
	}, 1000)

	return (
		<>
			<Header />
			<main id="tasks">
				<TaskForm />
				<section className="wrapper-list">
					<div className="list-header">
						<h2>Mis tareas</h2>
					</div>
					<div className="filters">
						<div>Filtrar:</div>
						<FormControl>
							<RadioGroup
								row
								aria-labelledby="demo-row-radio-buttons-group-label"
								onChange={(e) => {
									setTaskFromWho(e.target.value)
								}}>
								<FormControlLabel value="ALL" control={<Radio />} label="Todas" />
								<FormControlLabel value="ME" control={<Radio />} label="Mis tareas" />
							</RadioGroup>
						</FormControl>
						<div className="search">
							<input
								type="search"
								placeholder="Buscar por título..."
								onChange={handleSearch}
							/>
						</div>
						<div>
							<label htmlFor="importance">Prioridad</label>
							<select name="importance" id="importance" onChange={handleChangeImportance}>
								<option value="ALL">Todas</option>
								<option value="HIGH">Alta</option>
								<option value="MEDIUM">Media</option>
								<option value="LOW">Baja</option>
							</select>
						</div>
					</div>
					{isPhone ? (
						isLoading ? (
							<>
								<Skeleton width={300} height={40} />
								<Skeleton width={200} height={100} />
							</>
						) : renderList?.length === 0 ? (
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
							{renderList?.length === 0 ? (
								<div>No hay tareas creadas</div>
							) : (
								<>
									<div className="list">
										<h4>Nuevas</h4>
										{renderColumnCards("NEW")}
									</div>
									<div className="list">
										<h4>En proceso</h4>
										{renderColumnCards("IN PROGRESS")}
									</div>
									<div className="list">
										<h4>Finalizadas</h4>
										{renderColumnCards("FINISHED")}
									</div>
								</>
							)}
						</div>
					)}
				</section>
			</main>
		</>
	)
}

export default Task

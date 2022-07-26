import { useState, useEffect } from "react"
import useResize from "../../hooks/useResize"
import Header from "../header/Header"
import Card from "../Card/Card"
import TaskForm from "../TaskForm/TaskForm"
import { Skeleton, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import debounce from "lodash/debounce"
import { getTasks } from "../../store/actions/taskAction"

import "../../styles/task.styles.css"

function Task() {
	const [list, setList] = useState(null)
	const [renderList, setRenderList] = useState(null)
	const [taskFromWho, setTaskFromWho] = useState("ALL")
	const [search, setSearch] = useState("")

	const { isPhone } = useResize()

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getTasks(taskFromWho === "ME" ? "/me" : ""))
	}, [taskFromWho])

	const { loading, error, tasks } = useSelector((state) => state.taskReducer)

	useEffect(() => {
		if (tasks?.length) {
			setList(tasks)
			setRenderList(tasks)
		}
	}, [tasks])

	useEffect(() => {
		if (search) {
			const filteredList = list.filter((task) =>
				task.title.toLowerCase().includes(search.toLowerCase())
			)
			setRenderList(filteredList)
		} else {
			setRenderList(list)
		}
	}, [search])

	if(error){
		return <div>Ocurrio un error</div>
	}

	const renderAllCards = () => {
		return renderList?.map((card) => <Card key={card._id} data={card} />)
	}
	const renderColumnCards = (text) => {
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
							<input type="search" placeholder="Buscar por título..." onChange={handleSearch} />
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
						loading ? (
							<>
								<Skeleton width={300} height={40} />
								<Skeleton width={200} height={100} />
							</>
						) : renderList?.length === 0 ? (
							<div>No hay tareas creadas</div>
						) : (
							<div className="list phone">{renderAllCards()}</div>
						)
					) : loading ? (
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

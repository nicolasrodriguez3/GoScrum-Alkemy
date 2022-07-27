import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import "./Header.styles.css"

export default function Header() {
	const navigate = useNavigate()

	const { tasks } = useSelector((state) => state.taskReducer)

	const handleLogout = () => {
		localStorage.removeItem("token")
		localStorage.removeItem("userName")
		navigate("/login", { replace: true })
	}

	return (
		<header>
			<span>GoScrum</span>
			<div className="wrapper-right-header">
				<button onClick={() => navigate("/donate", { replace: true })}>Doná a GoScrum</button>
				<span>Tareas creadas: {tasks?.length}</span>
				<span>{localStorage.getItem("userName")}</span>
				<button onClick={handleLogout}>Cerrar sesión</button>
			</div>
		</header>
	)
}

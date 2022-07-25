import React from "react"
import { useNavigate } from "react-router-dom"
import "./Header.styles.css"

export default function Header() {
	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem("token")
		localStorage.removeItem("userName")
		navigate("/login", { replace: true })
	}

	return (
		<header>
			<span>GoScrum</span>
			<div className="wrapper-right-header">
				<span>{localStorage.getItem("userName")}</span>
				<button onClick={handleLogout}>Cerrar sesión</button>
			</div>
		</header>
	)
}

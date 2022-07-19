import React from "react"
import { useNavigate } from "react-router-dom"
import "./Header.styles.css"

export default function Header() {
	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem("token")
		navigate("/login", { replace: true })
	}

	return (
		<header>
			<span>GoScrum</span>
			<button onClick={handleLogout}>x</button>
		</header>
	)
}

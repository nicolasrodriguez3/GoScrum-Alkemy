import React from "react"
import { useParams } from "react-router-dom"

const Registered = () => {
	const { teamID } = useParams()
	return <div>El ID de tu team es {teamID}</div>
}

export default Registered

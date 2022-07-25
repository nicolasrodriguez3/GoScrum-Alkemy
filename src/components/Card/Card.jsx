function Card({ data: { title, createdAt, user, description, status, importance } }) {
	const limitString = string => {
		if (string.length > 170) {
			return {string: string.substring(0, 167) + "...", addButton: true}
		}
		return {string: string, addButton: false}
	}

	return (
		<div className="card">
			<button className="close">x</button>
			<h3>{title}</h3>
			<h6>{new Date(createdAt).toLocaleString()}</h6>
			<h5>{user.userName}</h5>
			<button>{status.toLowerCase()}</button>
			<button>{importance.toLowerCase()}</button>
			<p>{limitString(description).string}</p>
		</div>
	)
}

export default Card

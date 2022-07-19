function Card({ data: { title, datetime, creator, description, type, priority } }) {
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
			<h6>{datetime}</h6>
			<h5>{creator}</h5>
			<button>{type}</button>
			<button>{priority}</button>
			<p>{limitString(description).string}</p>
		</div>
	)
}

export default Card

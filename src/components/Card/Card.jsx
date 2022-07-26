import { useState } from "react"

function Card({
	deleteCard,
	editCardStatus,
	data,
	data: { _id, title, createdAt, user, description, status, importance },
}) {
	const [showMore, setShowMore] = useState(false)
	const limitString = (string) => {
		if (string.length > 170) {
			return { string: string.substring(0, 167) + "...", addButton: true }
		}
		return { string: string, addButton: false }
	}

	return (
		<div className="card">
			<button
				className="close"
				onClick={() => {
					deleteCard(_id)
				}}>
				x
			</button>
			<h3>{title}</h3>
			<h6>{new Date(createdAt).toLocaleString() + " hs."}</h6>
			<h5>{user.userName}</h5>
			<button className={status.toLowerCase()} onClick={()=> editCardStatus(data)}>{status.toLowerCase()}</button>
			<button className={importance.toLowerCase()}>{importance.toLowerCase()}</button>
			<p>{!showMore ? limitString(description).string : description}</p>
			{limitString(description).addButton && (
				<button
					className="more"
					onClick={() => {
						setShowMore(!showMore)
					}}>
					{!showMore ? "Ver más" : "Ver menos"}
				</button>
			)}
		</div>
	)
}

export default Card

import { TASK_REQUEST, TASK_SUCCESS, TASK_FAILURE } from "../types"

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

export const taskRequest = () => ({
	type: TASK_REQUEST
})
export const taskSuccess = (tasks) => ({
	type: TASK_SUCCESS,
	payload: tasks
})
export const taskFailure = (err) => ({
	type: TASK_FAILURE,
	payload: err
})

export const getTasks = (path) => dispatch => {
	dispatch(taskRequest())
	fetch(`${API_ENDPOINT}task/${path}` , {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`
		}
	})
		.then(res => res.json())
		.then(data => dispatch(taskSuccess(data.result)))
		.catch(err => dispatch(taskFailure(err)))
}

export const deleteTask = (id) => dispatch => {
	dispatch(taskRequest())
	fetch(`${API_ENDPOINT}task/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`
		}
	})
		.then(res => res.json())
		.then(() => dispatch(getTasks("")))
		.catch(err => dispatch(taskFailure(err)))
}

export const editCardStatus = data => dispatch => {
	const statusArr = ["NEW", "IN PROGRESS", "FINISHED"]
	const newStatusIndex = statusArr.indexOf(data.status) > 1 ? 0 : statusArr.indexOf(data.status) + 1
	
	dispatch(taskRequest())
	fetch(`${API_ENDPOINT}task/${data._id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`
		},
		body: JSON.stringify({
			task: {
				title: data.title,
				description: data.description,
				importance: data.importance,
				status: statusArr[newStatusIndex],
			}
		})
	})
		.then(res => res.json())
		.then(() => dispatch(getTasks("")))
		.catch(err => dispatch(taskFailure(err)))
}
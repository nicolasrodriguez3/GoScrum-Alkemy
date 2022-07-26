import { TASK_FAILURE, TASK_REQUEST, TASK_SUCCESS } from "../types"

const inicialState = {
	loading: false,
	tasks: [],
	error: "",
}

export const taskReducer = (state = inicialState, action) => {
	switch (action.type) {
		case TASK_REQUEST:
			return {
				...state,
				loading: true,
			}
		case TASK_SUCCESS:
			return {
				loading: false,
				tasks: action.payload,
				error: "",
			}
		case TASK_FAILURE:
			return {
				loading: false,
				error: action.payload,
				tasks: [],
			}
		default:
			return state
	}
}

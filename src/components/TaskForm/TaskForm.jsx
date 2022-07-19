import { useFormik } from "formik"
import "../../styles/taskForm.styles.css"

export default function TaskForm() {
	const initialValues = {
		title: "",
		status: "",
		priority: "",
		description: "",
	}
	const onSubmit = (values) => {
		console.log(values)
	}
	const formik = useFormik({
		initialValues,
		onSubmit,
	})
	const { handleSubmit, handleChange } = formik
	
	return (
		<section className="task-form">
			<h2>Crear tarea</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<div>
						<input type="text" 
						name="title" placeholder="Título" onChange={handleChange} />
					</div>
					<div>
						<select name="status" onChange={handleChange} >
							<option value="">Seleccione un estado</option>
							<option value="new">Nueva</option>
							<option value="inProcess">En proceso</option>
							<option value="finished">Terminada</option>
						</select>
					</div>
					<div>
						<select name="priority" onChange={handleChange}>
							<option value="">Seleccione la prioridad</option>
							<option value="low">Baja</option>
							<option value="normal" defaultValue>Normal</option>
							<option value="high">Alta</option>
						</select>
					</div>
				</div>
					<div>
						<textarea name="description" id="" cols="30" rows="10" onChange={handleChange} placeholder="Descripción"></textarea>
					</div>
				<button type="submit">Crear</button>
			</form>
		</section>
	)
}

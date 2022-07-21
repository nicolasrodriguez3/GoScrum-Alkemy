import { useFormik } from "formik"
import * as Yup from "yup"
import "../../styles/taskForm.styles.css"

export default function TaskForm() {
	const initialValues = {
		title: "",
		status: "",
		priority: "",
		description: "",
	}
	const validationSchema = Yup.object().shape({
		title: Yup.string().min(6, "Ingrese al menos 6 caracteres").required("El titulo es requerido"),
		status: Yup.string().required("El estado es requerido"),
		priority: Yup.string().required("La prioridad es requerida"),
	})

	const onSubmit = (values) => {
		console.log(values)
	}
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	})
	const { handleSubmit, handleChange, handleBlur, errors, touched } = formik

	return (
		<section className="task-form">
			<h2>Crear tarea</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<div>
						<input
							className={errors.title && touched.title ? "error" : ""}
							type="text"
							name="title"
							placeholder="Título"
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						{errors.title && touched.title && <p className="error-text">{errors.title}</p>}
					</div>
					<div>
						<select className={errors.status && touched.status ? "error" : ""} name="status" onChange={handleChange} onBlur={handleBlur}>
							<option value="">Seleccione un estado</option>
							<option value="new">Nueva</option>
							<option value="inProcess">En proceso</option>
							<option value="finished">Terminada</option>
						</select>
						{errors.status && touched.status && <p className="error-text">{errors.status}</p>}
					</div>
					<div>
						<select className={errors.priority && touched.priority ? "error" : ""} name="priority" onChange={handleChange} onBlur={handleBlur}>
							<option value="">Seleccione la prioridad</option>
							<option value="low">Baja</option>
							<option value="normal" defaultValue>
								Normal
							</option>
							<option value="high">Alta</option>
						</select>
						{errors.priority && touched.priority && <p className="error-text">{errors.priority}</p>}
					</div>
				</div>
				<div>
					<textarea
						name="description"
						id=""
						cols="30"
						rows="10"
						onChange={handleChange}
						placeholder="Descripción"></textarea>
				</div>
				<button type="submit">Crear</button>
			</form>
		</section>
	)
}

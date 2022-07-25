import { useFormik } from "formik"
import { toast, ToastContainer } from "react-toastify"
import * as Yup from "yup"

import "../../styles/taskForm.styles.css"
import 'react-toastify/dist/ReactToastify.css';

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

export default function TaskForm() {
	const initialValues = {
		title: "",
		status: "",
		importance: "",
		description: "",
	}
	const length = "* La cantidad mínima de caracteres es 6";
  const required = "* Campo obligatorio";

	const validationSchema = Yup.object().shape({
		title: Yup.string().min(6, length).required(required),
		status: Yup.string().required(required),
		importance: Yup.string().required(required),
		description: Yup.string().required(required),
	})

	const onSubmit = () => {
		fetch(`${API_ENDPOINT}task`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({ task: values }),
		})
			.then((res) => res.json())
			.then((data) => {
				resetForm()
				toast("Tarea creada!")
			})
	}
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	})
	const { handleSubmit, handleChange, handleBlur, errors, touched, values, resetForm } = formik

	return (
		<>
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
							value={values.title}
						/>
						{errors.title && touched.title && <p className="error-text">{errors.title}</p>}
					</div>
					<div>
						<select
							className={errors.status && touched.status ? "error" : ""}
							name="status"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.status}>
							<option value="">Seleccione un estado</option>
							<option value="NEW">Nueva</option>
							<option value="IN PROGRESS">En proceso</option>
							<option value="FINISHED">Terminada</option>
						</select>
						{errors.status && touched.status && <p className="error-text">{errors.status}</p>}
					</div>
					<div>
						<select
							className={errors.importance && touched.importance ? "error" : ""}
							name="importance"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.importance}>
							<option value="">Seleccione la prioridad</option>
							<option value="LOG">Baja</option>
							<option value="MEDIUM" defaultValue>
								Normal
							</option>
							<option value="HIGH">Alta</option>
						</select>
						{errors.importance && touched.importance && (
							<p className="error-text">{errors.importance}</p>
						)}
					</div>
				</div>
				<div>
					<textarea
						value={values.description}
						className={errors.description && touched.description ? "error" : ""}
						name="description"
						id=""
						cols="30"
						rows="10"
						onChange={handleChange}
						placeholder="Descripción"></textarea>
					{errors.description && touched.description && (
						<p className="error-text">{errors.description}</p>
					)}
				</div>
				<button type="submit">Crear</button>
			</form>
		</section>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			</>
	)
}

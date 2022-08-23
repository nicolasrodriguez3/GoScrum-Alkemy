import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from "yup"

import "../../../styles/auth.styles.css"
import { swal } from "../../../utils/swal"

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

const Login = () => {
	const navigate = useNavigate()

	const initialValues = {
		userName: "",
		password: "",
	}

	const validationSchema = Yup.object().shape({
		userName: Yup.string().required("El nombre de usuario es requerido"),
		password: Yup.string()
			.min(4, "La contraseña debe tener al menos 4 caracteres")
			.required("La contraseña es requerida"),
	})

	const onSubmit = () => {
		const { userName, password } = values

		fetch(`${API_ENDPOINT}auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userName,
				password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status_code === 200) {
					localStorage.setItem("token", data.result.token)
					localStorage.setItem("userName", data.result.user.userName)
					navigate("/", { replace: true })
				} else {
					swal("Credenciales inválidas")
				}
			})
	}

	const formik = useFormik({ initialValues, validationSchema, onSubmit })
	const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik

	return (
		<div className="auth">
			<form onSubmit={handleSubmit}>
				<h1>Iniciar sesión</h1>
				<div>
					<label htmlFor="userName">Nombre de usuario</label>
					<input
						className={errors.userName && touched.userName ? "error" : ""}
						type="text"
						name="userName"
						id="userName"
						value={values.userName}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{errors.userName && touched.userName && (
						<div className="error-text">{errors.userName}</div>
					)}
				</div>
				<div>
					<label htmlFor="password">Contraseña</label>
					<input
						className={errors.password && touched.password ? "error" : ""}
						type="password"
						name="password"
						id="password"
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{errors.password && touched.password && (
						<div className="error-text">{errors.password}</div>
					)}
				</div>
				<div className="buttons">
					<button type="submit">Iniciar sesión</button>
				</div>
				<p>
					¿No tenes cuenta? <Link to="/register" className="secondary">Registrate</Link>

				</p>
			</form>
		</div>
	)
}

export default Login

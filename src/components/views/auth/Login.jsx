import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from "yup"

import "../../../styles/auth.styles.css"

const Login = () => {
	const navigate = useNavigate()

	const initialValues = {
		email: "",
		password: "",
	}

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("El email no es válido")
			.required("El email es requerido"),
		password: Yup.string()
			.min(8, "La contraseña debe tener al menos 8 caracteres")
			.required("La contraseña es requerida"),
	})

	const onSubmit = () => {
		localStorage.setItem("token", "yes")
		navigate("/", { replace: true })
	}

	const formik = useFormik({ initialValues, validationSchema, onSubmit })
	const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik

	return (
		<div className="auth">
			<form onSubmit={handleSubmit}>
				<h1>Iniciar sesión</h1>
				<div>
					<label htmlFor="email">Email</label>
					<input
						className={errors.email && touched.email ? "error" : ""}
						type="email"
						name="email"
						id="email"
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{errors.email && touched.email && <div className="error-text">{errors.email}</div>}
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
					<Link to={"/register"}>
						<button>Registrarse</button>
					</Link>
				</div>
			</form>
		</div>
	)
}

export default Login

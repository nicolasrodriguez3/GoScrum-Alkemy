import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
	const navigate = useNavigate()

	const initialValues = {
		email: "",
		password: "",
	}
	const validate = (values) => {
		const errors = {}
		if (!values.email) {
			errors.email = "El email es requerido"
		}
		if (!values.password) {
			errors.password = "Password es requerido"
		}
		return errors
	}

	const onSubmit = () => {
		localStorage.setItem("token", "yes")
		navigate("/", { replace: true })
	}

	const formik = useFormik({ initialValues, validate, onSubmit })
	const { values, errors, handleChange, handleSubmit } = formik

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<h1>Iniciar sesión</h1>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						value={values.email}
						onChange={handleChange}
					/>
					{errors.email && <div>{errors.email}</div>}
				</div>
				<div>
					<label htmlFor="password">Contraseña</label>
					<input
						type="password"
						name="password"
						id="password"
						value={values.password}
						onChange={handleChange}
					/>
					{errors.password && <div>{errors.password}</div>}
				</div>
				<div>
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

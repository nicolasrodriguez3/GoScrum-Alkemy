import { useFormik } from "formik"

const Register = () => {
	const initialValues = {
		email: "",
		password: "",
		username: "",
		role: "Team-Member",
		continent: "America",
		region: "Latam",
	}

	const onSubmit = (values) => {
		console.log(values)
	}

	const formik = useFormik({ initialValues, onSubmit })
	const { values, errors, handleChange, handleSubmit } = formik

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<h1>Registro</h1>
				<div>
					<label htmlFor="username">Nombre de usuario</label>
					<input
						type="text"
						name="username"
						id="username"
						value={values.username}
						onChange={handleChange}
					/>
					{errors.username && <div>{errors.username}</div>}
				</div>
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
					<input
						type="hidden"
						name="teamID"
						id="teamID"
						value={"9cdfc108-f8f8-4f8f-8f8f-8f8f8f8f8f8f"}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="role">Rol</label>
					<select name="role" id="role" value={values.role} onChange={handleChange}>
						<option value="Team-Member">Team Member</option>
						<option value="Team-Leader">Team Leader</option>
					</select>
					{errors.role && <div>{errors.role}</div>}
				</div>
				<div>
					<label htmlFor="continent">Continente</label>
					<select name="continent" id="continent" value={values.continent} onChange={handleChange}>
						<option value="America">América</option>
						<option value="Europa">Europa</option>
						<option value="Otro">Otro</option>
					</select>
					{errors.continent && <div>{errors.continent}</div>}
				</div>
				<div>
					<label htmlFor="region">Región</label>
					<select name="region" id="region" value={values.region} onChange={handleChange}>
						<option value="Latam">Latam</option>
						<option value="Brasil">Brasil</option>
						<option value="America-del-norte">America del norte</option>
						<option value="Otro">Otro</option>
					</select>
					{errors.region && <div>{errors.region}</div>}
				</div>
				<button type="submit">Iniciar sesión</button>
			</form>
		</div>
	)
}

export default Register

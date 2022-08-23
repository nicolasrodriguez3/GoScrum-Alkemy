import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { v4 as uuidv4 } from "uuid"
import { Switch, FormControlLabel } from "@mui/material"

import "../../../styles/auth.styles.css"

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

const Register = () => {
	const [data, setData] = useState({})

	const navigate = useNavigate()

	const initialValues = {
		userName: "",
		email: "",
		password: "",
		teamId: "",
		role: "Team Member",
		continent: "",
		region: "",
		switch: false,
	}

	const validationSchema = Yup.object().shape({
		userName: Yup.string()
			.min(4, "Ingrese al menos 4 caracteres")
			.required("El nombre de usuario es requerido"),
		email: Yup.string().email("El email no es válido").required("El email es requerido"),
		password: Yup.string()
			.min(6, "La contraseña debe tener al menos 6 caracteres")
			.required("La contraseña es requerida"),
		role: Yup.string().required("El rol es requerido"),
		continent: Yup.string().required("El continente es requerido"),
		region: Yup.string().required("La región es requerida"),
	})

	const handleContinent = (value) => {
		setFieldValue("continent", value)
		if (value !== "América") setFieldValue("region", "Otro")
	}

	const onSubmit = (values) => {
		const teamID = values.teamId || uuidv4()
		console.log(values)
		const { userName, email, password, role, continent, region } = values

		fetch(`${API_ENDPOINT}auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: {
					userName,
					email,
					password,
					teamID,
					role,
					continent,
					region,
				},
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				navigate(`/registered/${data?.result?.user.teamID}`, { replace: true })
			})
			.catch((err) => console.log(err))
	}

	const formik = useFormik({ initialValues, validationSchema, onSubmit })
	const { values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue } = formik

	useEffect(() => {
		const getData = async (URL) => {
			const res = await fetch(URL)
			const data = await res.json()
			setData(data.result)
		}
		getData(API_ENDPOINT + "auth/data")
	}, [])

	return (
		<div className="auth">
			<form onSubmit={handleSubmit}>
				<h1>Registro</h1>
				<div>
					<label htmlFor="username">Nombre de usuario</label>
					<input
						className={errors.userName && touched.userName ? "error" : ""}
						type="text"
						name="userName"
						id="username"
						value={values.userName}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{errors.userName && touched.userName && (
						<div className="error-text">{errors.userName}</div>
					)}
				</div>

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
				<div>
					<FormControlLabel
						control={<Switch checked={values.switch} onChange={handleChange} name="switch" />}
						label="¿Perteneces a un equipo ya creado?"
					/>
				</div>
				{values.switch && (
					<div>
						<label htmlFor="teamId">Identificador de equipo</label>
						<input
							type="text"
							name="teamID"
							id="teamID"
							value={values.teamId}
							onChange={handleChange}
						/>
					</div>
				)}
				<div>
					<label htmlFor="role">Rol</label>
					<select
						name="role"
						id="role"
						value={values.role}
						onChange={handleChange}
						onBlur={handleBlur}
						className={errors.role && touched.role ? "error" : ""}>
						{data?.Rol?.map((rol) => (
							<option key={rol} value={rol}>
								{rol}
							</option>
						))}
					</select>
					{errors.role && touched.role && <div className="error-text">{errors.role}</div>}
				</div>

				<div>
					<label htmlFor="continent">Continente</label>
					<select
						name="continent"
						id="continent"
						value={values.continent}
						onChange={(e) => handleContinent(e.target.value)}
						onBlur={handleBlur}
						className={errors.continent && touched.continent ? "error" : ""}>
						<option value="">Seleccione continente</option>
						{data?.continente?.map((continent) => (
							<option key={continent} value={continent}>
								{continent}
							</option>
						))}
					</select>
					{errors.continent && touched.continent && (
						<div className="error-text">{errors.continent}</div>
					)}
				</div>

				{values.continent === "America" && (
					<div>
						<label htmlFor="region">Región</label>
						<select
							name="region"
							id="region"
							value={values.region}
							onChange={handleChange}
							onBlur={handleBlur}
							className={errors.region && touched.region ? "error" : ""}>
							<option value="">Seleccione región</option>
							{data?.region?.map((region) => (
								<option key={region} value={region}>
									{region}
								</option>
							))}
						</select>
						{errors.region && touched.region && <div className="error-text">{errors.region}</div>}
					</div>
				)}

				<div className="buttons">
					<button type="submit">Registrarse</button>
					<Link to={"/login"}>
						<button className="secondary">Iniciar sesión</button>
					</Link>
				</div>
			</form>
		</div>
	)
}

export default Register

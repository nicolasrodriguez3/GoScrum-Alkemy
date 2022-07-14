import { AnimatePresence, motion } from "framer-motion"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import "./App.css"
import Login from "./components/login/Login"
import Register from "./components/login/Register"
import Error404 from "./components/views/Error404"
import Task from "./components/views/Task"

const RequireAuth = ({ children }) => {
	if (!localStorage.getItem("token")) return <Navigate to={"/login"} replace={true} />
	return children
}

const App = () => {
	const location = useLocation()
	const { pathname } = location

	return (
		<AnimatePresence>
			<Routes location={location} key={pathname}>
				<Route
					path="/"
					element={
						<RequireAuth>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}>
								<Task />
							</motion.div>
						</RequireAuth>
					}
				/>
				<Route
					path="/login"
					element={
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}>
							<Login />
						</motion.div>
					}
				/>
				<Route
					path="/register"
					element={
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}>
							<Register />
						</motion.div>
					}
				/>
				<Route
					path="*"
					element={
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}>
							<Error404 />
						</motion.div>
					}
				/>
			</Routes>
		</AnimatePresence>
	)
}

export default App


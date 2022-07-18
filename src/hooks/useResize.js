import { useEffect, useState } from "react"

export default function useResize() {
	const [isPhone, setIsPhone] = useState(window.innerWidth < 768)

	const handleResize = () => {
		setIsPhone(window.innerWidth < 768)
	}
	useEffect(() => {
		handleResize()
		window.addEventListener("resize", handleResize)
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	return { isPhone }
}

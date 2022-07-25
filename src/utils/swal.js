import Swal from "sweetalert2"

export const swal = ({ message }) => {
	Swal.fire({
		title: "Error",
		text: message,
		icon: "error",
		confirmButtonText: "Ok",
		timerProgressBar: true,
		timer: 3000,
	})
}
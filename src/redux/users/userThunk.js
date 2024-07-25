import axios from "axios";
import { localhostURL } from "../../utils/url";


const registration = async ({ name, email, password, confirmPass, toast }) => {
    name = name.trim()
    email = email.trim()
    password = password.trim()
    confirmPass = confirmPass.trim()

    const nameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (name === "" || email === "" || password === "" || confirmPass === "") {
        toast.warning("All the fields are required!", { hideProgressBar: true, autoClose: 3000 });
    } else if (!nameRegex.test(name)) {
        toast.warning("Name must be between 3 to 20 characters and contain only letters!", { hideProgressBar: true, autoClose: 3000 });
    } else if (!emailRegex.test(email)) {
        toast.warning("Invalid email address!", { hideProgressBar: true, autoClose: 3000 });
    } else if (password.length < 6) {
        toast.warning("Password must be at least 6 characters long!", { hideProgressBar: true, autoClose: 3000 });
    } else if (password !== confirmPass) {
        toast.warning("Password and confirm password do not match!", { hideProgressBar: true, autoClose: 3000 });
    } else {
        const response = await axios.post(`${localhostURL}/signup`, { name, email, password })
        if (response.data === "UserExist") {
            toast.error("User already exist", { hideProgressBar: true, autoClose: 3000 });
        } else {
            toast.success("Registration completed successfully", { hideProgressBar: true, autoClose: 2500 });
            return "success";
        }
    }
}


export {
    registration
}
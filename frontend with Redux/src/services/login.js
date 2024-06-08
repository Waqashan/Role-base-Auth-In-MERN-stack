
import axios from "./BaseUrl";

export const LoginApi= async (body) => {
    try {
        const response = await axios.post("/login", body);

        return response;
    } catch (err) {
        return err.response
    }
}
export const getdata = async () => {
    try {
        const response = await axios.get("getall");

        return response;
    } catch (err) {
        return err.response
    }
}
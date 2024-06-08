
import axios from "./BaseUrl";
export const SignUp = async (body) => {
    try {
        const response = await axios.post("/signup", body);

        return response;
    } catch (err) {
        return err.response
    }
}
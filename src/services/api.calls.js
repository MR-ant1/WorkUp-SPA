
import { logout } from "../app/Slices/userSlice";

const root = "http://localhost:8000/api/"

export const loginUser = async (user) => {

    const clientData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    };

    try {
      const response = await fetch(`${root}auth/login`, clientData);

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      if(data.message === "Cant authentificate user") {
        dispatchEvent(logout({ tokenData: ""}))
      }

      return data;
    } catch (error) {
      return error;
    }
  };

  export const GetProjects = async () => {

    const clientData = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const response = await fetch(`${root}userProject`, clientData)

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error
    }
}
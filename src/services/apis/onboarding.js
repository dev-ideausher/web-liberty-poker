import { responseValidator, apiError, URL } from "@/utilities/helper";

export const userVerification = async (payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(payload)
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    try{
        const response = await fetch(URL+"auth/userVerification", requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e)
    }
}

export const login = async (payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(payload)
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    try{
        const response = await fetch(URL+"auth/login", requestOptions)
        return responseValidator(response)
    }
    catch(e){
        return apiError(e)
    }
}


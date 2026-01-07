import { apiError, getAuthToken, responseValidator, URL } from "../helper";

export const getUser = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    try{
        const response = await fetch(URL +"users/userDetails", requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }  
}

export const updateUserEmail = async (payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(payload);
    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    try{
        const response = await fetch(URL +"users/updateDetails", requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }  
}
import { URL, responseValidator, apiError, getAuthToken } from "../helper"

export const getAllTournaments = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    try{
        const response = await fetch(URL+"users/tournamentsList", requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }  
}

export const registerTournament = async (payload, tournamentId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(payload);
    const requestOptions = {
        method: "POST",
        body: raw,
        headers: myHeaders,
        redirect: "follow"
    };
    try{
        const response = await fetch(URL+`users/${tournamentId}/register`, requestOptions);
        return responseValidator(response, true);
    }
    catch(e){
        return apiError(e);
    }
}
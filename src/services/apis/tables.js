import { apiError , getAuthToken, responseValidator, URL} from "@/utilities/helper";


export const getTables = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    try{
        const response = await fetch(URL+"users/getTables", requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }  
}
export const getSingleTable = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    try{
        const response = await fetch(URL+"table/getTableById/"+id, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }  
}

export const deleteSingleTable = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };
    try{
        const response = await fetch(URL+"table/deleteTable/"+id, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }  
}
export const checkTableExistence  = async (payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(payload);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    try{
        const response = await fetch(URL+"users/checkTableExistence ", requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }  
}
export const checkCreateTableType  = async (payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(payload);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    try{
        const response = await fetch(URL+"table/findOrCreateTableType ", requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }  
}
export const createNewTable  = async (payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(payload);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    try{
        const response = await fetch(URL+"table/createTable ", requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }  
}
export const getAllTablesList = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    try{
        const response = await fetch(URL+"table/listTables", requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }  
}
export const saveTableAddress  = async (payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(payload);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    try{
        const response = await fetch(URL+"users/saveTableAddress ", requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }  
}

export const joinTableDirectly = async (payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(payload);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    try {
        const response = await fetch("/api/join-table-directly", requestOptions);
        return responseValidator(response);
    } catch (e) {
        return apiError(e);
    }
}
export const getAllTiers = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    try{
        const response = await fetch(URL+"matchmaking/tiers", requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }  
}
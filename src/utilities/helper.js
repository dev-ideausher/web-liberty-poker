// tables.js
import { showErrorMessage, showSuccessMessage } from './toast';
import { getToken } from '@/services/cookies';
// import { showEmailModal } from './GlobalModal';
export const URL = `${process.env.NEXT_PUBLIC_URL}/v1/`;
  

export const getAuthToken = () => {
    const cookieString = getToken();
    if (cookieString) {
        const { value, expiryTime } = JSON.parse(cookieString);
        return value;
    }
    return false
}
export const getUserDetail = () => {
    const cookieString = getUser();
    if (cookieString) {
        return cookieString;
    }
    return false
}
export const responseValidator = async (response, isToaster = false, message = null) => {
    if (response.ok) {
        const res = await response.json()
        if (Array.isArray(res.data)) {
            if (isToaster) {
                showSuccessMessage((!message || message.length == 0) ? res.message : message);
            }
            return { status: true, data: [...res.data] }
        } else if (typeof res.data === 'object') {
            if (isToaster) {
                showSuccessMessage((!message || message.length == 0) ? res.message : message);
            }
            return { status: true, data: res.data }
        } else if (typeof res.data === 'string') {
            if (isToaster) {
                showSuccessMessage((!message || message.length == 0) ? res.message : message);
            }
            return { status: true, data: res.data }
        } else {
            if (isToaster) {
                showSuccessMessage((!message || message.length == 0) ? res.message : message);
            }
            return { status: res.status, message: res.message }
        }
    }
    else if (response.status == 429) {
        // showEmailModal();
    }
    else if (response.status == 401) {
        showErrorMessage("You are not logged in. Please login for accessing this section.");
        return { status: false, code: 401, message: "Session Expired." }
    }
    else if (response.status == 413) {
        showErrorMessage("Media file which you attach is too large.");
        return { status: false, code: 413, message: "file-size-too-large" }
    }
    else if (response.status >= 400 && response.status < 500) {
        const res = await response.json();
        showErrorMessage(res.message);
        return { status: false, code: 400, message: res }
    }
    else if (response.status >= 500) {
        const res = await response.json();
        showErrorMessage(res.message);
        return { status: false, code: response.status, message: "Encounter Server Side Error." }
    }
    else {
        showErrorMessage("Something went wrong");
        return { status: false, code: response.status, message: "Something went wrong." }
    }
}
export const apiError = (e) => {
    console.log(e)
    if (e.name === "AbortError") {
    }
    else {
        showErrorMessage("Takes more than the usual time. Please refresh the page.");
    }
    return { status: false, message: e }
}
export const isOwnView = (socketId, userSocketId) => {
    if (socketId === userSocketId) {
        return true;
    }
    else {
        return false;
    }
}

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


export const getFormattedLargeNumbers = (num) => {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K';
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num > 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else {
        return num;
    }
}


export const calculateCoins = (amount) => {
    if (amount <= 0) return [];

    // const coins = [10000000, 1000000, 100000, 50000, 1000, 500, 100, 25, 10, 5, 1];

    // 5M, 500K, 25K, 50

    const coins = [
        { value: 10000000, text: '10M' },
        { value: 1000000, text: '1M' },
        { value: 500000, text: '500K' },
        { value: 100000, text: '100K' },
        { value: 50000, text: '50K' },
        { value: 25000, text: '25K' },
        { value: 10000, text: '10K' },
        { value: 5000, text: '5000' },
        { value: 1000, text: '1000' },
        { value: 500, text: '500' },
        { value: 100, text: '100' },
        { value: 50, text: '50' },
        { value: 25, text: '25' },
        { value: 10, text: '10' },
        { value: 5, text: '5' },
        { value: 1, text: '1' },
    ];


    let remaining = amount;
    let result = [];

    // now we will loop through the coins array and calculate the number of coins needed for each denomination and return the result

    for (let i = 0; i < coins.length; i++) {
        const coin = coins[i];
        const count = Math.floor(remaining / coin.value);
        if (count > 0) {
            result.push({ count: count, value: coin.value, text: coin.text });
            remaining -= count * coin.value;
        }
    }


    return result;
}
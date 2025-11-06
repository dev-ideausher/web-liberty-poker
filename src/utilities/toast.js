import { toast } from 'sonner';

const options = {
    duration: 4000,
}

export const showDefaultMessgage = (message) => {
    toast(message, {...options, id: `default-Toaster-${Math.random()}`});
}
export const showSuccessMessage = (message) => {
    toast.success(message, {...options, id: `Success-Toaster-${Math.random()}`});
}

export const showErrorMessage = (message) => {
    toast.error(message, {...options, id: `error-Toaster-${Math.random()}`});
}

export const showInfoMessage = (message) => {
    toast.info(message, {...options, id: `info-Toaster-${Math.random()}`});
}

export const showDescriptionMessage = (title, description) => {
    toast.message(title, {
        description: description,
    },{...options, id: `description-Toaster-${Math.random()}`});
}

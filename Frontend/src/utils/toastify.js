
import { toast } from 'react-toastify';

const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    className: 'text-lg py-3 px-6 rounded-lg md:text-sm md:py-2 md:px-4 ',
};


export const showToastSuccess = (message) => {
  toast.success(message, toastOptions);
};

export const showToastError = (message) => {
  toast.error(message, toastOptions);
};

export const showToastWarning = (message) => {
  toast.warning(message, toastOptions);
};

export const showToastInfo = (message) => {
  toast.info(message, toastOptions);
};

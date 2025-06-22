import { toast } from 'react-toastify';

type TToastMessage = 'success' | 'warning' | 'error';

const renderColorMessage = (type: TToastMessage) => {
   switch (type) {
      case 'success':
         return '#00A124';
      case 'warning':
         return '#FF7223';
      case 'error':
         return 'red';
   }
};

const toastMessage = (message: string, toastType: TToastMessage) => {
   return toast[toastType](message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'colored',
      style: {
         background: renderColorMessage(toastType),
         color: 'white',
      },
   });
};

export { toastMessage };

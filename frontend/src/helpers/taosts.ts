import toast from 'react-hot-toast';

export const showToast = (message: string, success: boolean) => {
    toast[success ? 'success' : 'error'](message, {
        style: {
            border: '2px solid rgba(255, 255, 255, 0.1)',
            padding: '10px',
            color: '#111111',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            fontSize: '1rem',
            minWidth: '15em',
            letterSpacing: '-0.01em',
            fontWeight: '600',
        },
        iconTheme: {
            primary: '#212A3E',
            secondary: '#F1F6F9',
        },
        duration: 3000,
    });
};

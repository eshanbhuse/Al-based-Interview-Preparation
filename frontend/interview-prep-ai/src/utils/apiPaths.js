
export const BASE_URL = 'https://al-based-interview-preparation-backend.onrender.com/';
export const API_PATHS = {
    AUTH:{
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    GET_PROFILE: '/api/auth/profile',
    },
    IMAGE:{
        UPLOAD_IMAGE: '/api/auth/upload-image',
    },
    AI:{
        GENERATE_QUESTIONS: '/api/ai/generate-questions',
        GENERATE_EXPLANATION: '/api/ai/generate-explanation',
    },
    SESSION:{
        CREATE: '/api/sessions/create',
        GET_ALL: '/api/sessions/my-sessions',
        DELETE: (id) => `/api/sessions/${id}`,
        GET_ONE: (id) => `/api/sessions/${id}`,
    },
    QUESTION:{
        ADD_TO_SESSION:'/api/questions/add',
        PIN: (id) => `/api/questions/${id}/pin`,
        UPDATE_NOTE: (id) => `/api/questions/${id}/note`,
       
    }
    
};
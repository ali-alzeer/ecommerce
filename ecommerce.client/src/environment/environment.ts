export const BASEURL: string = 'YOUR_BACKEND_URL';
    export const AI_REQUEST_URL = 'YOUR_AI_API_REQUEST_URL';
    export const AI_REQUEST_HEADERS = {
        headers: {
        'YOUR_AI_API_REQUEST_HEADERS'
        },
    };
    export function AI_REQUEST_BODY(content : string){ 
        return JSON.stringify({
            'YOUR_AI_API_REQUEST_BODY'
        })    
    };
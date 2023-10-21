import { useCookies } from 'react-cookie'
import axios from 'axios'


export default class AuthService {
    // fetch data from api login
    static Login(body) {
        return fetch('http://127.0.0.1:8000/auth/user/login/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
    }

    //register
    static Register(body) {
        return fetch('http://127.0.0.1:8000/auth/user/register/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
    }

    // Verify Email
    static VerifyEmail(url) {
        return fetch(url, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(url)
        }).then(res => res.json())
    }

    // Recovery Password
    static RecoveryPassword(body) {
        return fetch('http://127.0.0.1:8000/auth/password/recovery/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
    }

}


// export const login = (email, password) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }

//     const body = JSON.stringify({ email, password });

//     try {
//         const res = await axios.post('http://127.0.0.1:8000/auth/user/login/', body, config)
//     }
// }

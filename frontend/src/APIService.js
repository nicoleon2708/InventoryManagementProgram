import { useCookies } from 'react-cookie'
import axios from 'axios'


export default class APIService {
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

    //update
    static UpdateUser(user_id, body, token) {
        return fetch(`http:127.0.0.1:8000/auth/user/${user_id}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
    }

    //deletr
    static DeleteUser(user_id, body, token) {
        return fetch(`http:127.0.0.1:8000/auth/user/${user_id}/`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
    }
}

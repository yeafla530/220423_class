import axios, {AxiosResponse} from 'axios'

const SERVER = 'http://127.0.0.1:5000'
// 토큰 발급되면 실해오딜거임
const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege..."
}
export interface UserType {
    userid: string;
    password: string;
    email: string;
    name: string;
    phone: string;
    birth: string;
    address: string;
}
// 회원가입
export const joinApi = async (payload : {
    userid: string,
    password: string,
    email: string,
    name: string,
    phone: string,
    birth: string,
    address: string
}) => {
    try {
        alert('진행4 : API 진입 ##')
        const response: AxiosResponse<unknown, UserType[]> = await axios.post(
            `${SERVER}/user/join`,
            payload,
            {headers}
        )
        alert('진행 6 : 응답성공 ' + JSON.stringify(response.data))
        return response.data
    } catch (err) {
        return err;
    }
}

export const loginApi = async (payload : {
    userid: string,
    password: string
}) => {
    try {
        alert('진행4 : API 진입 ##')

        const response: AxiosResponse<unknown, UserType[]> = await axios.post(
            `${SERVER}/user/login`,
            payload,
            {headers}
        )
        alert('진행 6 : 응답성공 ' + JSON.stringify(response.data))
        const loginUser = JSON.stringify(response.data)
        localStorage.setItem("loginUser", loginUser)
        return response.data
    } catch (err) {
        return err;
    }
}

// 서버에서 비동기로 받기 때문에 
export const logoutApi = async () => {
    try{
        const response:AxiosResponse<unknown, UserType[]> = await axios.get(
            `${SERVER}/user/logout`,
            {headers}
        )
    }catch(err){
        return err;
    }
}
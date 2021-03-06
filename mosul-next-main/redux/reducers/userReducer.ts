import { createSlice } from "@reduxjs/toolkit"

export interface UserType{
    userid: string;
    password: string;  
    email: string;
    name: string;  
    phone: string;
    birth: string;
    address: string;
}

export interface UserState{
    loading: boolean;
    data: UserType[];
    error: any;
}


const initialState: UserState = {
    loading: false,
    data: [],
    error: null
}

// 객체
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // switch와 case가 생략되어있는 형식 
        // reducer하나에 actions여러개
        // 액션 생성함수
        // joinRequest는 key값으로 전환이 됨
        // key값 가진게 actions이 됨
        // action이 실행되면 리듀서가 됨 / 밀키트 같은것
        joinRequest(state: UserState, payload){
            alert('진행 2') 
            state.loading = true; 
        },
        joinSuccess(state: UserState, {payload}){ 
            state.data = [...state.data, payload]
            state.loading = false;
            
        },
        joinFailure(state: UserState, {payload}){ 
            state.data = payload;
            state.loading = false;
        },
        loginRequest(state: UserState, payload){
            alert('진행 2') 
            state.loading = true; 
        },
        loginSuccess(state: UserState, {payload}){ 
            state.data = [...state.data, payload]
            state.loading = false;
            
        },
        loginFailure(state: UserState, {payload}){ 
            state.data = payload;
            state.loading = false;
        },
        // 로그아웃
        // 응답 받아야함
        logoutRequest(state: UserState, payload) {
            state.loading = false;
        }, 
        logoutSuccess(state: UserState){ 
            state.loading = false;
            localStorage.clear()
            window.location.href = '/'
            
        },
        // 회원탈퇴
        delUserRequest(state: UserState, payload){
            state.loading = true; 
        },
        delUserSuccess(state: UserState, {payload}){ 
            state.data = [...state.data, payload]
            state.loading = false;
            
        },
        delUserFailure(state: UserState, {payload}){ 
            state.data = payload;
            state.loading = false;
        },
    }
})
// joinRequest joinSuccess joinFailurer같은 것이 actions로 넘어감
// reducer하나에 actions여러개
// actions는 어떤 액션이 발생시키느냐에 따라 자기가 자동 실행시킴
const { reducer, actions } = userSlice
export const userActions = actions
export default reducer // rootReducer로 버블링됨
import { PayloadAction } from '@reduxjs/toolkit'
import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { userActions } from '../reducers/userReducer.ts';
import { joinApi, loginApi, logoutApi } from '../api/userApi.ts'


// 새로 생성 
interface UserLoginType{
    type: string;
    payload: {
        userid:string, password:string
    }
}


interface UserJoinType{
    type: string;
    payload: {
        userid:string, password:string, email:string, 
        name:string, phone:string, birth:string, address:string
    }
}
interface UserJoinSuccessType{
    type: string;
    payload: {
        userid: string
    }
}
interface UserLoginSuccessType{
    type: string;
    payload: {
        userid:string, email:string, 
        name:string, phone:string, birth:string, address:string
    }
}


// 1. join
function* join(user: UserJoinType){
    alert('진행3진입?')
    try{
        alert(' 진행 3: saga내부 join 성공  '+ JSON.stringify(user))
        // postUser는 api가 됨
        // payload는 e.target
        // 3. postUser
        const response : UserJoinSuccessType = yield joinApi(user.payload)
        yield put(userActions.joinSuccess(response))
    }catch(error){
         alert('진행 3: saga내부 join 실패  ') 
         yield put(userActions.joinFailure(error))
    }
}
// 제너레이터 함수
// join이라는 actions이 꽂히면 아래 함수가 생성되는 형식
// join이 끝나면 함수도 같이 꺼짐


export function* watchJoin(){
    // alert('2.5')
    // 2. 
    yield takeLatest(userActions.joinRequest, join)
}

// 로그인
function* login(login: UserLoginType){
    try{
        alert(' 진행 3: saga내부 login 성공  '+ JSON.stringify(login))
        const response : UserLoginSuccessType = yield loginApi(login.payload)
        yield put(userActions.loginSuccess(response))
        window.location.href = '/'
    }catch(error){
         alert('진행 3: saga내부 login 실패  ') 
         yield put(userActions.loginFailure(error))
    }
}
// 제너레이터 함수
// join이라는 actions이 꽂히면 아래 함수가 생성되는 형식
// join이 끝나면 함수도 같이 꺼짐
export function* watchLogin(){
    yield takeLatest(userActions.loginRequest, login)
}

// 로그아웃
function* logout(){
    try{
        alert(' 진행 3: saga내부 login 성공')
        const response : UserLoginSuccessType = yield logoutApi()
        yield put(userActions.logoutSuccess(response))
        window.location.href = '/'
    }catch(error){
        alert(' 진행 3: saga내부 login 실패')
        //  yield put(userActions.loginFailure(error))
    }
}
// 제너레이터 함수
// join이라는 actions이 꽂히면 아래 함수가 생성되는 형식
// join이 끝나면 함수도 같이 꺼짐
export function* watchLogout(){
    yield takeLatest(userActions.logoutRequest, logout)
}

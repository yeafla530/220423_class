import React from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/reducers/userReducer.ts';
export default function Logout(){
    const dispatch = useDispatch()
    return <form onSubmit={
        e => {
            e.preventDefault()
            // 로그아웃을 요청한다
            dispatch(userActions.logoutRequest())
        }
    }
    >
        <button type="submit">로그아웃</button>
    </form>
}

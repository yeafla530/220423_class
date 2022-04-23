// toolkit 사용 
// SSR 설정
import { combineReducers } from '@reduxjs/toolkit'
import {HYDRATE} from 'next-redux-wrapper'
// import 처리
import users from './userReducer.ts' // 에러아님

const rootReducer = (state:any, action: any) => {
    if (action.type === HYDRATE) {
        return {
          ...state,
          ...action.payload,
        };
    }
    // 순수함수
    // 리듀서 하나로 모아줌 (이벤트 버블링)
    // import 여러개일땐 users, board
    return combineReducers({
        users
    })(state, action) // 즉시실행으로 변경
}

export default rootReducer
// typescript type을 넘겨준다
export type RootState = ReturnType<typeof rootReducer>
// 함수의 저장공간이 필요 함수형식으로 짜야함 
// * : 제너레이터는 메모리 공간을 사용한다
import {all} from 'redux-saga/effects'
import { watchJoin, watchLogin, watchLogout } from './userSaga.ts'


export default function* rootSaga(){
    // 제너레이팅됨 ~~()는 바로 실행 
    yield all([watchJoin(), watchLogin(), watchLogout()])
} 

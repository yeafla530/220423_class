import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
// 4. 훅함수
import { userActions } from '../../redux/reducers/userReducer.ts'
import tableStyles from '../common/styles/table.module.css'

export default function  Join(){
    // 페이로드 -> mongodb에 들어가는 값
    // JWT 토큰까지는 지불하지 앖겠다
    const [user, setUser] =useState({
        userid:'', password:'', email:'', name:'', phone:'', birth:'', address:''
    })
    // 추가
    // 1
    const dispatch = useDispatch()
    // 페이로드
    const handleChange = e =>{
        e.preventDefault()
        const{name, value} = e.target;
        setUser({...user,[name]: value})
    }

    return <form onSubmit={
        e => {
            e.preventDefault()
            alert(' 진행 1: 회원가입 클릭 ');
            // 2
            dispatch(userActions.joinRequest(user)) // 3
            setUser({
                userid:'', password:'', email:'', name:'', phone:'', birth:'', address:''
            })
        }
    }
    >
        <table className={tableStyles.table}>
            <thead>
                <tr>
                    <th colSpan={2}><h1>회원가입</h1></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>사용자ID</b></td>
                    <td><input type="text" name='userid' onChange={handleChange} /></td>
                </tr>
                <tr>
                    <td><b>비밀번호</b></td>
                    <td><input type="text" name='password' onChange={handleChange}/></td>
                </tr>
                <tr>
                    <td htmlFor=""><b>이메일</b></td>
                    <td><input type="text" name='email' onChange={handleChange}/></td>
                </tr>

                <tr>
                    <td htmlFor=""><b>이름</b></td>
                    <td><input type="text" name='name' onChange={handleChange}/></td>
                </tr>

                <tr>
                    <td><b>전화번호</b></td>
                    <td><input type="text" name='phone' onChange={handleChange}/></td>
                </tr>

                <tr>
                    <td><b>생년월일</b></td>
                    <td><input type="text" name='birth' onChange={handleChange}/></td>
                </tr>
                <tr>
                    <td><b>주소</b></td>
                    <td><input type="text" name='address' onChange={handleChange}/></td>
                </tr>
                <tr>
                    <td colSpan={2}><button type="submit">회원가입</button><br /></td>
                </tr>
            </tbody>
        </table>
    </form>
}
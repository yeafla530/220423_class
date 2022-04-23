import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
// session같이 passport로 암호화로 보관한다
import passport from 'passport'
import UserService from '../services/user.js'

dotenv.config()
const mongoUri = process.env.MONGO_URI
const port = process.env.PORT
const jwtSecret = process.env.JWT_SECERT
const origin = process.env.ORIGIN
const corsOptions = {
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200
}
const app = express()
app.use(cors());

// 콜백으로 미들웨어를 받았다고 할 수 있음 (res, req, next)
// next가 있으면 순서대로 함수를 실행
// 1. 먼저 실행
// req는 반드시 적혀있어야함 > 안쓰면 버그가 걸릴 수 있어서 _req로 쓴다
app.use(function (_req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// 2. next다음으로 실행
app.post('/join', cors(corsOptions), (req, res) => { 
    console.log('진행5 : router 진입 ##')
    // 미들웨어는 서비스로 진행
    UserService().join(req, res)
})
app.post('/login', cors(corsOptions), (req, res) => {
    console.log('진행5 : router 진입 ##')
    UserService().login(req, res)
})
// 인증 : passport 도 middleware이다
// passport되어야 실행됨
app.get('/logpit', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log('진행5 : router 진입 ##')
    UserService().logout(req, res)
   
})
export default app
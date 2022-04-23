// mern stack의 핵심
// import 복붙
import db from '../models/index.js'
import getDatabase from '../lambdas/getDatabase.js'

export default function UserService() {
    // 알고리즘 짜기
    // models의 index.js에 있는 데이터복붙
    const User = db.User    
    const dbo = getDatabase()    
    const dbConnect = dbo.getDb();


    // 순수함수로 짜야함 return 쓰기
    return {
        // 클로저 짜기
        // 미들웨어 req, res
        // express 기본구조는 라우터와 미들웨어밖에 없다
        // req가 갖고있는 값을 res가 자동으로 안다
        join(req, res){
            // payload는 body에 있다
            // head는 떨궈버림
            // const data = req.body
            // db랑 연결하는 코드짜는곳
            console.log('진행 5-2. join 진입' + JSON.stringify(req.body))
            new User(req.body).save(function(err){
                if(err) {
                    res.status(500).json({message: err})
                    console.log('회원가입에 실패하였습니다')
                    // return 없으면 다음코드로 넘어감
                    return
                } else {
                    console.log('진행 5-3. join 성공')
                    res.status(200).json({ok: 'ok'})
                }
            })
            // return된 res값

        },
        login(req, res) {
            User.findOne({
                userid: req.body.userid
            }, function (err, user) {
                if (err) 
                    throw err
                if (!user) {
                    res
                        .status(401)
                        .send({success: false, message: '해당 ID가 존재하지 않습니다'});
                } else {
                    console.log(' ### 로그인 정보 : ' + JSON.stringify(user))
                    user.comparePassword(req.body.password, function (_err, isMatch) {
                        if (!isMatch) {
                            res
                                .status(401)
                                .send({message:'FAIL'});
                        } else {
                            user.generateToken((err, user) => {
                                if (err) 
                                    res
                                        .status(400)
                                        .send(err)

                                    // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
                                res
                                    .status(200)
                                    .json(user)
                            })
                        }
                    })
                }
            })

        },
        logout(res, req){
            // 짐을 나르는 request
            req.logout()
            res.json({msg: 'LOGOUT'})
        },
        // 아이디 중복 체크 : 복붙
        checkDuplicateUserid(req, res) {
            User
                .findById({userid: req.body.userid})
                .exec((err, user) => {
                    if (err) {
                        res
                            .status(500)
                            .send({message: err});
                        return;
                    }
                    if (user) {
                        res
                            .status(400)
                            .send({message: "ID가 이미 존재합니다"});
                        return;
                    }
                })
        },
        getUserById(userid){
            User
                .findById({userid: userid})
                .exec((_err, user) => {
                    return user
                })
        }
    }
}
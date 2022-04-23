import dotenv from 'dotenv'
import express from 'express'
import passport from 'passport'
import morgan from 'morgan'
import db from './app/models/index.js'
import api from "./app/routes/api.js"
import basic from "./app/routes/basic.js"
import user from "./app/routes/user.js"
import index from "./app/routes/index.js"
// app > config : Helper함수 lambda 처리해서 일회용으로 처리한다
// 함수로 선언하지 않고 람다 처리
import getResponse from "./app/lambdas/getResponse.js"
import applyPassport from './app/lambdas/applyPassport.js'
import applyDotenv from './app/lambdas/applyDotenv.js'

// 비동기 처리외에는 받지 않는다
async function startServer() {
  const app = express();
  const {mongoUri, port, jwtSecret} = applyDotenv(dotenv)
  app.use(express.static('public'));
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
  const _passport = applyPassport(passport, jwtSecret);
  app.use(_passport.initialize());

  // 이건 라우터
  app.use("/", index);
  app.use("/api", api);
  app.use("/basic", basic);
  // 클라이언트에서 넘어옴
  app.use("/user", user);
  app.use(morgan('dev'))
  db
      .mongoose
      .connect(mongoUri, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      })
      .then(() => {
          console.log(' ### 몽고DB 연결 성공 ### ')
      })
      .catch(err => {
          console.log(' 몽고DB와 연결 실패', err)
          process.exit();
      });

  
    app.all("*", function (_req, res) {
        return getResponse.notFoundResponse(res, "페이지를 찾을 수 없습니다");
    });

    app.use((err, _req, res) => {
        if (err.name == "UnauthorizedError") {
            return getResponse.unauthorizedResponse(res, err.message);
        }
    });
    app.listen(port, () => {
      console.log('***************** ***************** *****************')
      console.log('********** 서버가 정상적으로 실행되고 있습니다 *********')
      console.log('***************** ***************** *****************')
    })

}
startServer()
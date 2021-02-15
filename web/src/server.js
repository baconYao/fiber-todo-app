/*
  Mirage & JWT token
    https://medium.com/swlh/custom-routes-with-mirage-js-3d0cc4124897
*/

import { createServer, Model } from 'miragejs';
import jwt from 'jsonwebtoken';
import { Response } from 'miragejs';
import bcrypt from 'bcryptjs';


export async function makeServer({ environment = 'test' } = {}) {
  const secretCode = 'dev secret';
  const password = await bcrypt.hash('123456', 6)
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create('user', { name: 'yao', email: 'yao@gmail.com', password })
      server.create('user', { name: 'ling', email: 'ling@gmail.com', password })
    },

    routes() {
      this.namespace = 'api';
      // 所有的 api 延遲 3 秒
      this.timing = 3000;

      this.post('/login', async (schema, request) => {
        let body = JSON.parse(request.requestBody);
        let userProfile = schema.users.findBy({ email: body.email });

        if (userProfile) {
          // 驗證密碼
          let correctPassword = await bcrypt.compare(body.password, userProfile.password);
          if (correctPassword) {
            // 產生 jwt token
            const encodedToken = jwt.sign({ username: userProfile.name}, secretCode)
            return { encodedToken: encodedToken }
          }
        }
        // 等入失敗，回傳 401 status code
        return new Response(401, {}, { errorMsg: 'Login failed' });
      })
    },
  })

  return server
}
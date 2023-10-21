// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    const result = await req.json();
        if (result.username === 'hello@edited.com' && result.password === 'hello123') {
            return res(
                // Respond with a 200 status code
                ctx.status(200),
            )
        } else {
            return res(
                // Unauthorized request
                ctx.status(401),
            )
        }
  }),
]


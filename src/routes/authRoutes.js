export default async function (fastify, opts) {
    fastify.post('/login', async (request, reply) => {
      const { username, password } = request.body
      const client = await fastify.pg.connect()
      try {
        const { rows } = await client.query('SELECT * FROM test_schema.users WHERE username = $1', [username])
        if (rows.length === 0 || rows[0].password !== password) {
          return reply.code(401).send({ error: 'Invalid credentials' })
        }
        const token = fastify.jwt.sign({ id: rows[0].id, username })
        return { token }
      } catch (err) {
        console.error(err) // log completo
        return reply.code(500).send({ error: 'Database error' })
      } finally {
        client.release()
      }
    })
  }
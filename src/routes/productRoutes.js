export default async function (fastify, opts) {
  // Hook para verificar o token em todas as rotas deste plugin
  fastify.addHook('preHandler', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      return reply.code(401).send({ error: 'Unauthorized' })
    }
  })

  // GET /products - Listar produtos
  fastify.get('/', async (request, reply) => {
    const client = await fastify.pg.connect()
    try {
      const { rows } = await client.query('SELECT * FROM test_schema.products')
      return rows
    } catch (err) {
      return reply.code(500).send({ error: 'Database error' })
    } finally {
      client.release()
    }
  })

  // POST /products - Criar produto
  fastify.post('/', async (request, reply) => {
    const { name, description, price } = request.body
    const client = await fastify.pg.connect()
    try {
      const { rows } = await client.query(
        'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
        [name, description, price]
      )
      return reply.code(201).send(rows[0])
    } catch (err) {
      return reply.code(500).send({ error: 'Database error' })
    } finally {
      client.release()
    }
  })

  // PUT /products/:id - Atualizar produto
  fastify.put('/:id', async (request, reply) => {
    const { id } = request.params
    const { name, description, price } = request.body
    const client = await fastify.pg.connect()
    try {
      const { rows } = await client.query(
        'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
        [name, description, price, id]
      )
      if (rows.length === 0) {
        return reply.code(404).send({ error: 'Product not found' })
      }
      return rows[0]
    } catch (err) {
      return reply.code(500).send({ error: 'Database error' })
    } finally {
      client.release()
    }
  })

  // DELETE /products/:id - Excluir produto
  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params
    const client = await fastify.pg.connect()
    try {
      const { rowCount } = await client.query('DELETE FROM products WHERE id = $1', [id])
      if (rowCount === 0) {
        return reply.code(404).send({ error: 'Product not found' })
      }
      return { message: 'Product deleted' }
    } catch (err) {
      return reply.code(500).send({ error: 'Database error' })
    } finally {
      client.release()
    }
  })
}
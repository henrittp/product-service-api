import Fastify from 'fastify'
import fastifyJwt from 'fastify-jwt'
import fastifyPostgres from 'fastify-postgres'
import dotenv from 'dotenv'
import authRoutes from './src/routes/authRoutes.js'
import productRoutes from './src/routes/productRoutes.js'

dotenv.config()

const fastify = Fastify({ logger: true })

// Registrar plugin do PostgreSQL
fastify.register(fastifyPostgres, {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Alteração feita pra suportar SSL do AWS RDS
})

// Registrar plugin do JWT
fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET
})

// Registrar rotas
fastify.register(authRoutes)
fastify.register(productRoutes, { prefix: '/products' })

const start = async () => {
  try {
    const address = await fastify.listen({ port: process.env.PORT, host: '0.0.0.0' })
    fastify.log.info(`Server is listening on ${address}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
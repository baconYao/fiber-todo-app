import { createServer, Model } from "miragejs"

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", { name: "yao", email: "yao@gmail.com", password: "123456" })
    },

    routes() {
      this.namespace = "api"
      this.timing = 3000
      this.get("/users", (schema) => {
        return schema.users.all()
      })
    },
  })

  return server
}
package io.github.ara_ta3

import zio._
import zio.http._

object Main extends ZIOAppDefault:
  private val route =
    Method.GET / Root -> handler(Response.json("""{"hello":"world"}"""))

  private val app = Routes(route)

  override val run = Server.serve(app).provide(Server.default)

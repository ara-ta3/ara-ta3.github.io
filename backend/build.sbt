name := "ara-ta3-portfolio-backend"
version := "0.1.0"
scalaVersion := "3.8.0"

libraryDependencies ++= Seq(
  "org.scalatest" %% "scalatest" % "3.2.19" % Test,
  "dev.zio" %% "zio" % "2.1.24",
  "dev.zio" %% "zio-http" % "3.8.0"
)

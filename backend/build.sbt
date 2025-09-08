name := "ara-ta3-portfolio-backend"
version := "0.1.0"
scalaVersion := "3.7.3"

libraryDependencies ++= Seq(
  "org.scalatest" %% "scalatest" % "3.2.19" % Test,
  "dev.zio" %% "zio" % "2.1.21",
  "dev.zio" %% "zio-http" % "3.5.0"
)

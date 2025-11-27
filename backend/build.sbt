name := "ara-ta3-portfolio-backend"
version := "0.1.0"
scalaVersion := "3.7.4"

libraryDependencies ++= Seq(
  "org.scalatest" %% "scalatest" % "3.2.19" % Test,
  "dev.zio" %% "zio" % "2.1.22",
  "dev.zio" %% "zio-http" % "3.6.0"
)

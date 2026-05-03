name := "ara-ta3-portfolio-backend"
version := "0.1.0"
scalaVersion := "3.8.3"

libraryDependencies ++= Seq(
  "org.scalatest" %% "scalatest" % "3.2.20" % Test,
  "dev.zio" %% "zio" % "2.1.25",
  "dev.zio" %% "zio-http" % "3.11.1"
)

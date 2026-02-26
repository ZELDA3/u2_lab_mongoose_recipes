require("dotenv").config({ quiet: true })

const express = require("express")

const methodOverride = require("method-override")

const morgan = require("morgan")

const session = require("express-session")

const { MongoStore } = require("connect-mongo")

const path = require("path")

// const middleware = require("./middleware")

const app = express()

const authRouter = require("./routes/authRouter.js")
const userRouter = require("./routes/userRouter.js")

const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

const db = require("./db")
const Recipe = require("./models/Recipe.js")

const PORT = process.env.PORT ? process.env.PORT : 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
)

// app.use(middleware.passUserToView)

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/recipes", recipeRouter)
// app.use("/users", userRouter)
// app.use("/reviews", reviewRouter)

app.get("/", (req, res) => {
  res.send("🧑‍🍳 Mongoose Recipes is waiting for orders . . . ")
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.listen(PORT, () => {
  console.log(`✨ Server is listening on port ${PORT} . . . `)
})

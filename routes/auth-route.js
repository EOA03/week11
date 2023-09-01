const {Router} = require("express")
const {adminMiddleware} = require("../middleware/auth-middleware")
const {allUsersAdmin, allUsers, register, login} = require("../controller/auth-control")

const authRoute = Router()

authRoute.get("/admin", adminMiddleware, allUsersAdmin)
authRoute.get("/", allUsers)
authRoute.post("/register", register)
authRoute.post("/login", login)

module.exports = authRoute
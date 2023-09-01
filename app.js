require("dotenv").config()

const express = require("express")
const transferRoute = require("./routes/transfer-route")
const authRoute = require("./routes/auth-route")
const bodyParser = require("body-parser")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const yaml = require("yaml")
const fs = require("fs")

const openApiPath = "./doc/openapi.yaml"
const file = fs.readFileSync(openApiPath, "utf8")
const swaggerDocument = yaml.parse(file)

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get("/", (req, res)=>{
    res.send("Transfer Request Management API")
})

app.use("/auth", authRoute)
app.use("/transfer", transferRoute)

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})
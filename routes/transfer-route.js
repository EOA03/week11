const {Router} = require("express")
const {allTransfers, createTransfers, updateStatus, updateTransfer, deleteTransfer, allTransfersUser} = require("../controller/transfer-control")
const {approverMiddleware, adminMiddleware, userChecking} = require("../middleware/auth-middleware.js")

const transferRoute = Router()

transferRoute.get("/", approverMiddleware, allTransfers)
transferRoute.get("/:user_id", userChecking, allTransfersUser)
transferRoute.post("/:user_id", userChecking, createTransfers)
transferRoute.patch("/:transferId", approverMiddleware, updateStatus)
transferRoute.put("/:transferId", adminMiddleware, updateTransfer)
transferRoute.delete("/:transferId", adminMiddleware, deleteTransfer)

module.exports = transferRoute
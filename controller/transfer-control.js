const db = require("../middleware/database-middleware")

const allTransfers = (req, res)=>{
  const sql = "select * from transfers"
  db.query(sql, (err, result)=>{
    if(err){
      console.error(err)
      res.status(500).json({error: "Server error"})
    } else{
      res.status(200).json({
        message: "Success get all transfers",
        result
      })
    }
  })
}

const allTransfersUser = (req, res)=>{
  const user_id = req.params.user_id
  const sql = "select destinationBank, destinationAccount, amount, details, status from transfers where user_id = ?"

  db.query(sql, [user_id], (err, result)=>{
    if(err){
      console.error(err)
      res.status(500).json({error: "Server error"})
    } else{
      res.status(200).json({
        message: "Success get all transfers",
        result
      })
    }
  })
}

const createTransfers = (req, res)=>{
  const user_id = req.params.user_id
  const {destinationBank, destinationAccount, amount, details} = req.body;
  const newTransfer = "INSERT INTO transfers (user_id, destinationBank, destinationAccount, amount, details) VALUES (?, ?, ?, ?, ?)";

  db.query(newTransfer, [user_id, destinationBank, destinationAccount, amount, details], (err, result)=>{
    if(err){
      console.error(err);
      return res.status(500).json({error: "Server error"});
    }

    return res.status(200).json({
      message: "Successfully created a transfer",
    });
  });
};

const updateStatus = (req, res)=>{
  const transferId = req.params.transferId
  const {status} = req.body
  const sql = "update transfers set status = ? where id = ?"
    
  db.query(sql, [status, transferId], (err)=>{
    if(Object.keys(sql).length === 0){
      res.status(404).json({
        message: "Data not found"
      })
      res.end()
      return
    }

    if(err){
      res.status(500).json({error: "Server error"})
    } else{
      res.status(200).json({message: "Status successfully updated"})
    }
  })
}

const updateTransfer = (req, res)=>{
  const transferId = req.params.transferId;
  const {destinationBank, destinationAccount, amount, details} = req.body;
  const sql = "UPDATE transfers SET destinationBank = ?, destinationAccount = ?, amount = ?, details = ? WHERE id = ? AND status = 'pending'";
    
  db.query(sql, [destinationBank, destinationAccount, amount, details, transferId], (err, result)=>{
    if(err){
      console.error("Database error:", err);
      res.status(500).json({error: "Server error"});
    } else if(result.affectedRows === 0){
      res.status(404).json({
        message: "Transfer already approved / rejected"
      });
    } else {
      res.status(200).json({message: "Transfer successfully updated"});
    }
  });
};

const deleteTransfer = (req, res)=>{
  const transferId = req.params.transferId
  const sql = "delete from transfers where id = ? and status = 'pending'"
    
  db.query(sql, [transferId], (err, result)=>{
    if(Object.keys(sql).length === 0){
      res.status(404).json({
        message: "Data not found"
      })
      res.end()
      return
    }

    if(err){
      console.error("Database error:", err);
      res.status(500).json({error: "Server error"});
    } else if(result.affectedRows === 0){
      res.status(404).json({
        message: "Transfer already approved / rejected"
      });
    } else {
      res.status(200).json({message: "Transfer successfully deleted"});
    }
  })
}

module.exports = {
    allTransfers,
    allTransfersUser,
    createTransfers,
    updateStatus,
    updateTransfer,
    deleteTransfer
}
const bcrypt = require("bcrypt")
const db = require("../middleware/database-middleware")
const generateToken = require("../utils/jwt-utils")

const allUsersAdmin = (req, res)=>{
  const sql = "select * from users"
  db.query(sql, (err, result)=>{
    if(err){
      console.error(err)
      res.status(500).json({error: "Server error"})
      res.end()
      return
    }
    res.status(200).json({
      message: "Success get all users",
      result
    })
    res.end()
  })
}

const allUsers = (req, res)=>{
  const sql = "select id, username from users"
  db.query(sql, (err, result)=>{
    if(err){
      console.error(err)
      res.status(500).json({error: "Server error"})
      res.end()
      return
    }
    res.status(200).json({
      message: "Success get all users",
      result
    })
    res.end()
  })
}

const register = (req, res)=>{
  const {username, password, role} = req.body;
  const sql = "SELECT username FROM users WHERE username = ?";
  db.query(sql, [username], (err, result)=>{
    if(err){
      console.error(err);
      return res.status(500).json({error: "Server error"});
    }

    if(result.length > 0){
      return res.status(400).json({
        error: "Username already exists"
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newSql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    db.query(newSql, [username, hashedPassword, role], (err, result)=>{
      if(err){
        console.error(err);
        return res.status(500).json({error: "Server error"});
      }

      return res.status(200).json({
        message: "User successfully registered"
      });
    });
  });
};

const login = (req, res)=>{
  const {username, password} = req.body
  const sql = "select * from users where username = ?"
  
  db.query(sql, [username], (err, result)=>{
    if(err){
      console.error(err)
      return res.status(500).json({error: "Server error"})
    }
  
    const user = result[0];
    bcrypt.compare(password, user.password, (err, result)=>{
      if (err || !result) {
        return res.status(401).json({error: "Invalid username or password"});
      }
  
    const token = generateToken(user.id, user.username, user.role);
    res.status(200).json({
      message: "User successfully logged in",
      token
    })
  })
})
} 


module.exports = {
  allUsersAdmin,
  allUsers,
  register,
  login
}
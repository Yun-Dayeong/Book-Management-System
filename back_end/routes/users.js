var express = require('express');
var router = express.Router();
var pool = require('../config/dbConfig')

router.use(express.static('public'));

/* 회원 데이터 불러오기 */
router.get('/getUser/:userId', function (req, res) {
  pool.getConnection((err, conn) => {
    if (err) { res.send({ msg: 500 }) }
    else {
      var sql = "SELECT * FROM `tb_user` WHERE `tb_user_id`=?"
      conn.query(sql, [req.params.userId], (err, result) => {
        conn.release()
        if (err) { res.send({ msg: 400 }) }
        else if (result.length === 0) {
          res.send({ msg: 204 })
        }
        else {
          res.send({ msg: 200, result: result })
        }
      })
    }
  })
});

/* 회원가입 */
router.post('/join', function (req, res) {
  pool.getConnection((err, conn) => {
    if (err) { res.send({ msg: 500 }) }
    else {
      var sql1 = "SELECT * FROM `tb_user` WHERE `tb_user_id`=?"
      var sql2 = "INSERT INTO `tb_user`(`tb_user_id`, `tb_user_password`, `tb_user_name`, `tb_user_management`) VALUES (?,?,?,?)"
      conn.query(sql1, [req.body.userId], (err, result) => {
        if (err) { res.send({ msg: 400 }) }
        else if (result.length === 0) {
          conn.query(sql2, [req.body.userId, req.body.userPassword, req.body.userName, req.body.userManagement], (err, result) => {
            conn.release()
            if (err) { res.send({ msg: 400 }) }
            else {
              res.send({ msg: 200, result: result })
            }
          })
        }
        else {
          res.send({ msg: 202 })
        }
      })
    }
  })
});

/* 로그인 */
router.post('/login', function (req, res) {
  pool.getConnection((err, conn) => {
    if (err) { res.send({ msg: 500 }) }
    else {
      var sql = "SELECT * FROM `tb_user` WHERE `tb_user_id`=? AND `tb_user_password`=?"
      conn.query(sql, [req.body.userId, req.body.userPassword], (err, result) => {
        conn.release()
        if (err) { res.send({ msg: 400 }) }
        else if (result.length === 0) {
          res.send({ msg: 204 })
        }
        else {
          res.send({ msg: 200, result: result })
        }
      })
    }
  })
});

/* 회원 데이터 삭제하기 */
router.post('/deleteUser', function (req, res) {
  pool.getConnection((err, conn) => {
    if (err) { res.send({ msg: 500 }) }
    else {
      var sql = "DELETE FROM `tb_user` WHERE `tb_user_id`=?"
      conn.query(sql, [req.body.userId], (err, result) => {
        conn.release()
        if (err) { res.send({ msg: 400 }) }
        else {
          res.send({ msg: 200, result: result })
        }
      })
    }
  })
});

module.exports = router;

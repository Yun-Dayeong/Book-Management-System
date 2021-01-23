var express = require('express');
var router = express.Router();
var pool = require('../config/dbConfig');
var multer = require('multer');

router.use(express.static('public'));

//책 등록 및 수정 시 사용되는 이미지 이름
var bookId = ""

/* 전체 책 데이터 불러오기 */
router.get('/getAllBook', function (req, res) {
    pool.getConnection((err, conn) => {
        if (err) { console.log(err) }
        else {
            var sql = "SELECT `tb_book_id`, `tb_book_name`, `tb_book_author`, `tb_book_image`, `tb_book_state` FROM `tb_book`"
            conn.query(sql, (err, result) => {
                conn.release()
                if (err) { console.log(err) }
                else {
                    res.send(result)
                }
            })
        }
    })
});

/* 해당 id의 책 데이터 불러오기 */
router.get('/getBook/:bookId', function (req, res) {
    pool.getConnection((err, conn) => {
        if (err) { console.log(err) }
        else {
            var sql = "SELECT * FROM `tb_book` WHERE `tb_book_id` = ?"
            conn.query(sql, [req.params.bookId], (err, result) => {
                conn.release()
                if (err) { console.log(err) }
                else {
                    res.send(result)
                }
            })
        }
    })
});

/* 해당 id가 대출한 책 아이디 데이터 불러오기 */
router.get('/getBorrowBook/:userId', function (req, res) {
    pool.getConnection((err, conn) => {
        if (err) { console.log(err) }
        else {
            var sql = "SELECT `tb_book_id` FROM `tb_borrow` WHERE `tb_user_id`=?"
            conn.query(sql, [req.params.userId], (err, result) => {
                if (err) { console.log(err) }
                else {
                    res.send(result)
                }
            })
        }
    })
});

/* 책 데이터 등록하기 */
router.post('/insertBook', function (req, res) {
    pool.getConnection((err, conn) => {
        if (err) { console.log(err) }
        else {
            var sql = "INSERT INTO `tb_book`(`tb_book_name`, `tb_book_author`) VALUES (?,?)"
            conn.query(sql, [req.body.bookName, req.body.bookAuthor], (err, result) => {
                conn.release()
                if (err) { console.log(err) }
                else {
                    bookId = result.insertId;
                    res.send(result)
                }
            })
        }
    })
});

/* 책 이미지 데이터 등록하기 */
const bookUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/images/');  // 파일이 저장되는 경로
        },
        filename: (req, file, cb) => {
            cb(null, bookId + ".png");  // 저장되는 파일명
        }
    })
});

router.post('/insertBookImage', bookUpload.single("file"), function (req, res) {
    pool.getConnection((err, conn) => {
        if (err) { console.log(err) }
        else {
            var sql = "UPDATE `tb_book` SET `tb_book_image`=? WHERE `tb_book_id`=?"
            var imageFile = null
            //넘어온 이미지 파일이 있으면 ip 절대주소 저장
            if (req.body.file !== null) { imageFile = "http://192.168.0.2:4000/images/" + req.body.bookId + ".png" }

            conn.query(sql, [imageFile, req.body.bookId], (err, result) => {
                conn.release()
                if (err) { console.log(err) }
                else {
                    res.send(result)
                }
            })
        }
    })
});

/* 책 데이터 수정하기 */
router.post('/updateBook', function (req, res) {
    pool.getConnection((err, conn) => {
        if (err) { console.log(err) }
        else {
            var sql = "UPDATE `tb_book` SET `tb_book_name`=?,`tb_book_author`=? WHERE `tb_book_id`=?"
            conn.query(sql, [req.body.bookName, req.body.bookAuthor, req.body.bookId], (err, result) => {
                conn.release()
                if (err) { console.log(err) }
                else {
                    bookId = req.body.bookId
                    res.send(result)
                }
            })
        }
    })
});

/* 책 데이터 삭제하기 */
router.post('/deleteBook', function (req, res) {
    pool.getConnection((err, conn) => {
        if (err) { console.log(err) }
        else {
            var sql = "SELECT * FROM `tb_borrow` WHERE `tb_book_id`=?"
            var sql2 = "DELETE FROM `tb_book` WHERE `tb_book_id`=?"
            conn.query(sql, [req.body.bookId], (err, result) => {
                console.log(result)
                if (err) { console.log(err) }
                else if (result.length === 0) {
                    conn.query(sql2, [req.body.bookId], (err, result) => {
                        conn.release()
                        if (err) { console.log(err) }
                        else {
                            res.send(result)
                        }
                    })
                }
                else {
                    res.send("대출됨")
                }
            })
        }
    })
});

/* 책 대출하기 */
router.post('/borrowBook', function (req, res) {
    pool.getConnection((err, conn) => {
        if (err) { console.log(err) }
        else {
            var sql1 = "INSERT INTO `tb_borrow`(`tb_user_id`, `tb_book_id`) VALUES (?,?)"
            var sql2 = "UPDATE `tb_book` SET `tb_book_state`=? WHERE `tb_book_id`=?"
            conn.query(sql1, [req.body.userId, req.body.bookId], (err, result) => {
                if (err) { console.log(err) }
                else {
                    conn.query(sql2, [1, req.body.bookId], (err, result) => {
                        conn.release()
                        if (err) { console.log(err) }
                        else {
                            res.send(result)
                        }

                    })
                }
            })
        }
    })
});

/* 책 반납하기 */
router.post('/returnBook', function (req, res) {
    pool.getConnection((err, conn) => {
        if (err) { console.log(err) }
        else {
            var sql1 = "DELETE FROM `tb_borrow` WHERE `tb_borrow_id`=?"
            var sql2 = "UPDATE `tb_book` SET `tb_book_state`=? WHERE `tb_book_id`=?"
            conn.query(sql1, [req.body.borrowId], (err, result) => {
                if (err) { console.log(err) }
                else {
                    conn.query(sql2, [0, req.body.bookId], (err, result) => {
                        conn.release()
                        if (err) { console.log(err) }
                        else {
                            res.send(result)
                        }

                    })
                }
            })
        }
    })
});

/* 책을 대출한 user 데이터 불러오기 */
router.get('/borrowUser/:bookId', function (req, res) {
    pool.getConnection((err, conn) => {
        if (err) { console.log(err) }
        else {
            var sql = "SELECT * FROM `tb_borrow` WHERE `tb_book_id`=?"
            conn.query(sql, [req.params.bookId], (err, result) => {
                if (err) { console.log(err) }
                else {
                    res.send(result)
                }
            })
        }
    })
});


module.exports = router;
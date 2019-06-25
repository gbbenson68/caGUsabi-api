
const express = require('express')
const Upload = require('../models/upload')
const multer = require('multer')
const multerUpload = multer({ dest: 'tempFiles/' })
const router = express.Router()
const { s3Upload, createParams, promiseReadFile } = require('../../lib/promiseS3Upload.js')

console.log(createParams)

// CREATE
// POST /examples
router.post('/uploads', multerUpload.single('file'), (req, res, next) => {
  console.log(req.file)
  promiseReadFile(req.file)
    .then(createParams)
    .then(s3Upload)
    .then(s3Response => Upload.create({ url: s3Response.Location }))
    .then(upload => {
      res.status(201).json({ upload: upload.toObject() })
    })
    .catch(next)
})
//   Upload.create(req.body.example)
//
//     .then(upload => {
//     })
//     .catch(next)
// })

module.exports = router

const express = require('express')
const Upload = require('../models/upload')
const multer = require('multer')
const multerUpload = multer({ dest: 'tempFiles/' })
const router = express.Router()
const { s3Upload, createParams, promiseReadFile } = require('../../lib/promiseS3Upload.js')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404

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

// INDEX
// GET /examples
router.get('/uploads', (req, res, next) => {
  Upload.find()
    .then(uploads => {
      // `examples` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return uploads.map(upload => upload.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(uploads => res.status(200).json({ uploads: uploads }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/uploads/:id', (req, res, next) => {
  Upload.findById(req.params.id)
    .then(handle404)
    .then(upload => {
      // throw an error if current user doesn't own `example`
      // requireOwnership(req, upload)
      // delete the example ONLY IF the above didn't throw
      upload.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router

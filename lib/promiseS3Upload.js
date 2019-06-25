require('dotenv').config()

const fs = require('fs')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const mime = require('mime')

const promiseReadFile = function (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file.path, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve([data, file])
    })
  })
}

const createParams = dataAndFile => ({
  ACL: 'public-read',
  Bucket: process.env.BUCKET_NAME,
  Key: Math.random().toString().split('.')[1],
  // crypto.randomBytes(8).toString('hex')
  // requires crypto
  ContentType: dataAndFile[1].mimetype,
  Body: dataAndFile[0]
})

const s3Upload = function (params) {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

module.exports = {
  promiseReadFile,
  createParams,
  s3Upload
}

// const chalk = require('chalk')
// console.log(chalk.blue('Hello Node.js'))

const http = require('http')
const path = require('path')
const fs = require('fs')


const server = http.createServer((req, res) => {

  let pathType = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
  let contentType = 'text/html'
  let ext = path.extname(pathType)

  if(!ext) {
    pathType += '.html' 
  }

  switch (ext) {
    case '.css':
      contentType = 'text/css'
      break;
    case '.js':
      contentType = 'text/javascript'
      break;
    default:
      contentType = 'text/html'
  }

  fs.readFile(pathType, 'utf-8', (err, data) => {
  
    if (err) {
      fs.readFile(path.join(__dirname, 'public', 'error.html'), 'utf-8', (err, data) => {
        if (err) {
          res.writeHead(500)
          res.end('Error')
        } else {
          res.writeHead(200, {
            'Content-Type': contentType
          })
          res.end(data)
        }
      })
    } else {
      res.writeHead(200, {
        'Content-Type': contentType
      })
      res.end(data)
    }
  })
})


const PORT = process.env.PORT || 3000

server.listen(PORT, (err) => {
  if (err) throw err
  console.log('Processing server...')
})
























// const server = http.createServer((req, res) => {
  
// let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
// const ext = path.extname(filePath)
// let textType = 'text/html'

// if (!ext) {
//   filePath += '.html'
// }

// switch (ext) {
//   case '.css':
//     textType = 'text/css'
//     break
//   case '.js':
//     textType = 'text/javascript'
//     break
//   default: 
//   textType = 'text/html'
// }

//   fs.readFile(filePath, 'utf-8', (err, content) => {
//     if(err) {
//       fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) => {
//         if(err) {
//           res.writeHead(500)
//           res.end('Error')
//         } else {
//           res.writeHead(200, {
//             'Content-type': textType
//           })
//           res.end(data)
//         }
//       })
//     } else {
//       res.writeHead(200, {
//         'Content-type': textType
//       })
//       res.end(content)
//     }
//   })

// })

// const PORT = process.env.PORT || 3000

// server.listen(PORT, () => {
//   console.log('Server started...')
// })
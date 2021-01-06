const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

// // fs.mkdir(path.join(__dirname, 'test'), err => {
// //   if(err) {
// //     throw err
// //   }
// //   console.log('Папка создана')
// // })

// const pathText = path.join(__dirname, 'test', 'text.txt')

// fs.writeFile(pathText, 'Hello new file!!!', err => {
//   if(err) {
//     throw err
//   }

//   console.log('Файл создан')
// })

// fs.appendFile(pathText, '\nSecond row', err => {
//   if(err) {
//     throw err
//   }

//   console.log('Текст добавлен')
// })

// fs.readFile(pathText, 'utf-8', (err, content) => {
//   if(err) {
//     throw err
//   }

//   console.log(content)
// })

// fs.writeFile(path.join(__dirname, 'os.js'), '', err => {
//   if(err) {
//     throw err
//   }

//   console.log('Файл создан')
// })

// fs.writeFile(path.join(__dirname, 'http.js'), '', err => {
//   if(err) {
//     throw err
//   }
//   console.log('Файл создан')
// }) 

// fs.readdir(path.join(__dirname), (err, files) => {

//   if (err) throw err

//   files.forEach(el => {

//     const ext = path.extname(el)

//     if (ext) {

//       fs.readFile(path.join(__dirname, el), 'utf-8', (err, content) => {
        
//         if (err) throw err

//         if (!files.includes(ext.substr(1))) {
//           fs.mkdir(path.join(__dirname, ext.substr(1)), err => {
//             if (err) throw err
//           })
//         }

//         fs.writeFile(path.join(__dirname, ext.substr(1), el), content, err => {

//           if (err) throw err

//           console.log('Файл создан')

//         })
//       })
//     }
//   })
// })

fs.readdir(path.join(__dirname, 'img/input'), (err, files) => {

  if (err) throw err

  files.forEach(el => {

    const ext = path.extname(el)?.substr(1)
    const isImage = ['png', 'jpeg', 'jpg', 'gif', 'tiff', 'bmp', 'webp'].some(el => el === ext)

    if (isImage) {
      sharp(path.join(__dirname, 'img/input', el))
      .resize(100, 50)
      .toFile(path.join(__dirname, 'img/output', el), (err, data) => {
        if (err) throw err
      })
    }
    
  })
})





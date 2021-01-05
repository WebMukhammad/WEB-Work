const os = require('os')

console.log('Операционная система: ', os.platform())

console.log('Архитектура процессора: ', os.arch())

console.log('Инфа по процессорам: ', os.cpus())

console.log('Объем свободной памяти: ', os.freemem())

console.log('Объем всей памяти: ', os.totalmem())

console.log('Домашняя директория: ', os.homedir())

console.log('Включен: ', os.uptime())
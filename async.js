let promise = ms => new Promise(resolve => setTimeOut(() => resolve()))

console.log(promise(3000))
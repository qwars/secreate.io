
const request = require('request');

const distance = Number( process.argv[ process.argv.length - 1 ] ) ||  1000

const startGenerator = () => request({
    url: "http://localhost:3000",
    method: "POST",
    json: true,
    body: Array( 20 ).fill(0).map( () => Array( 10 ).fill(0).map( () => Math.random() ).map( (n) => Math.random() * ( Number( n.toFixed( 1 ) ) === 0.5 ? 0 : ( n > 0.5 ? 1 : -1 ) ) ) )
}, (error, resp, body) => error && console.log(error) )



setInterval( startGenerator, distance )

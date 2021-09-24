const express = require('express')
const fs = require('fs')

const app = express()
const port = 3000
const health = '/tmp/health'

const logging = false
const LOGLINE = process.env.LOGLINE || "Something is happening!!! You got to wait!!!"
const LOGRATE = process.env.LOGRATE || 1000

healthCheck = async (res, endpoint, message) => {
    const path = `${health}/${endpoint}`;
    let check = false;
    await fs.access(path, fs.F_OK, (err) => {
        if (err) {
            res.status(404).send('Waiting for miracle!!!')
            return false;
        }
        console.log('Found health!!!')
        res.status(200).send(message)
    });
}

app.get('/', (req, res) => {
    res.send('Hello World!!!')
})

app.get('/health/readiness', (req, res) => {
    healthCheck(res, "readiness", "Resurrected!!!")
})

app.get('/health/liveness', async (req, res) => {
    healthCheck(res, "liveness", 'Alive!!!')
})



app.listen(port, () => {
    console.log(`log-box-readiness-liveness app listening at http://localhost:${port}`)
})

let sleepTime = 1000;
let i = 0;

let logBatch = 0;

function logEverySeconds(i) {
    setTimeout(() => {
        for (var i = 0; i < LOGRATE; i++) {
            console.log(LOGLINE, ' [', i, '/', logBatch, ']');
        }
        logEverySeconds(++i);
        logBatch = logBatch + 1;
    }, sleepTime)
}
logEverySeconds(0);


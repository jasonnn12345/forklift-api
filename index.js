const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors'); 
const app = express();

const port = 9000

const forkliftRoute = require('./router/forklift');
const penyewaRoute = require('./router/penyewa');
const penyewaanRoute = require('./router/penyewaan');

app.use(cors());
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use('/forklift', forkliftRoute)
app.use('/penyewa', penyewaRoute)
app.use('/penyewaan', penyewaanRoute)

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})

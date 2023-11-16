const express = require('express')
const eexphbs = require('express-handlebars')

app.engine = express()

const app = express()
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.send('eae')
})

app.listen(3000)
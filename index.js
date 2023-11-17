const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.post('/create', (req, res) => {
    const description = req.body.description
    const completed = 0

    const sql = `
        insert into tasks(description, completed)
        values ('${description}', '${completed}')
    `

    connection.query(sql, (error) => {
        if (error) {
            return console.log(error)
        }

        res.redirect('/')
        
    })

})

app.get('/', (req, res) => {
    const sql = 'select * from tasks'

    connection.query(sql, (error) => {
        if (error) {
            return console.log(error)
        }

        const tasks = datas.map((data) => {
            return {
                id: data.id,
                description: data.description,
                completed: data.completed === 0 ? false : true
            }
        })

        res.render('home')
        
    })
 
})

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'todoapp',
    port: 3306
})

connection.connect((error) => {
    if (error) {
        return console.log(error)
    }

    console.log("I'm connected on MySQL")

    app.listen(3000, () => {
        console.log('Server is running on Port: 3000')
    })

})
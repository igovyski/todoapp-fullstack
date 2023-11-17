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

// rotas
app.post('/complete', (req, res) => {
    const id = req.body.id

    const sql = `
        update tasks
        set completed = 1
        where id = ${id}
    `

    connection.query(sql, (error) => {
        if (error) {
            return console.log(error)
        }

        res.redirect('/')
        
    })

})

app.post('/decomplete', (req, res) => {
    const id = req.body.id

    const sql = `
        update tasks
        set completed = 0
        where id = ${id}
    `
    
    connection.query(sql, (error) => {
        if (error) {
            return console.log(error)
        }

        res.redirect('/')
        
    })

})

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

app.get('/completed', (req, res) => {
    const sql = 'select * from tasks where completed = 1'

    connection.query(sql, (error, datas) => {
        if (error) {
            return console.log(error)
        }

        const tasks = datas.map((data) => {
            return {
                id: data.id,
                description: data.description,
                completed: true
            }
        })

        const completedTasks = tasks.length

        res.render('completed', { tasks, completedTasks })
        
    })
 
})

app.get('/actives', (req, res) => {
    const sql = 'select * from tasks where completed = 0'

    connection.query(sql, (error, datas) => {
        if (error) {
            return console.log(error)
        }

        const tasks = datas.map((data) => {
            return {
                id: data.id,
                description: data.description,
                completed: false
            }
        })

        const activeTasks = tasks.length

        res.render('actives', { tasks, activeTasks })
        
    })
 
})

app.get('/', (req, res) => {
    const sql = 'select * from tasks'

    connection.query(sql, (error, datas) => {
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

        const activeTasks = tasks.filter((task) => {
            return task.completed === false && task
        })

        const quantityActiveTasks = activeTasks.length

        res.render('home', { tasks, quantityActiveTasks })
        
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
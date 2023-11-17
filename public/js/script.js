function completeTask(id) {
    fetch('http://localhost:3000/complete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })

    window.location.reload()
}

function changeTheme() {
    const theme = localStorage.getItem('theme')
    const body = document.querySelector('body')
    const button = document.querySelector('.theme-button')

    if (theme) {
        let newTheme

        if (theme === 'light') {
            newTheme = 'dark'
            button.innerHTML = `<img src="/images/sun-icon.png" alt="sun icon">`
            body.classList.remove('light')
            body.classList.add('dark')
        } else {
            newTheme = 'light'
            button.innerHTML = `<img src="/images/moon-icon.png" alt="moon icon">`
            body.classList.remove('dark')
            body.classList.add('light')
        }

        localStorage.setItem('theme', newTheme)
        return
    }

    localStorage.setItem('theme', 'dark')
    body.classList.add('dark')
}

function verifyTheme() {
    const theme = localStorage.getItem('theme')
    const body = document.querySelector('body')

    if (theme == 'dark') {
        body.classList.add('dark')
        button.innerHTML = `<img src="/images/sun-icon.png" alt="sun icon">`
    } else {
        body.classList.add('light')
        button.innerHTML = `<img src="/images/moon-icon.png" alt="moon icon">`
    }
}

verifyTheme()
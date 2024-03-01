export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()


        console.log(event.target)

        const activeLink = document.querySelectorAll('nav a.bold')
        activeLink.forEach((item) => {
            console.log(item.classList.remove('bold'))
        })
        
        event.target.className = 'bold'
        
        window.history.pushState({}, "", event.target.href)
    
        this.handle()
    }

    handle() {
        const { pathname } = window.location 
        const route = this.routes[pathname] || this.routes[404]
        const pathClass = pathname.replace('/', "")
        let navItem = document.querySelectorAll('nav a')

        document.documentElement.className = ''
        document.documentElement.className = pathClass


        fetch(route)
        .then(data => data.text())
        .then(html => {
        document.querySelector('#app').innerHTML = html
        })
    }
 }

 export default new Router()

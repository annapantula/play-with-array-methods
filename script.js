const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleMoneyBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')
const logUsersBtn = document.getElementById('log-users')

let data = []


// fetch randon user and add money
const getRandomUser = async () => {
    const res = await fetch('https://randomuser.me/api')
    const resData = await res.json()

    const user = resData.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    data.push(newUser)
    updateDOM()
}

const getExistingUsers = () => {
    console.log(data)
}

const updateDOM = (usersData = data) => {
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'
    usersData.forEach((user) => {
        const el = document.createElement('div')
        el.classList.add('person')
        el.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`
        main.appendChild(el)
    })
}

const formatMoney = (amount) => {
    return `$ ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}

const doubleMoney = () => {
    data = data.map((user)=> {
        return {
            ...user, 
            money: user.money * 2
        }
    })
    console.log(data)
    updateDOM(data)
}

const sortByRichest = () => {
    data.sort((user1, user2) => {
        if (user2.money > user1.money) {
            return 1
        } else if (user2.money === user1.money) {
            return 0
        } else {
            return -1
        }
    })
    updateDOM(data)
}

const showMillionaires = () => {
    const millionaires = data.filter((user) => {
        return user.money > 999999.99
    })

    updateDOM(millionaires)
}

const showWealth = () => {
    let totalWealth = data.reduce((prevVal, curVal) => {
        return {money: curVal.money + prevVal.money}
    }, {money: 0})
    console.log(totalWealth)
    const totalWealthEl = document.createElement('div')
    totalWealthEl.classList.add('person')
    totalWealthEl.innerHTML = `<h3><strong>Total Wealth : </strong> ${formatMoney(totalWealth.money)}<h3>`
    main.appendChild(totalWealthEl)

}

addUserBtn.addEventListener('click', getRandomUser)
doubleMoneyBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMillionairesBtn.addEventListener('click', showMillionaires)
calculateWealthBtn.addEventListener('click', showWealth)

logUsersBtn.addEventListener('click', getExistingUsers)

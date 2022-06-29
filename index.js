const form = document.getElementById('search-form')
const container = document.querySelector('.card-container')
const incomeRow = document.getElementById('income')
const states = document.getElementById('states')
const card = document.querySelector('#card')


//EVENT LISTENERS
form.addEventListener('submit', handleSubmit)


//EVENT HANDLERS
function handleSubmit(e){
    e.preventDefault()

    let city = e.target.city.value
    let st = e.target.states.value
    let state = states.options[states.selectedIndex].text

    renderCard(city, st, state)

    form.reset()
}


//RENDER UPDATES
function updateIncome(cityObj){
    let income = cityObj.data.slice(-1)['0']['Household Income by Race'].toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        });

      let incomeData = document.querySelector('#income .data')
      incomeData.textContent = income
}

function updateProperty(cityObj){
    let propertyValue = cityObj.data.slice(-1)['0']['Property Value'].toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      });

      let propertyData = document.querySelector('#property .data')
      propertyData.textContent = propertyValue
}

function updatePopulation(cityObj){
    let population = cityObj.data.slice(-1)['0']['Population'].toLocaleString()

    let populationData = document.querySelector('#population .data')
    populationData.textContent = population
}

function updateAge(cityObj){
    let medianAge = cityObj.data.slice(-1)['0']['Median Age']

    let ageData = document.querySelector('#age .data')
    ageData.textContent = `${medianAge} years`
}




//RENDER NEW CARD
function renderCard(city, st, state){

    //Create card that renders after form submission
    const newCard = document.createElement('div')
    newCard.id = 'card'
    container.append(newCard)
    
    //Create close button
    const closeButton = document.createElement('div')
    closeButton.className = 'close-btn'
    newCard.append(closeButton)

    const closeIcon = document.createElement('img')
    closeIcon.className = 'icon'
    closeIcon.src = "./media/xmark-solid.png"
    closeButton.append(closeIcon)

    //Create Card Header (Location Info)
    const cardHeader = document.createElement('div')
    cardHeader.className = 'card-header'
    
        const h3 = document.createElement('h3')
        h3.textContent = city
        h3.className = 'city'
        cardHeader.append(h3)

        const h4 = document.createElement('h4')
        h4.textContent = `${state}, USA`
        h4.className = 'state'
        cardHeader.append(h4)

        const stateFlag = document.createElement('img')
        stateFlag.src = `https://www.states101.com/img/flags/svg/${state.toLowerCase()}.svg`
        stateFlag.id = 'flag'
        cardHeader.append(stateFlag)

        newCard.append(cardHeader)

    //Line of seperation
    const hr = document.createElement('hr')
    newCard.append(hr)

    //Create Data Table pulled from API
    const table = document.createElement('table')
    table.className = 'data-table'
    newCard.append(table)



    let location = `${city.replace(' ','-')}-${st}`.toLowerCase()

    getIncomeData(location)
    getPropertyData(location)
    getPopulation(location)
    getAge(location)
}


//FETCH REQUESTS
//GET
function getIncomeData(location){
    fetch(`https://datausa.io/api/data?measure=Household%20Income%20by%20Race,Household%20Income%20by%20Race%20Moe&Geography=${location}:similar&year=latest`)
        .then(res => res.json())
        .then(cityObj => updateIncome(cityObj))
}

function getPropertyData(location){
    fetch(`https://datausa.io/api/data?measure=Property%20Value&Geography=${location}:parents&year=latest`)
        .then(res => res.json())
        .then(cityObj => updateProperty(cityObj))
}

function getPopulation(location){
    fetch(`https://datausa.io/api/data?measure=Population&Geography=${location}:parents&year=latest`)
        .then(res => res.json())
        .then(cityObj => updatePopulation(cityObj))
}

function getAge(location){
    fetch(`https://datausa.io/api/data?measure=Median%20Age&Geography=${location}:parents&year=latest`)
        .then(res => res.json())
        .then(cityObj => updateAge(cityObj))
}


//POST
function postCard(newToyObject){
    fetch(`http://localhost:3000/toys`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        Accept:'application/json'
      },
      body: JSON.stringify(newToyObject)
    })
    .then(res => res.json())
    .then(toy => console.log(toy))
  }

  
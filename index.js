const form = document.getElementById('search-form')
const container = document.querySelector('.card-container')
const states = document.getElementById('states')
const card = document.querySelector('#card')


//EVENT LISTENERS
form.addEventListener('submit', handleSubmit)


function handleSubmit(e){
    e.preventDefault()

    //create location object (posts to db.json) from search input
    let newLocationObject = {
        city: e.target.city.value,
        st: e.target.states.value,
        state: states.options[states.selectedIndex].text,
        stateStr: `${e.target.city.value.replace(' ','-')}-${e.target.states.value}`.toLowerCase(),
    }

    //Rendering card to page
    renderCard(newLocationObject)
    postLocation(newLocationObject)

    // //Resetting form
    form.reset()
}



//RENDER NEW CARD
function renderCard(location){
    
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

    //Create Card Header (location Info)
    const cardHeader = document.createElement('div')
    cardHeader.className = 'card-header'
    
        const h3 = document.createElement('h3')
        h3.textContent = location.city
        h3.className = 'city'
        cardHeader.append(h3)

        const h4 = document.createElement('h4')
        h4.textContent = `${location.state}, USA`
        h4.className = 'state'
        cardHeader.append(h4)

        const stateFlag = document.createElement('img')
        stateFlag.src = `https://www.states101.com/img/flags/svg/${location.state.toLowerCase().replace(' ','-')}.svg`
        stateFlag.id = 'flag'
        cardHeader.append(stateFlag)

        newCard.append(cardHeader)

    //Line of seperation
    const hr = document.createElement('hr')
    newCard.append(hr)

    const dataDiv = document.createElement('div')
    const incomeP = document.createElement('p')
    const ageP = document.createElement('p')
    const propertyP = document.createElement('p')
    const populationP = document.createElement('p')

        dataDiv.append(incomeP, ageP, propertyP, populationP)
        newCard.append(dataDiv)

        incomeP.innerHTML = `
        Median Income: <span class='data'>${getIncomeData(location.stateStr)}</span>
        `

        ageP.innerHTML = `
        Median Age: <span class='data'>${getAge(location.stateStr)}</span>
        `

        propertyP.innerHTML = `
        Median Property Value: <span class='data'>${getPropertyData(location.stateStr)}</span>
        `

        populationP.innerHTML = `
        MSA Population: <span class='data'>${getPropertyData(location.stateStr)}</span>
        `
}


//FETCH REQUESTS
//GET
function getIncomeData(location){
    fetch(`https://datausa.io/api/data?measure=Household%20Income%20by%20Race,Household%20Income%20by%20Race%20Moe&Geography=${location.stateStr}:similar&year=latest`)
        .then(res => res.json())
        .then(d => updateIncome(d))
}

function getPropertyData(location){
    fetch(`https://datausa.io/api/data?measure=Property%20Value&Geography=${location.stateStr}:parents&year=latest`)
        .then(res => res.json())
        .then(d => updateProperty(d))
}

function getPopulation(location){
    fetch(`https://datausa.io/api/data?measure=Population&Geography=${location.stateStr}:parents&year=latest`)
        .then(res => res.json())
        .then(d => updatePopulation(d))
}

function getAge(stateStr){
    fetch(`https://datausa.io/api/data?measure=Median%20Age&Geography=${stateStr}:parents&year=latest`)
        .then(response => response.json())
        .then(ageData => updateAge(ageData))
}


//RENDER UPDATES
function updateIncome(d){
    let householdIncome = d.data.slice(-1)['0']['Household Income by Race'].toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        });

      return householdIncome;
}

function updateProperty(d){
    let propertyValue = d.data.slice(-1)['0']['Property Value'].toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      });

    return propertyValue;
}

function updatePopulation(d){
    let population = d.data.slice(-1)['0']['Population'].toLocaleString()

    return population;
}

function updateAge(ageData){
    return ageData.data.slice(-1)['0']['Median Age']
}

//POST
function postLocation(location){
    fetch(`http://localhost:3000/locations`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        Accept:'application/json'
      },
      body: JSON.stringify(location)
    })
    .then(res => res.json())
    .then(data => {console.log(data)})
  }
  
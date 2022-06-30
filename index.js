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
    getData(newLocationObject, renderCard)

    // //Resetting form
    form.reset()
}



//RENDER NEW CARD
function renderCard(location, income, age, property, population){
    
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

    //Delete entire card when close icon is clicked
    closeButton.addEventListener('click', (e) => console.log(e.target.parentElement.parentElement.remove()))

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
        dataDiv.className = 'data-div'
        newCard.append(dataDiv)
            
        incomeP.innerHTML = `
        Median Income: <span class='data'>${income}</span>
        `

        ageP.innerHTML = `
        Median Age: <span class='data'>${age} years</span>
        `

        propertyP.innerHTML = `
        Median Property Value: <span class='data'>${property}</span>
        `

        populationP.innerHTML = `
        MSA Population: <span class='data'>${population}</span>
        `

}


//FETCH REQUESTS
//GET DATA USING ASYNC FUNCTIONS & AWAIT
async function getData(loc, callback){
    const location = loc.stateStr;
    let incomeData, ageData, propertyData, populationData;
    try {
        incomeData = await fetch(`https://datausa.io/api/data?measure=Household%20Income%20by%20Race,Household%20Income%20by%20Race%20Moe&Geography=${location}:similar&year=latest`)
            .then(res => res.json())
            .then(d => updateIncome(d))

        ageData = await fetch(`https://datausa.io/api/data?measure=Median%20Age&Geography=${location}:parents&year=latest`)
            .then(response => response.json())
            .then(d => updateAge(d))

        propertyData = await fetch(`https://datausa.io/api/data?measure=Property%20Value&Geography=${location}:parents&year=latest`)
            .then(res => res.json())
            .then(d => updateProperty(d))

        populationData = await fetch(`https://datausa.io/api/data?measure=Population&Geography=${location}:parents&year=latest`)
            .then(res => res.json())
            .then(d => updatePopulation(d))
    } catch(error){
        console.log(error)
    } finally{
        callback(loc, incomeData, ageData, propertyData, populationData)
    }
}



//RENDER UPDATES
function updateIncome(d){
    const householdIncome = d.data.slice(-1)['0']['Household Income by Race'].toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        });
        // console.log(householdIncome)
      return householdIncome;
}

function updateAge(d){
    const age = d.data.slice(-1)['0']['Median Age']
    // console.log(age)
    return age;
}

function updateProperty(d){
    const propertyValue = d.data.slice(-1)['0']['Property Value'].toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      });
      
    return propertyValue;
}

function updatePopulation(d){
    const population = d.data.slice(-1)['0']['Population'].toLocaleString()

    return population;
}


//PRE-LOADED LOCATIONS
function preloadedLocations(city, st, state){

    let preloadedLocation = {
        city: city,
        st: st,
        state: state,
        stateStr: `${city.replace(' ','-').toLowerCase()}-${st.toLowerCase()}`,
    }

    //Rendering card to page
    getData(preloadedLocation, renderCard)
}

preloadedLocations('Denver', 'CO', 'Colorado')
preloadedLocations('San Francisco', 'CA', 'California')
// preloadedLocations('Bozeman', 'MT', 'Montana')
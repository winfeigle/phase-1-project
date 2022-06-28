const form = document.getElementById('search-form')
const incomeRow = document.getElementById('income')


//EVENT LISTENERS
form.addEventListener('submit', handleSubmit)


//EVENT HANDLERS
function handleSubmit(e){
    e.preventDefault()
    let city = e.target.city.value
    let state = e.target.state.value
    let location = `${city}-${state}`.toLowerCase()

    console.log(location)
    getIncomeData(location)
    getPropertyData(location)
    getPopulation(location)

    form.reset()
}

function updateIncome(cityObj){
    let income = cityObj.data.slice(-1)['0']['Household Income by Race'].toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      let incomeData = document.querySelector('#income .data')
      incomeData.textContent = income
}

function updateProperty(cityObj){
    let propertyValue = cityObj.data.slice(-1)['0']['Property Value'].toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      let propertyData = document.querySelector('#property .data')
      propertyData.textContent = propertyValue
}

function updatePopulation(cityObj){
    let population = cityObj.data.slice(-1)['0']['Population'].toLocaleString()

    let populationData = document.querySelector('#population .data')
    populationData.textContent = population
}




//RENDER NEW CARD
function renderCard(location){

}


//FETCH REQUESTS
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
        .then(cityObj => {
            updatePopulation(cityObj)
        })
}



// //State Flag Image
// fetch(`https://www.states101.com/img/flags/svg/${state}.svg`)

// //Median Household Income
// fetch(`https://datausa.io/api/data?measure=Household%20Income%20by%20Race,Household%20Income%20by%20Race%20Moe&Geography=${city}-${stateAbbreviation}:similar&year=latest`)

// //Median Property value
// fetch(`https://datausa.io/api/data?measure=Property%20Value&Geography=${city}-${stateAbbreviation}:parents&year=latest`)
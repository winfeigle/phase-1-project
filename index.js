const form = document.getElementById('search-form')
const incomeRow = document.getElementById('income')


// //State Flag Image
// fetch(`https://www.states101.com/img/flags/svg/${state}.svg`)

// //Median Household Income
// fetch(`https://datausa.io/api/data?measure=Household%20Income%20by%20Race,Household%20Income%20by%20Race%20Moe&Geography=${city}-${stateAbbreviation}:similar&year=latest`)

// //Median Property value
// fetch(`https://datausa.io/api/data?measure=Property%20Value&Geography=${city}-${stateAbbreviation}:parents&year=latest`)


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

    form.reset()
}

function updateIncome(cityObj){
    let income = cityObj.data.slice(-1)['0']['Household Income by Race'].toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      let incomeData = document.createElement('td')
      incomeData.textContent = income

      incomeRow.appendChild(incomeData)

      //update Income on card
      console.log(income)
    
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

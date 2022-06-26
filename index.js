const card = document.getElementByClassName('card')

//State Flag Image
fetch(`https://www.states101.com/img/flags/svg/${state}.svg`)

//Median Household Income
fetch(`https://datausa.io/api/data?measure=Household%20Income%20by%20Race,Household%20Income%20by%20Race%20Moe&Geography=${city}-${stateAbbreviation}:similar&year=latest`)

//Median Property value
fetch(`https://datausa.io/api/data?measure=Property%20Value&Geography=${city}-${stateAbbreviation}:parents&year=latest`)



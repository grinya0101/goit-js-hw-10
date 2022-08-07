export default function fetchCountries(name) { 
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)    
    .then(response => {      
       if (!response.ok) {        
           throw new Error('Что-то пошло не так', response.status);      
       }      
       return response.json();   
    })}
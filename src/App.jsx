import { useEffect, useState } from "react";

// FIRST OF ALL, YOU NEED TO GET THE API AND RENDER THE IMAGES WITH THE NAMES


// async function getData(location) {
//     try{
//         const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=LA8QLDL4HNR6XYBUT77BTHZLT&contentType=json`;
//         const response = await fetch(url, {mode: 'cors'});

//         if(!response.ok){
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Data object", );
//         processData(data);
//     } catch(error){
//         console.error(error);
//         // alert("There was an error!");
//     }
// }

// function processData(data) {
//     const dataObject = { 
//         city: data.resolvedAddress,
//         date: getTodayDate(),
//         temperature: `${data.days[0].temp}°C`,
//         minTemperature: data.days[0].tempmin,
//         maxTemperature: data.days[0].tempmax,
//         feelsLike: data.days[0].feelslike,
//         humidity: data.days[0].humidity,
//         condition: data.days[0].conditions,
//         description: data.days[0].description,
//         windSpeed: data.days[0].windspeed,
//         icon: data.days[0].icon
//     }
//     cleanRender();
//     renderData(dataObject);
// }

export function RenderContainer() {
    const [pokemon, setPokemon] = useState([]);
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                const basicPokemonArr = [];
                for (let index = 0; index < 10; index++) {
                    basicPokemonArr.push(data.results[index])
                }


                fetchDetailedData(basicPokemonArr);
            } catch (error) {
                console.error(error);
            }
        }

        function fetchDetailedData(arr) {
            const detailedPokemonArr = [];

            arr.map(el => {
                async function fetchAllData() {
                    try {
                        const url = el.url;
                        const response = await fetch(url);
                        const data = await response.json();
                        detailedPokemonArr.push(data);
                    } catch (error) {
                        console.error(error);
                    }
                }

                fetchAllData();
            })
        }

        fetchData();
    }, []);

    return (
        <div id="pokemon-container">
            {pokemon.map(el => {
                return (
                    <p>{el.name}</p>
                )
            })}
        </div>
    )
}

// export function RenderPokemonArr(arr){
//         return(
//             <div id="pokemon-container">
//                 {arr.map(el => {
//                     return(
//                         <p>{el}</p>
//                     )
//                 })}
//             </div>
//         )
//     }
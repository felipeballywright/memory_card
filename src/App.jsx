import { useEffect, useState } from "react";

// FIRST OF ALL, YOU NEED TO GET THE API AND RENDER THE IMAGES WITH THE NAMES

export function RenderContainer() {
    const [pokemon, setPokemon] = useState([]);
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

    useEffect(() => {
        async function fetchMainAPI() {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                const selectedData = data.results.slice(0, 10)

                fetchAllIndividualAPI(selectedData);
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchIndividualAPI(obj) {
            try {
                const response = await fetch(obj.url);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchAllIndividualAPI(arr) {
            const response = arr.map(el => fetchIndividualAPI(el))
            const data = await Promise.all(response);

            console.log("After:", data);
        }

        fetchMainAPI();
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

import { useEffect, useState } from "react";

// WORK ON THE POKEMON COMPONENT ONCLICK FUNCTION
// BUILD THE FUNCTIONALITY FOR THE GAME

function PokemonComponent({image, name}) {
    return (
        <div className="pokemon-card" onClick={() => {console.log("You clicked me!")}}>
            <img src={image}></img>
            <h2>{name}</h2>
        </div>
    )
}

export function RenderContainer() {
    const [pokemon, setPokemon] = useState([]);
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

    useEffect(() => {
        async function fetchMainAPI() {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                const selectedData = data.results.slice(0, 12)

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

            setPokemon(data.map(el => {
                // console.log("Name and image:", el.name, el.sprites.front_default);

                return {
                    name: el.name,
                    image: el.sprites.front_default,
                    key: crypto.randomUUID()
                }
            }))

            // console.log("After:", data);
            // console.log("State:", pokemon);
        }

        fetchMainAPI();
    }, []);

    return (
        <div id="pokemon-container">
            {pokemon.map(el => {
                console.log("Render image is", el.image);

                return (
                    <PokemonComponent
                        name={el.name}
                        image={el.image}
                        key={el.key}
                    />
                )
            })}
        </div>
    )
}

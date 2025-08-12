import { useEffect, useState } from "react";

// WORK ON THE POKEMON COMPONENT ONCLICK FUNCTION
// BUILD THE FUNCTIONALITY FOR THE GAME

function PokemonComponent({ image, name, selectFunction, allInfo }) {
    return (
        <div className="pokemon-card" onClick={() => selectFunction(allInfo)}>
            <img src={image}></img>
            <h2>{name}</h2>
        </div>
    )
}

export function RenderContainer() {
    const [pokemon, setPokemon] = useState([]);
    const [currentPokemon, setCurrentPokemon] = useState(
        { key: "", score: 0 }
    );
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
            const shuffledData = await Promise.all(shuffleArray(data));
            // console.log("shuffledData", shuffledData)

            setPokemon(shuffledData.map(el => {
                return {
                    name: el.name,
                    image: el.sprites.front_default,
                    key: crypto.randomUUID()
                }
            }))
        }
        fetchMainAPI();
    }, [currentPokemon]);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function handlePokemonSelect(selection) {
        console.log("currentPokemon key:", currentPokemon);

        if (currentPokemon.key === "") {
            setCurrentPokemon((prev) => {
                return { ...prev, key: selection.key }
            })
        } else if (currentPokemon.key === selection.key) {
            setCurrentPokemon((prev) => {
                return { ...prev, score: prev.score + 1 }
            })
        }
    }

    return (
        <div id="pokemon-container">
            {pokemon.map(el => {
                return (
                    <PokemonComponent
                        name={el.name}
                        image={el.image}
                        selectFunction={(el) => { handlePokemonSelect(el) }}
                        allInfo={el}
                        key={el.key}
                    />
                )
            })}
        </div>
    )
}

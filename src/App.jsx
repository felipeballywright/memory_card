import { useEffect, useState } from "react";

// Separate the logic into (fetch data) and (re-shuffle local copy of the fetched data)

function PokemonComponent({ image, name, selectFunction, allInfo }) {
    return (
        <div className="pokemon-card" onClick={() => selectFunction(allInfo)}>
            <img src={image}></img>
            <h2>{name}</h2>
        </div>
    )
}

export function RenderContainer() {
    const [fetchedPokemonList, setFetchedPokemonList] = useState([]);
    const [pokemon, setPokemon] = useState([]);
    const [currentPokemon, setCurrentPokemon] = useState(
        { name: "", score: "0" }
    );
    const [highestScore, setHighestScore] = useState(0)

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

        async function fetchAllIndividualAPI(arr) {
            const response = arr.map(el => fetchIndividualAPI(el))
            const data = await Promise.all(response);
            console.log("data", data);
            
            const dataArr = data.map(el => {
                return{
                    name: el.name,
                    image: el.sprites.front_default,
                    key: el.id
                }
            })

            setFetchedPokemonList(dataArr);
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


        fetchMainAPI();
    }, []);

    useEffect(() => {
        setPokemon(() => shuffleArray([...fetchedPokemonList]))
    }, [fetchedPokemonList, currentPokemon.score])

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        if (currentPokemon.score > highestScore) {
            setHighestScore(currentPokemon.score)
        }
    }, [currentPokemon.score])

    function handlePokemonSelect(selection) {
        console.log("currentPokemon name:", currentPokemon);

        if (currentPokemon.name === "") {
            setCurrentPokemon(() => {
                return { name: selection.name, score: 0 }
            })
        } else if (currentPokemon.name === selection.name) {
            setCurrentPokemon((prev) => {
                return { ...prev, score: prev.score + 1 }
            })
        } else {
            setCurrentPokemon(() => {
                return { name: "", score: 0 }
            })
        }
    }

    return (
        <>
            <header id='header'>
                <div id="header-left">
                    <h1>Pokemon Memory Game</h1>
                    <p>Get points by clicking on an image but don't click on any more than once!</p>
                </div>
                <div id="header-right">
                    <h3>Current score: {currentPokemon.score}</h3>
                    <h3>Highest score: {highestScore}</h3>
                </div>
            </header>
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
        </>
    )
}

import React from 'react'
import axios from 'axios';
import './searchrecipe.css'


const SearchMeal = () => {

    const [inputValue, setInputValue] = React.useState("");
    const [recipeData, setRecipeData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [results, setResults] = React.useState(false)
    const [resultValue, setResultValue] = React.useState("")

    const getRecipe = async (name) => {

        setLoading(true)
        const { data } = await axios.get(process.env.REACT_APP_API, {
            params: {
                s: name
            }
        })
        setRecipeData(data.meals)
        setLoading(false)
        setResults(true)

    }


    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSearch = () => {
        getRecipe(inputValue);
        setResultValue(inputValue)
        setInputValue("")

    }
    return (
        <>
            <div>
                <input
                    className="form-control container p-2  w-25"
                    onChange={(e) => {
                        handleChange(e)
                    }}
                    value={inputValue}
                    type="text" placeholder="Search Recipe" required />
                <button
                    className="btn btn-danger my-2 w-25"
                    onClick={() => {
                        handleSearch()
                    }}
                >Search</button>

                <div className="text-info h5 my-4"> {loading ? "Loading..." : null}</div>
                <div className="h4 text-warning">
                    {results ? `Showing results for : ${resultValue}` : null}
                </div>
                <div className="grid container">
                    {recipeData.map((e) => (
                        <div
                            className="border 0 shadow m-2 "
                            key={e.idMeal}>

                            <img className="img-fluid 0 shadow" src={e.strMealThumb} alt="Recipe" />
                            <div className="h5 text-danger mt-2"> Recipe Name : {e.strMeal} </div>
                            <div className="h5 text-info mt-2">Category : {e.strCategory} </div>
                            <div className="h4 text-success  mt-2">Area : {e.strArea} </div>
                        </div>
                    ))}
                    {console.log('recipeData.strMeal:', recipeData.strId)}
                </div>

            </div>
        </>
    )
}

export { SearchMeal }

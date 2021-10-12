import React from 'react'
import { useDispatch, connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOrder, getOrderByScore, filterByDiet, getTypes, getRecipes } from "../../actions/index"
import { NavLink } from 'react-router-dom';
import "./Filter.css"

function Filter(props) {
    function getTypesFunction() {
        props.getTypes()
    }
    useEffect(() => {
        getTypesFunction()
    }, [])

    const dispatch = useDispatch();


    const [filterDiets, setFilterDiets] = useState('');

    function handleOrder(e) {
        dispatch(getOrder(e.target.value));
    }

    function handleOrderByScore(e) {
        dispatch(getOrderByScore(e.target.value));
    }

    function handleFilter(e) {
        setFilterDiets(e.target.value)
        dispatch(filterByDiet(e.target.value.toLowerCase()))
    }

    function handleRefresh(e) {
        dispatch(getRecipes())
    }

    return (
        <div>
            <div className="filter">
                <NavLink to='/recipe'>
                    <button className="creacion">
                        <b>Create Recipe</b>
                    </button>
                </NavLink>
                <form className="espaciado">
                    <p>Order by Score</p>
                    <select onChange={handleOrderByScore} className="margen">
                        <option value='Reset'>Unordered</option>
                        <option value='MAXMIN'>Higher</option>
                        <option value='MINMAX'>Lower</option>
                    </select>
                </form>
                <form className="espaciado">
                    <p>Order A-Z / Z-A</p>
                    <select onChange={handleOrder} className="margen">
                        <option value='Reset'>Unordered</option>
                        <option value='ASC'>A-Z</option>
                        <option value='DESC'>Z-A</option>
                    </select>
                </form>
                <form className="espaciado">
                    <p>Filter by Diet Type</p>
                    <select onChange={handleFilter} className="margen">
                        <option value='All'>All</option>
                        {props.diets.length !== 0 ? props.diets.map((e) => (
                            <option key={e.id} value={e.name} > {e.name} </option>
                        )) : <option>Loading</option>}</select>
                </form>
                {props.recipes.length < props.recipesOriginal.length &&
                    (<button onClick={handleRefresh} className="refresh">Clear</button>)
                }
            </div>
        </div >
    )
}

const mapStateToProps = state => {
    return {
        diets: state.diets,
        recipes: state.recipes,
        recipesOriginal: state.recipesOriginal
    }
}


export default connect(mapStateToProps, { getTypes })(Filter)
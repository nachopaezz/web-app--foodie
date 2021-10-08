import React from 'react'
import { useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import { getDetail } from '../../actions/index';
import "../../index.css";
import { NavLink } from 'react-router-dom';

function RecipeDetail(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [])

    return (
        <div>
            {props.recipeId.length !== 0 ?
                <div className="detail">
                    <div>
                        <h2 className="nombre">
                            {props.recipeId.title}
                        </h2>
                    </div>
                    <div className="dietsPhotoSummary">
                        <div className="dietsPhoto">
                            <img src={props.recipeId.image} alt={"img"} className="fotito" />
                            <p className="dietsDetail">Types of Diet: {props.recipeId.diets.length !== 0 ? typeof props.recipeId.diets[0] === "object" ?
                                props.recipeId.diets.map(diet => Object.values(diet)).join(", ") : props.recipeId.diets.map(diet => diet.charAt(0).toUpperCase() + diet.substr(1)).join(", ") : "Not available"}</p>
                        </div>
                        <div className="summary">
                            <p className="summaryTitle">Summary: </p><div dangerouslySetInnerHTML={{ __html: props.recipeId.summary }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="scoresDetail">
                            <p>Score: {props.recipeId.spoonacularScore}</p>
                            <p>Health Score: {props.recipeId.healthScore}</p>
                        </div>
                        <div className="stepsInstructions">
                            <p class="stepsLabel">Steps: </p><div className="stepsInstructions" dangerouslySetInnerHTML={{ __html: props.recipeId.instructions ? props.recipeId.instructions : "Not available" }}></div>
                        </div>
                    </div>
                </div>
                : <h1 className="loading1">Loading ...</h1>
            }
            <NavLink to='/home'>
                <button className="botonBackDetail">Back</button>
            </NavLink>
        </div>
    );
}


function mapStateToProps(state) {
    return {
        recipeId: state.recipeDetail
    }
}

export default connect(mapStateToProps, { getDetail })(RecipeDetail);
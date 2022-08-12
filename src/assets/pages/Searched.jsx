import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Searched = () => {
	const params = useParams();
	const [searchRecipes, setSearchRecipes] = useState([])
	const getSearched = (name) => {
		fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_REACT_APP_API_KEY}&number=10&query=${name}`)
			.then(res => res.json())
			.then(data => {
				console.log(data)
				setSearchRecipes(data.results)
			});
		}
	
	useEffect(() => {
		getSearched(params.search)
	}, [params.search])
	
	return (
		<Grid>
			{searchRecipes.map((recipe) =>{
				return (
					<Card key={recipe.id}>
						<Link to={`/recipe/${recipe.id}`}>
							<img src={recipe.image} alt={recipe.title} />
							<h4>{recipe.title}</h4>
						</Link>
					</Card>
				)
			})}
		</Grid>
	)
}

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
	grid-gap: 3rem;
`;
const Card = styled.div`
	img{
		width: 100%;
		border-radius: 2rem;
	}
	a{
		text-decoration: none;
	}
	h4{
		text-align: center;
		padding: 1rem;
	}
`; 

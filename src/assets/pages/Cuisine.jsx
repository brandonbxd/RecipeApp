import { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import styled from 'styled-components'

import {motion} from 'framer-motion';


export const Cuisine = () => {
	const [cuisine, setCuisine] = useState([]);
	const params = useParams();

	const getCuisine = (name) => {
		const check = localStorage.getItem(name);
		if(check) setCuisine(JSON.parse(check))
		else
		fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_REACT_APP_API_KEY}&cuisine=${name}&number=10`)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				localStorage.setItem(name, JSON.stringify(data.results));
				setCuisine(data.results);
			});
	}
	useEffect(() => {

		getCuisine(params.type);
		console.log(params.type);
	}, [params.type])
	return (
		<Grid
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			{cuisine.map((recipe) =>{
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

const Grid = styled(motion.div)`
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
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';

import { Splide, SplideSlide } from '@splidejs/react-splide';

import { Card, Gradient, Wrapper } from '../../styles/recipeStyles'

export const Veggie = () => {
	const [veggie, setVeggie] = useState([]);
	const getVeggie = () => {
		const check = localStorage.getItem('veggie');
		if(check) setVeggie(JSON.parse(check))
		else
		fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_REACT_APP_API_KEY}&number=10&tags=vegetarian`).then(res => res.json()).then(data => {
			localStorage.setItem('veggie', JSON.stringify(data.recipes));
			setVeggie(data.recipes);
		}).catch(err => {
			console.log(err)
		});
	}

	useEffect(() => {
		getVeggie();
	}, [])
	return (
		<div>
			<Wrapper>
				<h3>Our Vegetarian Picks</h3>
				<Splide options={{
					perPage: 3,
					arrows: false,
					pagination: false,
					drag: 'free',
					gap: '5rem',
				}}>
					{veggie.map((recipe) =>
						<SplideSlide key={recipe.id}>
							<Link to={`/recipe/${recipe.id}`}>
								<Card>
									<p>{recipe.title}</p>
									<img src={recipe.image} alt={recipe.title} />
									<Gradient />
								</Card>
							</Link>
						</SplideSlide>
					)}
				</Splide>
			</Wrapper>
		</div>
	)
}

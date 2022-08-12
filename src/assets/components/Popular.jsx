import { useState, useEffect } from 'react';

import {Link} from 'react-router-dom';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import { Card, Gradient, Wrapper } from '../../styles/recipeStyles';

export const Popular = () => {
	const [popular, setPopular] = useState([]);
	const getPopular = () => {
		const check = localStorage.getItem('popular');
		if(check) setPopular(JSON.parse(check))
		else{
			fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_REACT_APP_API_KEY}&number=10`).then(res => res.json()).then(data => {
				localStorage.setItem('popular', JSON.stringify(data.recipes));
				setPopular(data.recipes);
			}).catch(err => {
				console.log(err)
			});
		}
		
	}

	useEffect(() => {
		getPopular();
	}, [])
	
	return (
		<div>
			<Wrapper>
				<h3>Popular Picks</h3>
				<Splide options={{
					perPage: 4,
					arrows: false,
					pagination: false,
					drag: 'free',
					gap: '5rem',
				}}>
					{popular.map((recipe) =>
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


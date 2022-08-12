import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

export const Recipe = () => {
	const {name} = useParams();
	const [details, setDetails] = useState([]);
	const [activeTab, setActiveTab] = useState('instructions');
	const getRecipeById = () => {
		fetch(`https://api.spoonacular.com/recipes/${name}/information?apiKey=${import.meta.env.VITE_REACT_APP_API_KEY}`)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setDetails(data);
			});
	}

	useEffect(() => {
		getRecipeById(name);
	}, [name])
	return (
		<DetailWrapper>
			<div>
				<h2>{details?.title}</h2>
				<img src={details.image} alt={details.title} />
			</div>
			<Info>
				<Button className={activeTab === 'instructions' ? 'active' : ''} onClick={()=> setActiveTab('instructions')}>Instructions</Button>
				<Button className={activeTab === 'Ingredients' ? 'active' : ''} onClick={()=> setActiveTab('Ingredients')}>Ingredients</Button>
				{activeTab ==='instructions' && (
					<div>
						<h3 dangerouslySetInnerHTML={{__html:details.summary}}></h3>
						<h3 dangerouslySetInnerHTML={{__html:details.instructions}}></h3>
					</div>
				)}
				{activeTab ==='Ingredients' && (
					<ul>
					{details.extendedIngredients?.map(ingredient => <li key={ingredient?.id}>{ingredient.original}</li>)}
				</ul>
				)}
				
			</Info>
		</DetailWrapper>
	)
}

const DetailWrapper = styled.div`
	margin-top: 10rem;
	margin-bottom: 5rem;
	display: flex;
	.active{
		background: linear-gradient(35deg, #393939, #313131);
		color: white;
	}
	h2{
		margin-bottom: 2rem;
	}
	li{
		font-size: 1.2rem;
		line-height: 2.5rem;
	}
	ul{
		margin-top: 2rem;
	}
`;

const Button = styled.button`
	padding: 1rem 2rem;
	color: #313131;
	background: white;
	border: 2px solid black;
	margin-right: 2rem;
	font-weight: 600;
`;

const Info = styled.div`
	margin-left: 10rem;
`;
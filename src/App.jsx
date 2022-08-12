import { BrowserRouter, Link } from 'react-router-dom'

import { Pages } from './assets/pages/Pages'
import Category from './assets/components/Category'
import { Search } from './assets/components/Search'

import styled from 'styled-components'

import {GiKnifeFork} from 'react-icons/gi'

function App() {

  return (
    <BrowserRouter >
    <Nav>
      <GiKnifeFork />
      <Logo to={'/'}>Delicius</Logo>
    </Nav>
      <Search />
      <Category />
      <Pages />
    </BrowserRouter>
  )
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: 'Lobster Two', cursive;
`;

const Nav = styled.nav`
  padding: 4rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg{
    font-size: 2rem;
  }
`;
export default App

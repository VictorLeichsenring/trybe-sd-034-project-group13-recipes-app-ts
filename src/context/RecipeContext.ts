import { createContext } from 'react';
import { RecipeContextType } from '../types';

const RecipeContext = createContext({} as RecipeContextType);

export default RecipeContext;

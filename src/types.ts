export type LocationType = {
  pathname: string;
};

export type SearchType = 'ingredient' | 'name' | 'first-letter';

export type EndpointParams = {
  pathname: LocationType['pathname'];
  searchType: SearchType;
  query: string;
};

export type EndpointType = string;

export type SearchBarProps = {
  onSearch: (data: any) => void;
};

export type RecipeContextType = {
  providerValue: {
    recipes: any,
    setRecipes: (data: any) => void,
  }
};

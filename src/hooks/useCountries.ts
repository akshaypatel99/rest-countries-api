import { useEffect, useState } from 'react';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { Country, getCountries } from '../utils';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>

type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>

type useCountriesReturn = [StateType, (e: SelectChangeEvent) => void, (e: InputChangeEvent) => void, boolean];

export type StateType = {
	countries: Country[],
	regions: string[],
	filter: string,
	searchParams: string,
}

const countriesQuery = () => ({
	queryKey: ['countries'],
	queryFn: async () => getCountries(),
	useErrorBoundary: true,
});

export const loader = (queryClient: QueryClient) => async () => {
	const query = countriesQuery();
	return await queryClient.ensureQueryData(query);
};

export const useCountries = (): useCountriesReturn => {
	const [state, setState] = useState<StateType>({
		countries: [],
		regions: [],
		filter: '',
		searchParams: ''
	});

	const { isLoading, data } = useQuery(countriesQuery());

	const handleFilterChange = (
		e: SelectChangeEvent
	): void => {
		setState({
			...state,
			searchParams: '',
			filter: e.target.value !== 'All' ? e.target.value : ''
		})
	};

	const handleSearchParamsChange = (
		e: InputChangeEvent
	): void => {
		setState({
			...state,
			searchParams: e.target.value.toLowerCase(),
			filter: ''
		})
	};



	useEffect(() => {
		if (data) {
			if (state.filter !== '') {
				setState({
					...state, countries: data
						.filter((datum: Country) => datum.region === state.filter)
				})
			} else if (state.searchParams !== '') {
				setState({
					...state, countries: data
						.filter((datum: Country) =>
							datum.name.common.toLowerCase().includes(state.searchParams)
						)
				})
			} else {
				setState({
					...state,
					regions: [
						...new Set<string>(data.map((datum: Country) => datum.region)),
					],
					countries: data.sort(function (a: Country, b: Country) {
						if (a.name.common < b.name.common) return -1;
						if (a.name.common > b.name.common) return 1;
						return 0;
					})
				})
			}
		}
	}, [data, state.filter, state.searchParams])

	

  return [state, handleFilterChange, handleSearchParamsChange, isLoading]
}
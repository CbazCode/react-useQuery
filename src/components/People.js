import React from 'react';
import {QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Person from './Person';
import { ReactQueryDevtools } from 'react-query/devtools'


const queryClient = new QueryClient()
const fetchPeople = async () => {
  const res = await fetch('http://swapi.dev/api/people/');
  return res.json();
}

const People = () => {
  const { data, status } = useQuery('people', fetchPeople);
 

  return (
    <div>
      <h2>People</h2>
      {/* { status } */}

      {status === 'loading' && (
        <div>Loading data</div>
      )}

      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'success' && (
        <div>
          { data.results.map(person => <Person key={person.name} person={person} /> ) }
        </div>
      )} 
    </div>
  );
}
 

const WrappedPeople = ()=>{
    return(
        <QueryClientProvider client={queryClient}>
            <People/>
        </QueryClientProvider>
    )
}
export default WrappedPeople;
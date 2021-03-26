import React, { useState } from 'react';
import {QueryClient, QueryClientProvider, useQuery,useInfiniteQuery } from 'react-query';
import Planet from './Planet';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();
const fetchPlanets = async (page) => {
 
 
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();

}

const Planets = () => {
  const [page, setPage] = useState(1)
  const { data, status } = useQuery(['planets',page ], () =>fetchPlanets(page),{
    keepPreviousData: true,
  });
  

 
  return (
    
        <div>
          <h2>Planets</h2>

          {status === 'loading' && (
            <div>Loading data</div>
          )}
          {status === 'error' && (
            <div>Error fetching data</div>
          )}
          {status === 'success' && (
            <>
              <button
              onClick={() => setPage(old => Math.max(old - 1, 1))}
              disabled={page === 1}>
              Previous Page
              </button>
               <span>{ page }</span>
              <button
                onClick={() => setPage(old => (old + 1))}
                disabled={page===6}
                >
              Next page
              </button>
              <div>
                { data.results.map(planet => <Planet key={planet.name} planet={planet} /> ) }
              </div>
            </>
          )}
        </div>
   
  );
}

const WrappedPlanet = ()=>{
    return(
        <QueryClientProvider client={queryClient}>
            <Planets/>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    )
}
 
export default WrappedPlanet;
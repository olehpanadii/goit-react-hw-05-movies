import { Loader } from 'components/Loader/Loader';
import { MovieListItemDetails } from 'components/MovieListItemDetails/MovieListItemDetails';
import { fetchMovieDetails } from 'helpers/api';
import { Suspense, useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';

export default function MovieDetails() {
  const [detailsOfMovie, setDetailsOfMovie] = useState();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const movieDetails = await fetchMovieDetails(id);
        setDetailsOfMovie(movieDetails);
      } catch (error) {
        console.log(error);
      }
    }
    getMovieDetails();
  }, [id]);

  if (!detailsOfMovie) {
    return;
  }
  const backLink = location.state?.from ?? '/';

  return (
    <section>
      <Link to={backLink}>← Go back</Link>

      <MovieListItemDetails movie={detailsOfMovie} />
      <nav>
        <NavLink to={'cast'}>Cast</NavLink>
        <NavLink to={'reviews'}>Review</NavLink>
      </nav>

      <Suspense fallback={<Loader loading={true} />}>
        <Outlet />
      </Suspense>
    </section>
  );
}

import { useCallback, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ApiMovieModel } from '@v-thomas/thunder/data-access';
import {
  AddMovie,
  clearMovies,
  fetchGroupMovies,
  getMoviesState,
  MoviesEntity,
  MoviesState,
  selectAllMovies
} from '@v-thomas/thunder/data-access';

export const useMovies = (
  all?: boolean
): {
  movies: MoviesEntity[];
  clearMovies: () => void;
  movieState?: MoviesState;
  addMovie: (movie: ApiMovieModel) => void;
} => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { groupId }: any = useParams();

  const dispatch = useDispatch();
  const rootMovies = useSelector(getMoviesState);
  const movies = useSelector(selectAllMovies);

  const checkgroupMovies = useCallback(() => {
    if (rootMovies.groupId !== groupId && rootMovies.loadingStatus === 'NOT_LOADED') {
      console.log(rootMovies);
      dispatch(fetchGroupMovies({ payload: { groupId } }));
    }
  }, [groupId, rootMovies, dispatch]);

  const addMovie = (movie: ApiMovieModel) => {
    dispatch(AddMovie({ payload: { movie, groupId } }));
  };

  useEffect(checkgroupMovies, [checkgroupMovies]);

  return {
    movies,
    addMovie,
    clearMovies: () => dispatch(clearMovies()),
    movieState: rootMovies
  };
};
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrivateNavbar } from '@v-thomas/thunder/ui';

import { Divider, Title, Button, Input } from '@v-thomas/core-ui';

import { MovieCard } from '@v-thomas/thunder/groups/ui';
import { Container, Form, Grid, GridAnimation, RemoveAtSmall } from './home.styles';
import { NoMovies } from './components/no-movies';
import { useGroup, useMovies, useUser } from '@v-thomas/thunder/hooks';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';

export function GroupHomePage() {
  const { movies, clearMovies, movieState, forceFetchMovies, getMovieRecommendations } = useMovies();
  const { group, allGroups } = useGroup();
  const router = useNavigate();
  const { register, watch, handleSubmit } = useForm();
  const [lastSearch, setLastSearch] = useState<null | string>('');
  const dispatch = useDispatch();

  const search = watch('search', '');

  useEffect(() => {
    if (!search.length && group && search !== lastSearch) forceFetchMovies();
  }, [search, dispatch, group, lastSearch, forceFetchMovies]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit({ search: searchTerm }: any) {
    if (lastSearch === searchTerm) return;
    if (searchTerm.length) getMovieRecommendations(searchTerm);
    else forceFetchMovies();
    setLastSearch(searchTerm);
  }

  const { user } = useUser();

  return (
    <>
      {/* @ts-ignore */}
      <Helmet>
        <title>{`Movie | ${group?.name || 'Loading...'}`}</title>
      </Helmet>
      <Container>
        <PrivateNavbar
          avatar={user.avatar}
          title={group?.name}
          rightButtons={
            <Button variant="text" onClick={() => router(`/app/groups/${group.id}/search`)}>
              Add Movie
            </Button>
          }
          leftButtons={
            <Button
              variant="text"
              onClick={() => {
                clearMovies();
                router('../..');
              }}>
              To Lobby
            </Button>
          }
          middle={
            <RemoveAtSmall>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('search')} />
              </Form>
            </RemoveAtSmall>
          }
        />
        <Divider />
        {allGroups.loadingStatus === 'LOADED' && movies.length ? (
          <Grid variants={GridAnimation} initial={'initial'} animate="show">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {movies?.map((movie: any, index: number) => (
              <MovieCard movie={movie} key={index} duration={index / movies.length} />
            ))}
          </Grid>
        ) : null}
        {movieState?.loadingStatus === 'LOADED' && !movies.length && <NoMovies />}
        {movieState?.loadingStatus === 'LOADING' && <Title>Loading...</Title>}
      </Container>
    </>
  );
}
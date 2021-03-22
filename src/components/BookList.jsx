import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { BookCard } from "./BookCard";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import { Box, Input, Typography } from "@material-ui/core";

import {
  fetchBooks,
  selectResults,
  updateCurrentPage,
} from "../store/bookSlice";

export const BookList = (props) => {
  let history = useHistory();

  const pageId = Number(useParams(props.id).id);
  const dispatch = useDispatch();
  const dataStatus = useSelector((state) => state.bookData.status);
  const pages = useSelector((state) => state.bookData.totalPages);
  const results = useSelector(selectResults);
  const [currentPage, setCurrentPage] = useState(pageId);
  const [error, setError] = useState(false);

  const updatePage = (event, value) => {
    setCurrentPage(value);
    dispatch(updateCurrentPage(value));
    history.push(`/${value}`);
    dispatch(fetchBooks({ pageNumber: value }));
  };

  useEffect(() => {
    if (dataStatus === "idle") {
      const pageNumber = currentPage || 1;
      dispatch(fetchBooks({ pageNumber: pageNumber }));
    }

    if (dataStatus === "failed") {
      setError(true);
    }
  }, [dataStatus, dispatch]);

  const applyFilter = (e) => {
    dispatch(
      fetchBooks({
        pageNumber: 1,
        filter: [{ type: "all", values: [e.target.value] }],
      })
    );
  };

  const books = results.map((item, index) => {
    return (
      <Grid item xs={12} sm={6} lg={3}>
        <BookCard
          title={item.book_title}
          year={item.book_publication_year}
          author={item.book_author}
          country={item.book_publication_country}
        />
      </Grid>
    );
  });

  return (
    <Box>
      <Box padding="24px 0" display="flex" alignItems="baseline">
        <Typography variant="h3" component="h1">
          A list of (mostly) Greek books
        </Typography>
        <Box marginLeft="auto">
          <Input onChange={(e) => applyFilter(e)} placeholder="Search" />
        </Box>
      </Box>

      <Box paddingBottom={4}>
        <Grid container spacing={3}>
          {error && <p>There was an error</p>}
          {books}
        </Grid>
      </Box>

      <Box
        position="sticky"
        width="100%"
        bottom="0"
        bgcolor="white"
        padding="10px 0"
      >
        <Pagination count={pages} page={currentPage} onChange={updatePage} />
      </Box>
    </Box>
  );
};

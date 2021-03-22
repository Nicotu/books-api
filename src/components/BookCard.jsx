import React from "react";
import { Typography, Box } from "@material-ui/core";

export class BookCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, author, year, country } = this.props;

    return (
      <Box
        component="article"
        borderTop="8px solid #31bed8"
        display="flex"
        flexDirection="column"
        height="100%"
      >
        <Box
          display="flex"
          height="140px"
          alignItems="center"
          textAlign="center"
          bgcolor="#36464e"
          color="white"
          padding="0 10px"
          justifyContent="center"
        >
          <Typography variant="body1" component="h3" bgcolor="#374045">
            {title}
          </Typography>
        </Box>
        <Box
          component="div"
          padding={2}
          bgcolor="#ace3ed"
          color="#374045"
          flex="1"
          display="flex"
          flexDirection="column"
        >
          <Box component="p" marginTop="auto">
            <Box component="span" display="block" fontWeight="500">
              Author:
            </Box>
            {author}
            <Box
              component="span"
              display="block"
              fontWeight="600"
              marginTop={2}
            >
              Year:
            </Box>
            {year}
            <Box
              component="span"
              display="block"
              fontWeight="600"
              marginTop={2}
            >
              Country:
            </Box>
            {country}
          </Box>
        </Box>
      </Box>
    );
  }
}

BookCard.defaultProps = {
  title: "n/a",
  author: "n/a",
  year: "n/a",
  country: "n/a",
};

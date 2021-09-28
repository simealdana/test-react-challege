import React, { Fragment } from "react";
import PropTypes from "prop-types";
import colors from "../constants/colors";
import { Typography, makeStyles, Box } from "@material-ui/core";

const Blocks = ({ blocks }) => {
  const classes = useStyles();
  return (
    <Fragment>
      {blocks 
        ? blocks.length > 0
          ? BlockList(blocks, classes)
          :BlockEmpyt(classes)
        :  BlockLoading(classes)
      }
    </Fragment>
  );
};

const BlockList = (blocks, classes) =>
  [...blocks].map((block) => {
    return (
      <Box className={classes.block} key={block.id}>
        <Typography variant="h5" className={classes.blockId}>
          {block.id || "Unknown"}
        </Typography>
        <Typography variant="h5" className={classes.blockData}>
          {block.attributes.data || "Unknown"}
        </Typography>
      </Box>
    );
  });

const BlockLoading = (classes) => (
  <Box className={classes.loadingContainer}>
    <span className={classes.loadingText}>LOADING...</span>
  </Box>
);

const BlockEmpyt = (classes) => (
  <Box className={classes.loadingContainer}>
    <span className={classes.loadingText}>THERE ARE NOT BLOCKS</span>
  </Box>
);

const useStyles = makeStyles((theme) => ({
  block: {
    background: "rgba(0, 0, 0, 0.12)",
    borderRadius: "2px",
    padding: 8,
    marginBottom: 5,
    display: "flex",
    flexDirection: "column",
  },
  blockId: {
    fontSize: theme.typography.pxToRem(14),
    color: colors.blue,
    lineHeight: 2,
  },
  blockData: {
    fontSize: theme.typography.pxToRem(14),
    color: colors.text,
    lineHeight: 1,
  },
  loadingText: {
    fontSize: theme.typography.pxToRem(14),
    display: "block",
    lineHeight: 1.5,
    fontWeight: "400",
    letterSpacing: 1,
    paddingLeft: 5,
    color: colors.faded,
    textAling: "center",
  },
  loadingContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
}));

Blocks.propTypes = {
  blocks: PropTypes.any,
};

export default Blocks;

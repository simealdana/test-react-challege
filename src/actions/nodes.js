import fetch from "cross-fetch";
import * as types from "../constants/actionTypes";

const checkNodeStatusStart = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    node,
  };
};

const checkNodeStatusSuccess = (node, res) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    node,
    res,
  };
};

const checkNodeStatusFailure = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    node,
  };
};

const setBlocksByNodeSuccess = (node, blocks) => ({
  type: types.CHECK_BLOCKS_STATUS_SUCCESS,
  node,
  blocks,
});

const setBlocksByNodeError = (node) => ({
  type: types.CHECK_BLOCKS_STATUS_FAILURE,
  node
});

export function checkNodeStatus(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeStatusStart(node));
      const res = await fetch(`${node.url}/api/v1/status`);

      if (res.status >= 400) {
        dispatch(checkNodeStatusFailure(node));
        return;
      }

      const json = await res.json();

      dispatch(checkNodeStatusSuccess(node, json));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  };
}

export function checkNodeStatuses(list) {
  return (dispatch) => {
    list.forEach((node) => {
      dispatch(checkNodeStatus(node));
    });
  };
}

export const getBlocksByNode = (node) => async (dispatch) => {
  try {
    const res = await fetch(`${node.url}/api/v1/blocks`);
    const json = await res.json();
    const data = node.online ? json.data : [];
    dispatch(setBlocksByNodeSuccess(node, data));
  } catch (error) {
    dispatch(setBlocksByNodeError(node));
  }
};

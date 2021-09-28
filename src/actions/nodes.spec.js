import * as ActionTypes from "../constants/actionTypes";
import * as ActionCreators from "./nodes";
import mockFetch from "cross-fetch";

jest.mock("cross-fetch");

describe("Actions", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
    mockFetch.mockClear();
  });

  const node = {
    url: "http://localhost:3002",
    online: false,
    name: null,
    blocks: null,
  };

  it("should fetch the node status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ node_name: "Secret Lowlands" });
        },
      })
    );
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node,
        res: { node_name: "Secret Lowlands" },
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the node status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should failure block settings", async () => {
    await ActionCreators.getBlocksByNode(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_BLOCKS_STATUS_FAILURE,
        node,
      },
    ];
    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should success block setting", async () => {
    const newNode = {
      url: "http://localhost:3002",
      online: true,
      name: null,
      blocks: null,
    };
    const blocks = [
      {
        id: "1",
        type: "blocks",
        attributes: {
          index: 1,
          timestamp: 1530677153,
          data: "By reason of these things",
          hash: "nzl9y9lf4NdSQZCw293n5ICLniP6GnWecWcvAjWKjnc=",
        },
      },
    ];
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({
            data: [
              {
                id: "1",
                type: "blocks",
                attributes: {
                  index: 1,
                  timestamp: 1530677153,
                  data: "By reason of these things",
                  hash: "nzl9y9lf4NdSQZCw293n5ICLniP6GnWecWcvAjWKjnc=",
                },
              },
            ],
          });
        },
      })
    );
    await ActionCreators.getBlocksByNode(newNode, blocks)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_BLOCKS_STATUS_SUCCESS,
        node:newNode,
        blocks
      },
    ];
    expect(dispatch.mock.calls.flat()).toEqual(expected)
  });
});

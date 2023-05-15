/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      userId
      album {
        id
        name
        images
        artists {
          id
          name
        }
      }
      option
      price
      quantity
      id
      createdAt
      updatedAt
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        userId
        album {
          id
          name
          images
          artists {
            id
            name
          }
        }
        option
        price
        quantity
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

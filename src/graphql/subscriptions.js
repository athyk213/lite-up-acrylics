/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onCreateOrder(filter: $filter) {
      userId
      album {
        id
        name
        images
        artists {
          id
          name
        }
        release_date
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onUpdateOrder(filter: $filter) {
      userId
      album {
        id
        name
        images
        artists {
          id
          name
        }
        release_date
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
    onDeleteOrder(filter: $filter) {
      userId
      album {
        id
        name
        images
        artists {
          id
          name
        }
        release_date
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

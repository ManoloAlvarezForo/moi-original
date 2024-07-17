import {gql} from '@apollo/client';

export const PRODUCTS_BY_CATEGORY = gql`
  query productsByCategory($categoryId: String) {
    productsByCategory(categoryId: $categoryId) {
      id
      promo
      promoPrice
      thumbs {
        url
        formats {
          thumbnail {
            url
          }
          small {
            url
          }
        }
      }
      client {
        id
        brand
        responsible
        thumb {
          url
        }
      }
      description
      name
      price
    }
  }
`;

export const PRODUCTS = gql`
  query products {
    products {
      id
      promo
      promoPrice
      thumbs {
        url
        formats {
          thumbnail {
            url
          }
          small {
            url
          }
        }
      }
      client {
        id
        brand
        responsible
        thumb {
          url
        }
      }
      description
      name
      price
    }
  }
`;

export const PRODUCT_BY_ID = gql`
  query product($id: String) {
    product(id: $id) {
      id
      promoPrice
      productId
      name
      description
      promo
      client {
        id
        brand
        responsible
        thumb {
          url
        }
      }
      thumbs {
        url
        formats {
          thumbnail {
            url
          }
          small {
            url
          }
        }
      }
      price
    }
  }
`;

export const CATEGORIES = gql`
  query categories($parentId: String) {
    categories(parentId: $parentId) {
      id
      label
      name
      thumb {
        url
      }
    }
  }
`;

export const COMMENTS = gql`
  query comments($productId: String) {
    comments(productId: $productId) {
      id
      user
      userId
      comment
      createdDate
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($comment: String, $productId: String, $userId: String) {
    addComment(comment: $comment, productId: $productId, userId: $userId) {
      id
      user
      userId
      comment
      createdDate
    }
  }
`;

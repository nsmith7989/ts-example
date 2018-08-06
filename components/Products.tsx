import * as React from 'react'

import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

// this typescript interface is usually automatically generated with apollo
// cli, but that needs some additional setup

interface Product {
  id: string
  name: string
  price: string
}

interface ProductsQueryData {
  allProducts: Product[]
}

const PRODUCTS_QUERY = gql`
  {
    allProducts {
      id
      name
      price
    }
  }
`

// easy way
class ProductsDataContainer extends Query<ProductsQueryData> {}

export default () => (
  <ProductsDataContainer query={PRODUCTS_QUERY}>
    {({ data, loading, error }) => {
      if (loading && !data) {
        return <p>loading....</p>
      }

      if (error) {
        console.log(error)
        return <p>whoops, error</p>
      }

      // put your mouse over "data.allProducts", you will see it's typed
      const listAllProducts = data.allProducts.map(
        (product: Product, index) => {
          // try destructuring this next commented line, see how typescript throws an error
          // const { id, manufacturer, location } = product;
          const { id, name, price } = product

          return (
            <>
              <hr />
              <ul key={index}>
                <li>{id}</li>
                <li>{name}</li>
                <li>{price}</li>
              </ul>
            </>
          )
        }
      )

      return <div>{listAllProducts}</div>
    }}
  </ProductsDataContainer>
)

// can also be
// return <Query<ProductsQueryData, {}> {...} </Query>

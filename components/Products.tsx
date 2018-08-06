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

class ProductsDataContainer extends Query<ProductsQueryData> {}
// can also be <Query<ProductsQueryData, {}> {...} </Query>

export default () => {
  return (
    <ProductsDataContainer query={PRODUCTS_QUERY}>
      {({ data, loading, error }) => {
        // render props!!!
        if (loading && !data) {
          return <p>loading</p>
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
              <ul key={index}>
                <li>{id}</li>
                <li>{name}</li>
                <li>{price}</li>
              </ul>
            )
          }
        )

        return <div>{listAllProducts}</div>
      }}
    </ProductsDataContainer>
  )
}

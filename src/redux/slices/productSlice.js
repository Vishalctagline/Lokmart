import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

const lists = {
  productList: {
    // total: 0,
    products: [],
    skip: 0,
  },
  searchList: {
    // total: 0,
    products: [],
    skip: 0,
  },
  total: 0,
  isLoading: true,
};
export const getInitProducts = createAsyncThunk(
  'GET_INIT_PRODUCTS',
  async () => {
    try {
      console.log('Init  ');
      return fetch(`https://dummyjson.com/products?limit=10&skip=0`)
        .then(res => res.json())
        .then(json => {
          // console.log('json response : ',json);
          return json;
        });
    } catch (error) {
      console.log(error);
    }
  },
);

export const getProducts = createAsyncThunk(
  'GET_PRODUCTS',
  async ([skip, text]) => {
    try {
      console.log('Skip Value : ', skip);
      return fetch(
        text
          ? `https://dummyjson.com/products/search?limit=10&skip=${skip}&q=${text}`
          : `https://dummyjson.com/products?limit=10&skip=${skip}`,
      )
        .then(res => res.json())
        .then(json => {
          // console.log('json response : ',json);
          return json;
        });
    } catch (error) {
      console.log(error);
    }
  },
);
// console.log({getProducts});

export const getSearchedProducts = createAsyncThunk(
  'GET_SEARCHED_PRODUCTS',
  async text => {
    try {
      console.log('Text Value : ', text);
      return fetch(`https://dummyjson.com/products/search?limit=10&q=${text}`)
        .then(res => res.json())
        .then(json => {
          console.log('json length', json.products.length);
          if (json.products.length !== 0) {
            return json;
          } else {
            Alert.alert('Search', 'No product found !');
          }
        });
    } catch (error) {
      console.log(error);
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    productList: {
      // total: 0,
      products: [],
      skip: 0,
    },
    searchList: {
      // total: 0,
      products: [],
      skip: 0,
    },
    total: 0,
    isLoading: true,
  },
  reducers: {
    loader: (state, action) => {
      state.isLoading = true;
      return state;
    },
    emptySearchList: (state, action) => {
      state.searchList.products = [];
      return state;
    },
    // getInitProduct: (state, action) => {
    //   // console.log("--action.payload--",action.payload)
    //   state = action.payload;
    //   return state;
    // },
  },
  extraReducers: builder => {
    builder.addCase(getInitProducts.fulfilled, (state, action) => {
      state.productList = {
        // total: action.payload.total,
        products: action.payload.products,
        skip: action.payload.skip,
      };
      state.total = action.payload.total;
      state.isLoading = false;
      return state;
    }),
      builder.addCase(getProducts.fulfilled, (state, action) => {
        // console.log('action fulfilled: ', action.payload);
        //   state = action.payload;
        //   console.log('state : ' ,state)
        //  console.log('state : ', state.products);
        //  console.log('action : ', action.payload.products);
        if (state.searchList.products.length !== 0) {
          state.searchList = {
            // total: action.payload.total,
            products: [
              ...state.searchList.products,
              ...action.payload.products,
            ],
            skip: action.payload.skip,
          };
        } else {
          state.productList = {
            // total: action.payload.total,
            products: [
              ...state.productList.products,
              ...action.payload.products,
            ],
            skip: action.payload.skip,
          };
        }
        state.total = action.payload.total;
        state.isLoading = false;
        return state;
      }),
      builder.addCase(getSearchedProducts.fulfilled, (state, action) => {
        if (action.payload) {
          // return Object.assign({}, state, {
          //   ...state,
          //   searchList: {
          //     // total: action.payload.total,
          //     products: action.payload.products,
          //     skip: action.payload.skip,
          //   },
          //   total: action.payload.total,
          //   isLoading: false,
          // });
          console.log({state: state.searchList});
          console.log({action});
          state = {
            ...state,
            searchList: {
              // total: action.payload.total,
              products: action.payload.products,
              skip: action.payload.skip,
            },
            total: action.payload.total,
            isLoading: false,
          };
          // state.searchList = {
          //   // total: action.payload.total,
          //   products: action.payload.products,
          //   skip: action.payload.skip,
          // };
        }
        // state.total = action.payload.total;
        // state.isLoading = false;

        console.log('State : ', state);
        //
        return state;
      });
  },
});

// export const getProductsAsync = () => {
//   return async dispatch => {
//     try {
//       await fetch(`https://dummyjson.com/products?limit=10&skip=0`)
//         .then(res => res.json())
//         .then(json => {
//           // console.log('json response : ',json);
//           dispatch(getAll(json));
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export default productSlice.reducer;

export const {loader, emptySearchList} = productSlice.actions;

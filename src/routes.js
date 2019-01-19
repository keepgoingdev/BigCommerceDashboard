import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Products = Loadable({
  loader: () => import('./views/Products'),
  loading: Loading,
});

const AddProduct = Loadable({
  loader: () => import('./views/Products/AddProduct'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: 'Home', component: DefaultLayout, exact: true },
  { path: '/products', name: 'Products', component: Products },
  { path: '/AddProduct', name: 'AddProduct', component: AddProduct },
];

export default routes;

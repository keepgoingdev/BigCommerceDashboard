import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Button, Card, CardHeader, CardBody } from 'reactstrap';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import axios from 'axios';

import Const from "../../Constants"

import defaultProductImage from '../../assets/img/ProductDefault.gif'

//Generate Image Tag for product
function productImage(cell, row) {
  let imgSrc = cell.tiny_url;
  if(cell === false)
    imgSrc = defaultProductImage;

  return (
    <img src = { imgSrc } alt=''/>
  );
}

//Price Compare Function
function priceSort(a, b, order) {   // order is desc or asc
  if (order === 'asc') {
    return parseFloat(a.price) - parseFloat(b.price);
  } else {
    return parseFloat(b.price) - parseFloat(a.price);
  }
}
class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: []
    };

    this.tableOptions = {
      sizePerPageList: [ {
        text: '10', value: 10
      }, {
        text: '50', value: 50
      }, {
        text: '100', value: 100
      } ],
      sortIndicator: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      withFirstAndLast: false,
      paginationPosition: 'top'
    }
  }

  componentDidMount = () => {
    this.getTableData();
  }

  getTableData = () => {
    //Get Table Data
    axios.get(Const.Api_Url + 'product/get_all_products')
    .then( (response) => {
      this.setState(
        {
          tableData: response.data
        }
      )
    })
  }

  onAddProductBtnClick = () => {
    this.props.history.push('/AddProduct');
  }

  render() {

    return (
      <div className="animated">
        <Card className = "mt-5">
          <CardHeader>
                <h4 className = "pull-left">Products:</h4>
                <Button block color="primary" onClick = {this.onAddProductBtnClick} className = "pull-right productAddButton">Add Product</Button>
          </CardHeader>
          <CardBody>
              <BootstrapTable className = "productTable" data={this.state.tableData} version="4" hover pagination search options={this.tableOptions}>
                <TableHeaderColumn dataField="image" dataFormat={ productImage }>Image</TableHeaderColumn>
                <TableHeaderColumn isKey dataField="sku" dataSort>Product SKU</TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataSort>Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField="price" dataSort sortFunc = {priceSort} dataFormat = { (cell, row)=>{ return '$' + cell}}>Price</TableHeaderColumn>
              </BootstrapTable>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Products;

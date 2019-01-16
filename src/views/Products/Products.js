import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Button, Card, CardBody } from 'reactstrap';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import axios from 'axios';

import Const from "../../Constants"

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: []
    };

    this.options = {
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
    axios.get(Const.Api_Url + 'products.php?mode=get-all-products')
    .then( (response) => {
      this.setState(
        {
          tableData: response.data
        }
      )
    })
  }

  render() {

    return (
      <div className="animated">
        <Card>
          <CardBody>
            <BootstrapTable data={this.state.tableData} version="4" striped hover pagination search options={this.options}>
              <TableHeaderColumn dataField="image">Image</TableHeaderColumn>
              <TableHeaderColumn isKey dataField="sku" dataSort>Product SKU</TableHeaderColumn>
              <TableHeaderColumn dataField="name" dataSort>Product Name</TableHeaderColumn>
              <TableHeaderColumn dataField="price" dataSort>Price</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
        <Button block color="primary" onClick={this.onItemclick}>Primary</Button>
      </div>
    );
  }
}

export default Products;


import React, {Component} from 'react';
import { Button, Row, Col, Card, CardHeader, CardFooter, CardBody, Input, Label, FormGroup } from 'reactstrap';

import axios from 'axios';
import $ from 'jquery';

import Const from "../../Constants"

// React select
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';

//Toaster
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Products extends Component {

  constructor(props) {
    super(props);

    this.state = {
      allCategories: [],
      selectedCategories  : [],
    }
  }

  componentDidMount = () => {
    //Get Categories
    axios.get(Const.Api_Url + 'product/get_all_categories')
    .then( (response) => {

      //Set Categories Dropdown values
      this.setState(
        {
          allCategories: response.data,
        }
      )
    })
  }

  onCategoryAdd = (value) => {
    this.setState({
      selectedCategories: value
    });
  }

  onProductAdd = () => {
    let productData = {};
    productData.name = document.getElementById('productName').value;
    productData.price = document.getElementById('productPrice').value;
    productData.weight      = document.getElementById('productWeight').value;
    productData.sku         = document.getElementById('productSKU').value;

    productData.categories  = [];
    this.state.selectedCategories.forEach((item)=>{
      productData.categories.push(item.value);
    });
    productData.categories = productData.categories.join();

    $.ajax({
      type: "POST",
      url: Const.Api_Url + 'product/add_product',
      data: productData,
      success : (response) => {
        if(response.success === true)
        {
          this.props.history.push('/products');
        }
        else
        {
          toast.error(response.error_message);
        }
        console.log(response);
      }
    })
  }

  render () {

    const containerStyle = {
      zIndex: 1999
    };

    return (
      <div>
        <ToastContainer position="top-right" autoClose={5000} style={containerStyle}/>
        <Row className = "justify-content-center mt-5">
          <Col md='8'>
          <Card>
              <CardHeader>
                <strong>Add Product Details</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="productName">Product Name *</Label>
                      <Input type="text" id="productName" placeholder="Sample Product Name" required/>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="productPrice">Product Price *</Label>
                      <Input type="text" id="productPrice" placeholder="35" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="productCategories">Categories *</Label>
                      <Select
                        id = "productCategories"
                        name="form-field-name2"
                        value={this.state.selectedCategories}
                        options={this.state.allCategories}
                        onChange={this.onCategoryAdd}
                        multi
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs = '6'>
                    <FormGroup>
                      <Label htmlFor="productWeight">Weight *</Label>
                      <Input type="text" id="productWeight" placeholder="0" required />
                    </FormGroup>
                  </Col>
                  <Col xs = '6'>
                    <FormGroup>
                      <Label htmlFor="productSKU">Product SKU *</Label>
                      <Input type="text" id="productSKU" placeholder="THX-1138" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <FormGroup>
                    <Label htmlFor="productImages">Product SKU *</Label>
                    <Input type = "file" id = "productImages" multiple />
                  </FormGroup>
                </Row>
              </CardBody>
              <CardFooter>
                <Button color="primary" className = 'pull-right' onClick = {this.onProductAdd}><i className="fa fa-plus"></i> Add</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Products;

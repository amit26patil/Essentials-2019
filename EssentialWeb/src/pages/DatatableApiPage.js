import React from "react";
import {
  MDBDataTable,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput
} from "mdbreact";
import SectionContainer from "../components/sectionContainer";

class DatatableApiPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      modal8: false,
      modalData: {}
    };
  }
  onEditClick(row) {
    this.setState({
      modal8: !this.state.modal8,
      modalData: row
    });
  }
  toggle = () => {
    this.setState({
      modal8: !this.state.modal8
    });
  };
  addCustomer() {
    this.setState({
      modal8: !this.state.modal8,
      modalData: {}
    });
  }
  componentDidMount() {
    this.getCustomers();
    // fetch(
    //   "https://egbdy6f3b2.execute-api.ap-south-1.amazonaws.com/Essentials/customers"
    // )
    //   .then(res => res.json())
    //   .then(json => {
    //     let data = {};
    //     let rows = json.Items;
    //     let columns = [];
    //     // columns.push({
    //     //   label: "Id",
    //     //   field: "id",
    //     //   sort: "asc",
    //     //   width: 150
    //     // });
    //     columns.push({
    //       label: "Name",
    //       field: "name",
    //       sort: "asc",
    //       width: 150
    //     });
    //     columns.push({
    //       label: "Email",
    //       field: "email",
    //       width: 150
    //     });
    //     columns.push({
    //       label: "Phone",
    //       field: "phone",
    //       width: 150
    //     });
    //     columns.push({
    //       label: "Action",
    //       field: "action",
    //       sort: "asc",
    //       width: 150
    //     });

    //     rows = rows.map((row, key) => ({
    //       ...row,
    //       action: (
    //         <MDBBtn
    //           color="primary"
    //           onClick={() => this.onEditClick(row)}
    //           size="sm"
    //           rounded
    //         >
    //           Edit
    //         </MDBBtn>
    //       )
    //     }));

    //     data = {
    //       columns,
    //       rows
    //     };
    //     this.setState({ data });
    //   });
  }
  handleChange(e) {
    console.log(e.target.value);
    var modelData = this.state.modalData;
    modelData[e.target.name] = e.target.value;
    this.setState({
      modelData
    });
  }
  getCustomers() {
    fetch(
      "https://egbdy6f3b2.execute-api.ap-south-1.amazonaws.com/Essentials/customers"
    )
      .then(res => res.json())
      .then(json => {
        let data = {};
        let rows = json.Items;
        let columns = [];
        // columns.push({
        //   label: "Id",
        //   field: "id",
        //   sort: "asc",
        //   width: 150
        // });
        columns.push({
          label: "Name",
          field: "name",
          sort: "asc",
          width: 150
        });
        columns.push({
          label: "Email",
          field: "email",
          width: 150
        });
        columns.push({
          label: "Phone",
          field: "phone",
          width: 150
        });
        columns.push({
          label: "Action",
          field: "action",
          sort: "asc",
          width: 150
        });

        rows = rows.map((row, key) => ({
          ...row,
          action: (
            <MDBBtn
              color="primary"
              onClick={() => this.onEditClick(row)}
              size="sm"
              rounded
            >
              Edit
            </MDBBtn>
          )
        }));

        data = {
          columns,
          rows
        };
        this.setState({ data });
      });
  }
  saveCustomer() {
    console.log(this.state.modalData);

    fetch(
      "https://egbdy6f3b2.execute-api.ap-south-1.amazonaws.com/Essentials/customer",
      {
        method: this.state.modalData.id ? "PUT" : "POST",
        body: JSON.stringify(this.state.modalData)
      }
    ).then(response => {
      this.toggle();
      this.getCustomers();
    });
  }
  render() {
    return (
      <MDBContainer className="mt-3">
        <MDBModal
          isOpen={this.state.modal8}
          toggle={() => this.toggle()}
          fullHeight
          position="right"
        >
          <MDBModalHeader toggle={() => this.toggle()}>Customer</MDBModalHeader>
          <MDBModalBody>
            <form className="mx-3 grey-text">
              <MDBInput
                label="Customer Name"
                icon="user"
                group
                type="text"
                validate
                value={this.state.modalData.name}
                name="name"
                onChange={e => this.handleChange(e)}
              />
              <MDBInput
                label="Customer Email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                value={this.state.modalData.email}
                name="email"
                onChange={e => this.handleChange(e)}
              />
              <MDBInput
                label="Customer Phone"
                icon="tag"
                group
                type="text"
                value={this.state.modalData.phone}
                name="phone"
                onChange={e => this.handleChange(e)}
              />
            </form>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={() => this.toggle()}>
              Close
            </MDBBtn>
            <MDBBtn color="primary" onClick={() => this.saveCustomer()}>
              Save changes
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        {/* <MDBRow className="py-3">
          <MDBCol md="12">
            <SectionContainer header="Datatable with data from API" noBorder>
              <MDBCard>
                <MDBCardBody>
                  <MDBDataTable
                    striped
                    bordered
                    hover
                    data="https://my-json-server.typicode.com/Rotarepmi/exjson/db"
                  />
                </MDBCardBody>
              </MDBCard>
            </SectionContainer>
          </MDBCol>
        </MDBRow> */}
        <MDBRow className="py-3">
          <MDBCol md="12">
            <SectionContainer
              header="Datatable with data from API + custom data"
              noBorder
            >
              <MDBCard>
                <MDBCardBody>
                  <MDBBtn onClick={() => this.addCustomer()} color="primary">
                    Add Customer
                  </MDBBtn>
                  <MDBDataTable
                    striped
                    bordered
                    hover
                    data={this.state.data}
                    sortRows={["id"]}
                  />
                </MDBCardBody>
              </MDBCard>
            </SectionContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default DatatableApiPage;

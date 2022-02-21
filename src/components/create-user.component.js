import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UserTableRow from './UserTableRow';


export default class CreateUser extends Component {

  constructor(props) {
    super(props)
   
    // Setting up functions
    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeStudentNamel = this.onChangeStudentNamel.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentRollno = this.onChangeStudentRollno.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      dob: '' ,
      students: []
 
    }
  }
  userList() {
    axios.get('http://localhost:4000/students/')
    .then(res => {
      this.setState({
        students: res.data
      }); 
    })
    .catch((error) => {
      console.log(error);
    })
  }
  onChangeStudentName(e) {
    this.setState({ firstname: e.target.value })
  }
  onChangeStudentNamel(e) {
    this.setState({ lastname: e.target.value })
  }
  onChangeStudentEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeStudentRollno(e) {
    this.setState({ dob: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const studentObject = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email, 
      dob: this.state.dob
    };
    axios.post('http://localhost:4000/students/create-student', studentObject)
    .then(res => console.log("User Created",res.data));

  this.setState({ firstname: '',lastname: '', email: '', dob: '' })
  this.userList()
  }
  componentDidMount() {
    this.userList()
  }

  DataTable() {
    return this.state.students.map((res, i) => {
      return <UserTableRow obj={res} key={i} />;
    });
  }

  render() {
    
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" value={this.state.firstname} onChange={this.onChangeStudentName} required/>
        </Form.Group>
        <Form.Group controlId="Name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" value={this.state.lastname} onChange={this.onChangeStudentNamel}required />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail} required/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date"  max="2022-02-26"  value={this.state.dob} onChange={this.onChangeStudentRollno} required/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          Create User
        </Button>
      </Form>
    <br></br>
      <Table striped bordered hover  className="table-wrapper">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
   
  
    </div>);
  }
}
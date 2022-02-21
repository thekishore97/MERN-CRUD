import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default class EditUser extends Component {

  constructor(props) {
    super(props)
   
    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeStudentNamel = this.onChangeStudentNamel.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentRollno = this.onChangeStudentRollno.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      dob: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/students/edit-student/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
          dob: res.data.dob
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

  axios.put('http://localhost:4000/students/update-student/' + this.props.match.params.id, studentObject)
  .then((res) => {
    console.log(res.data)
    console.log('User successfully updated')
  }).catch((error) => {
    console.log(error)
  })
    // Redirect to User List 
    this.props.history.push('/create-user')
  }
  Cancel(){
    
    this.props.history.push('/')
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" value={this.state.firstname} onChange={this.onChangeStudentName}  />
        </Form.Group>
        <Form.Group controlId="Name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" value={this.state.lastname} onChange={this.onChangeStudentNamel}  />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail}  />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date"   value={this.state.dob} onChange={this.onChangeStudentRollno}  />
        </Form.Group>
<br></br>
        <Button className="edit-link"  size="lg" block="block" type="submit">
          Update User
        </Button>
        <Link   className="edit-link1" variant="danger" size="lg"   to={'/' }>
          Cancel
        </Link>
      </Form>
    </div>);
  }
}
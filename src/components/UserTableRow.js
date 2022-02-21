import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import { confirmAlert } from "react-confirm-alert";

import "react-confirm-alert/src/react-confirm-alert.css";

export default class UserTableRow extends Component {
  constructor(props) {
    super(props)
    this.deleteStudent = this.deleteStudent.bind(this)
  }

  deleteStudent() {
    confirmAlert({
      title: "Are you sure?",
      message: "Do you really want to delete these records? This process cannot be undone.",
      buttons: [
        {
          label: "Yes",
          onClick: () =>axios
          .delete(
            'http://localhost:4000/students/delete-student/' + this.props.obj._id,
          )
          .then((res) => {
            console.log('User successfully deleted!')
            window.location.reload();
          })
          .catch((error) => {
            console.log(error)
          }),
        },
        {
          label: "No",
          // onClick: () => alert("Click No"),
        },
      ],
    });
    
  }
 
  render() {
    return (
      <tr>
        <td>{this.props.obj.firstname}</td>
        <td>{this.props.obj.lastname}</td>
        <td>{this.props.obj.email}</td>
        <td>{this.props.obj.dob}</td>
        <td>
          <Link
            className="edit-link" path={"product/:id"}
            to={'/edit-user/' + this.props.obj._id}
          >
            Edit
          </Link>
          <br></br>  <br></br><Button onClick={this.deleteStudent} size="md" variant="danger">
            Delete
          </Button>
        </td>
      </tr>
    )
  }
}

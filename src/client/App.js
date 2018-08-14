import React, { Component } from "react";
import { Icon, Layout, Row, Col, Button } from 'antd';
import "./app.css";
import ReactImage from "./react.png";
import moment from 'moment';
import Detail from "./components/Detail"
import Chat from "./components/Chat"

const { Header, Footer, Content } = Layout;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  componentDidMount() {
    fetch("/api/getUsername")
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  handleChange(event) {
   this.setState({value: event.target.value});
  }
  handleKeydown(event) {
    if (event.keyCode === 13) {
      alert('An essay was submitted: ' + this.state.value);
      event.preventDefault();
    }
  }

  render() {
    return (
      <div id="app">
        <Row>
          <Col xs={0} sm={6} md={6} lg={6} className="chatcontainer">
            {this.state.username ? (
              <h1>Hello {this.state.username}</h1>
            ) : (
              <h1>Loading.. please wait!</h1>
            )}
          </Col>
          <Col xs={24} sm={18} md={18} lg={12} className="chatcontainer">
            <Chat
              value={this.state.value}
              handleChange={(e) => this.handleChange(e)}
              handleKeydown={(e) => this.handleKeydown(e)}>
            </Chat>
          </Col>
          <Col xs={0} sm={0} md={0} lg={6} className="chatcontainer">
            <Detail />
          </Col>
        </Row>
      </div>
    );
  }
}

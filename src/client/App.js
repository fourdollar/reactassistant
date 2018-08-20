import React, { Component } from "react";
import axios from 'axios'
import { Row, Col, Button } from 'antd';
import "./app.css";
import moment from 'moment';
import Detail from "./components/Detail"
import Chat from "./components/Chat"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      value: '',
      requestPayload: {},
      responsePayload: {},
      chatcontent: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("/api/getUsername")
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
    this.sendRequest( '',null );

  }

  handleChange(event) {
   this.setState({value: event.target.value});
  }

  handleKeydown(event) {
    if (event.keyCode === 13) {
      console.log('some word was submitted: ' + this.state.value);
      if (this.state.value) {
        var context;
        var text = this.state.value;
        console.log(this.state.responsePayload);
        var latestResponse = this.state.responsePayload;
        if (latestResponse) {
          context = latestResponse.context;
        }
        // Send the user message
        var chatcontent = this.state.chatcontent.slice();
        chatcontent.push({
          from:"user",
          text:text
        })
        this.sendRequest(text,context);
        // Clear input box for further messages
        this.setState({value :"", chatcontent :chatcontent});
      }
      event.preventDefault();
    }
  }

  handleClick(text) {
    console.log(text);
    console.log('some word was submitted: ' + text);
    if (text) {
      var context;
      console.log(this.state.responsePayload);
      var latestResponse = this.state.responsePayload;
      if (latestResponse) {
        context = latestResponse.context;
      }
      // Send the user message
      var chatcontent = this.state.chatcontent.slice();
      this.sendRequest(text,context);

      // need add an animation to shift button to right

    }

  }

  sendRequest(text,context) {
      // Build request payload
      var payloadToWatson = {};
      var messageEndpoint = '/api/chat/message';
      if (text) {
        payloadToWatson.input = {
          text: text
        };
      }
      if (context) {
        payloadToWatson.context = context;
      }
      var headers = { headers: {'Content-Type': 'application/json; charset=utf-8',} }
      var params = JSON.stringify(payloadToWatson);
      if (Object.getOwnPropertyNames(payloadToWatson).length !== 0) {
        this.setState({RequestPayload:JSON.parse(params)});
      }
      // Send request
      axios.post(messageEndpoint, params, headers)
      .then(res => {
        this.setState({responsePayload : res.data});
        if (res.data.output.generic) {
          var responsedata = res.data.output.generic;
          var chatcontent = this.state.chatcontent.slice();
          var eachtypecontent = {}
          for (var i = 0; i < responsedata.length; i++) {
            if (responsedata[i].response_type == "text") {
              eachtypecontent.from = "watson"
              eachtypecontent.text = responsedata[i].text

              if (responsedata[i].text.match("最近东京的天气")) {
                axios.get("https://free-api.heweather.com/s6/weather/forecast",{
                  params: {
                    key:"e74d5e41d8a5436b8fb961633f009b5b",
                    location:"东京"
                  }
                })
                .then(res => {
                  console.log(res.data.HeWeather6[0].daily_forecast);
                  var weatherdata = res.data.HeWeather6[0].daily_forecast
                  eachtypecontent.weather = weatherdata;
                  eachtypecontent.from = "watson"
                  this.setState({chatcontent : chatcontent});
                })
              }
            }
            if (responsedata[i].response_type == "image") {
              eachtypecontent.from = "watson"
              eachtypecontent.img = responsedata[i].source
            }
            if (responsedata[i].response_type == "option") {
              eachtypecontent.from = "watson"
              eachtypecontent.button = responsedata[i].options
            }
          }
          chatcontent.push(eachtypecontent)
          this.setState({chatcontent : chatcontent});
        }
      })
      .catch(error => {
        console.log(error)
        var chatcontent = this.state.chatcontent.slice();
        chatcontent.push({
          from:"watson",
          text:"there is something wrong please check console.log"
        })
        this.setState({chatcontent : chatcontent});
      });
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
            <Chat value={this.state.value}
                  chatcontent={this.state.chatcontent}
                  handleChange={(e) => this.handleChange(e)}
                  handleKeydown={(e) => this.handleKeydown(e)}
                  handleClick={(data) => this.handleClick(data)} />
          </Col>
          <Col xs={0} sm={0} md={0} lg={6} className="chatcontainer">
            <Detail />
          </Col>
        </Row>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Icon, Layout, Row, Col, Button } from 'antd';
import ReactImage from "../react.png";

const { Header, Footer, Content } = Layout;
function Userinput(props){
  return (
    <div className="chat-message chat-message--anchor-right">
      <p className="chat-message--user">
        {props.value.text}
      </p>
    </div>
  );
}

class Watsonoutput extends React.Component {
  renderButton(i,label){
    return(
      <Watsonbutton
        key={i}
        label={this.props.value.button[i].label}
        value={this.props.value.button[i].value.input.text}
        onClick={()=>this.props.handleClick(label)} />
    )
  }
  render() {
    if (this.props.value.button) {
      var buttonlist=[];
      var buttoncontent=this.props.value.button;

      for(var i=0;i<buttoncontent.length;i++){
        buttonlist.push(this.renderButton(i,buttoncontent[i].value.input.text));
      }
      return (
        <div className="chat-message chat-message--bot">
          <p>
            {this.props.value.text}
          </p>
          {buttonlist}
        </div>
      );
    }else{
      return (
        <div className="chat-message chat-message--bot">
          <p>
            {this.props.value.text}
          </p>
        </div>
      );
    }
  }
}

class Watsonbutton extends React.Component {

  sendRequest(){
    this.props.handleClick("hi");
  }
  render() {
    return (
      <button className="watsonbutton" onClick={()=>this.props.onClick()}>
        {this.props.label}
      </button>
    );
  }
}

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder:'Type here...',
    };
  }
  creatElement(i){
    if (this.props.chatcontent[i].from == "user") {
      return (
        <Userinput key={i} value={this.props.chatcontent[i]} />
      );
    }else if (this.props.chatcontent[i].from == "watson") {
      return(
        <Watsonoutput key={i} value={this.props.chatcontent[i]} handleClick={this.props.handleClick} />
      )
    }
  }
  render() {
    var chatlist=[];
    var chatcontent=this.props.chatcontent;

    for(var i=0;i<chatcontent.length;i++){
      chatlist.push(this.creatElement(i));
    }
    return (
      <div>
        <Layout className="chat-layout">
          <Header className="chat-header"><Icon type="coffee" />  Midori's Assistant</Header>
          <Content className="chat-content">
            <div id="chatlist" className="chatlist">
              {chatlist}
            </div>
          </Content>
          <Footer>
            <div className="inputline">
              <input type="text" value={this.props.value} onChange={this.props.handleChange} onKeyDown={(e)=>{this.props.handleKeydown(e)}} placeholder={this.state.placeholder} />
            </div>
          </Footer>
        </Layout>
        {/* <img src={ReactImage} alt="react" /> */}
      </div>
    );
  }
}


    // <Button type="primary" onClick={sendrequrest()} >{props.label}</Button>

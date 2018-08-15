import React, { Component } from "react";
import { Icon, Layout, Row, Col, Button } from 'antd';
import ReactImage from "../react.png";

const { Header, Footer, Content } = Layout;
function Userinput(props){
  return (
    <div className="chat-message chat-message--anchor-right">
      <p className="chat-message--user">
        {props.value}
      </p>
    </div>
  );
}
function Watsonoutput(props){
  return (
    <div className="chat-message chat-message--bot">
      <p>
        {props.value}
      </p>
    </div>
  );
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
        <Userinput key={i} value={this.props.chatcontent[i].text} />
      );
    }else if (this.props.chatcontent[i].from == "watson") {
      return(
        <Watsonoutput key={i} value={this.props.chatcontent[i].text} />
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


// <div className="chat-message chat-message--bot"><p>hello</p></div>
// <div className="chat-message chat-message--anchor-right"><p className="chat-message--user">hi</p></div>
// <div className="chat-message chat-message--bot"><p>hello</p></div>
// <div className="chat-message chat-message--anchor-right"><p className="chat-message--user">hi</p></div>
// </div>

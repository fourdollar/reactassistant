import React, { Component } from "react";
import { Icon, Layout, Row, Col, Button } from 'antd';

const { Header, Footer, Content } = Layout;

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder:'Type here...',
    };
  }


  render() {
    return (
      <div>
        <Layout className="chat-layout">
          <Header className="chat-header"><Icon type="coffee" />  Midori's Assistant</Header>
          <Content className="chat-content">
            <div id="chatlist" className="chatlist">
             <div className="chat-message chat-message--bot"><p>hello</p></div>
             <div className="chat-message chat-message--anchor-right"><p className="chat-message--user">hi</p></div>
             <div className="chat-message chat-message--bot"><p>hello</p></div>
             <div className="chat-message chat-message--anchor-right"><p className="chat-message--user">hi</p></div>

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

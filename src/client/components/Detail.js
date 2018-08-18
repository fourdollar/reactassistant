import React, { Component } from "react";
import { Drawer, List, Avatar, Divider, Row, Col } from 'antd';

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};
const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailvisible: false,
    };
  }

  showDrawer = () => {
    this.setState({
      detailvisible: true,
    });
  };

  onClose = () => {
    this.setState({
      detailvisible: false,
    });
  };

  render() {
    return (
      <div>
        <List
          dataSource={[
            {
              name: '東京 => 新大阪',
            },
            {
              name: '新大阪 => 東京',
            },
          ]}
          bordered
          renderItem={item => (
            <List.Item key={item.id} actions={[<a onClick={this.showDrawer}>View Profile</a>]}>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                }
                title={<a href="https://ant.design/index-cn">{item.name}</a>}
                description="合計金額"
              />
            </List.Item>
          )}
        />
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.detailvisible}
        >
          <p style={{ pStyle, marginBottom: 24 }}>予約詳細</p>
          <p style={pStyle}>購入者情報</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Full Name" content="Lily" />{' '}
            </Col>
            <Col span={12}>
              <DescriptionItem title="Account" content="JReast@example.com" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="City" content="tokyo" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Country" content="Japan" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Birthday" content="February 2,1900" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Website" content="-" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Message"
                content="Make things as simple as possible but no simpler."
              />
            </Col>
          </Row>
          <Divider />
          <p style={pStyle}>列車情報</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="From" content="tokyo" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="To" content="osaka" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="発車" content="18:00" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="到着" content={<a>20:30</a>} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="お知らせ"
                content="西日本、四国、九州地方の大雨の影響により、列車の運休・運転見合わせ・運転計画の変更が発生しております。えきねっと「乗換・運賃案内」では、大雨の影響に伴う運休・時刻変更には対応しておりませんので、ご利用の際には、事前に鉄道各社ホームページ等にて運行状況をご確認いただきますようお願い申し上げます"
              />
            </Col>
          </Row>
          <Divider />
          <p style={pStyle}>Contacts</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Email" content="AntDesign@example.com" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Github"
                content={(
                  <a href="https://www.eki-net.com/top/index.html">
                    www.eki-net.com/top/index.html
                  </a>
                )}
              />
            </Col>
          </Row>
        </Drawer>
      </div>
    );
  }
}

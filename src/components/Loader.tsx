import { Card, Skeleton, Space, Row, Col } from "antd";

export const ListLoader = () => { 
  return (
    <Card title={<Skeleton title={{ width: 200 }} active paragraph={false} />}>
      <Space direction="vertical" size="large">
        <Skeleton title={{ width: 300 }} active paragraph={false} />
        <Row gutter={32}>
          <Col xs={24} xl={12}>
            <Space size={0} direction="vertical">
              <Skeleton.Input active className="input-loader" />
              <Skeleton.Input active className="input-loader" />
              <Skeleton.Input active className="input-loader" />
            </Space>
          </Col>
          <Col xs={24} xl={12}>
            <Space size={0} direction="vertical">
              <Skeleton.Input active className="input-loader" />
              <Skeleton.Input active className="input-loader" />
              <Skeleton.Input active className="input-loader" />
            </Space>
          </Col>
        </Row>
        <Space>
          <Skeleton.Button active />
          <Skeleton.Button active />
        </Space>
        <Skeleton title={{width: 300}} active />
      </Space>
    </Card>
  );
};

export const FormLoader = () => {  
  return (
    <Card title={<Skeleton title={{ width: 200 }} active paragraph={false} />}>
      <Space direction="vertical" size={0}>
        <Skeleton title={{ width: 200 }} active paragraph={false} />
        <br />
        <Skeleton.Input active className="input-loader" />
        <Skeleton.Input active className="input-loader" />
        <Skeleton.Input active className="input-loader" />
        <Skeleton.Input active className="input-loader" />
        <Skeleton.Input active className="input-loader" />
        <Skeleton.Input active className="input-loader" />
        <Space>
          <Skeleton.Button active />
          <Skeleton.Button active />
          <Skeleton.Button active />
        </Space>
      </Space>
    </Card>
  )
};

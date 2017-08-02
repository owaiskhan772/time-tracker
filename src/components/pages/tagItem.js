import React from 'react';
import { Row, Col, Well, Label } from 'react-bootstrap';

const TagItem = ({tagName, timeElapsed}) => {
  const tags = tagName.map(function(tag, index){
    return(
      <Label bsStyle='success' key={index}>
        { tag }
      </Label>
    );
  });

  return(
    <Well bsClass='alert alert-warning'>
      <Row>
        <Col xs={12}>
          <p>Tags: { tags }</p>
          <p>Time Elapsed (h:m:s): { timeElapsed  }</p>
        </Col>
      </Row>
    </Well>
  );
}
export default TagItem;

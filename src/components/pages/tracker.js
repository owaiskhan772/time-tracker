import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { Well, Grid, Col, Row, Button, Label, Modal, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import TagItem from './tagItem';
import * as trackerActions from '../../actions/index';

class Tracker extends React.Component{

  /*
  * @function
  * constructor(@param1)
  * @param1: initial props provided
  */
  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      showModal: false,
      tagValue: ''
    };
  }

  /*
  * @function
  * onInputChange(@param1) is called: when changing the textbox text
  * @param1: provide the entered text from the textbox
  */
  onInputChange(event){
    this.setState({
      tagValue: event.target.value
    });
  }

  /*
  * @function
  * saveTag() is called: saving the entered tags along with the elapsed time of the timer
  */
  saveTag(){
    const tagName = this.state.tagValue;
    const timeElapsedSeconds = parseInt(findDOMNode(this.refs.timeElapsedSeconds).value);
    const timeElapsedMinutes = parseInt(findDOMNode(this.refs.timeElapsedMinutes).value);
    const timeElapsedHours = parseInt(findDOMNode(this.refs.timeElapsedHours).value);

    const timeElapsed = timeElapsedHours +':'+ timeElapsedMinutes +':'+ timeElapsedSeconds;
    if(tagName != ''){
      this.props.saveTag(tagName, timeElapsed);
      this.closeModal();
    }
  }

  /*
  * @function
  * handleTimerToggle() is called: handling the toggling of the timer
  */
  handleTimerToggle() {
    this.setState({
      timerStart: !this.state.timerStart
    });
  }

  /*
  * @function
  * openModal() is called: setting the showModal to true and making the modal open.
  * clearing the Input HTML tag for new entry
  * toggle the timer i.e. @REQUIREMENT: Once you click on the stop button the app should display an chip input to enter tags and a save button.
  */
  openModal(){
    this.setState({
      showModal: true,
      timerStart: !this.state.timerStart,
      tagValue: ''
    });
  }

  /*
  * @function
  * closeModal() is called: setting the showModal to false and making the modal close.
  */
  closeModal(){
    this.setState({
      showModal: false
    });
  }

  /*
  * @function
  * setTimer(@param1)
  * @param1: provided with the immutable total seconds
  * @return: returns the converted minutes, hours and seconds from the total seconds
  */
  setTimer(sec_num){
    const hours   = Math.floor(sec_num / 3600);
    const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    const seconds = sec_num - (hours * 3600) - (minutes * 60);
    return {
      minutes,
      hours,
      seconds
    };
  }

  /*
  * @function
  * componentDidMount() is called: immediately after initial rendering.
  */
  componentDidMount(){
    this.props.getTags();
    this.closeModal();
  }

  /*
  * @function
  * componentDidUpdate() is called: after component's updates are flushed to DOM.
  */
  componentDidUpdate() {
    const { addTime } = this.props;
    if (this.state.timerStart) {
      setTimeout(() => {
        addTime(1);
      }, 1000);
    }
  }

  render(){
    const { timerStart } = this.state;
    let tagsList, showTagHeader;
    if(this.props.items.tags.length > 0){
      showTagHeader = <h2>Tag List</h2>;
      tagsList = this.props.items.tags.map(function(tag, index){
        return(
          <Col xs={12} sm={6} md={4} key={index}>
            <TagItem
              tagName={ tag.tagName }
              timeElapsed={ tag.timeElapsed }
            />
          </Col>
        );
      });
    }
    return(
      <Grid style={{ marginTop: '60px' }}>
        <Row>
          { showTagHeader }
          { tagsList }
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12}>
            <h2>Ticker</h2>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Well><h5>Hours:</h5><p>{ this.setTimer(this.props.items.seconds).hours }</p></Well>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Well><h5>Minutes:</h5><p>{ this.setTimer(this.props.items.seconds).minutes }</p></Well>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Well><h5>Seconds:</h5><p>{ this.setTimer(this.props.items.seconds).seconds }</p></Well>
          </Col>
          <input type='hidden' ref='timeElapsedSeconds' value={ this.setTimer(this.props.items.seconds).seconds } />
          <input type='hidden' ref='timeElapsedMinutes' value={ this.setTimer(this.props.items.seconds).minutes } />
          <input type='hidden' ref='timeElapsedHours' value={ this.setTimer(this.props.items.seconds).hours } />
        </Row>
        <Row>
          <Button bsStyle='default' onClick={ (this.state.timerStart) ? this.openModal.bind(this) : this.handleTimerToggle.bind(this) }>
            { timerStart && 'Stop timer' }
            { !timerStart && 'Start timer' }
          </Button>
        </Row>
        <Modal show={ this.state.showModal } onHide={ this.closeModal.bind(this) }>
          <Modal.Header closeButton>
            <Modal.Title>Time Tracker</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="formValidationNull" validationState={null}>
              <ControlLabel>Please, enter your tag names (comma separated):</ControlLabel>
              <FormControl type='text' ref='tagValue' value={ this.state.tagValue } onChange={ this.onInputChange.bind(this) } />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={ this.saveTag.bind(this) }>Save</Button>
            <Button onClick={ this.closeModal.bind(this) }>Close</Button>
          </Modal.Footer>
        </Modal>
      </Grid>
    );
  }
}

function mapStateToProps(state){
  return{
    items: state.items
  }
}

function mapDispatchToProps(dispatch){
  return{
    addTime: (seconds) => dispatch(trackerActions.addTime(seconds)),
    saveTag: (tagName, timeElapsed) => dispatch(trackerActions.saveTag(tagName, timeElapsed)),
    getTags: () => dispatch(trackerActions.getTags())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);

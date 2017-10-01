import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <CourseForm/>
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
//
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
};

const connected = connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
export default connected;

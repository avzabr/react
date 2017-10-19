import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {createCourse} from "../../actions/courseActions";
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {

  constructor(props, contenxt) {
    super(props, contenxt);

    this.state = {
      course: {title: ''}
    };

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit" value="Add Course" className="btn btn-primary" onClick={this.redirectToAddCoursePage}/>
        <CourseList courses={this.props.courses}/>
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  createCourse: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCourse: (course) => {
      dispatch(createCourse(course));
    }
  };
};

const connected = connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
export default connected;

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {createCourse} from "../../actions/courseActions";

class CoursesPage extends React.Component {

  constructor(props, contenxt) {
    super(props, contenxt);

    this.state = {
      course: {title: ''}
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  courseRow(course, index) {
    return (<div key={index}>{course.title}</div>);
  }

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({
      course: course
    });
  }

  onClickSave() {
    this.props.createCourse(this.state.course);
    this.setState({
      course: {
        title: ''
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add Course</h2>
        <input type="text"
               onChange={this.onTitleChange}
               value={this.state.course.title}/>
        <input type="submit"
               onClick={this.onClickSave}/>
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

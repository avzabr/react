import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {}
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourseState = this.saveCourseState.bind(this);
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({course});
  }

  saveCourseState(e) {
    e.preventDefault();
    this.props.actions.saveCourse(this.state.course);
  }

  render() {
    return (
      <div>
        <CourseForm
          allAuthors={this.props.authors}
          course={this.state.course}
          errors={this.state.errors}
          onChange={this.updateCourseState}
          onSave={this.saveCourseState}
        />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array,
  actions: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.routeParams.id;
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
  if (id) {
    course = state.courses.filter((course) => {
      return course.id === id;
    })[0];
  }

  const authorsFormattedForDropDown = () => state.authors.map((author) => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {course: course, authors: authorsFormattedForDropDown(state.authors)};
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
};

const connected = connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
export default connected;

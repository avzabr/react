import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';


const CouseForm = ({course, allAuthors, onSave, onChange, loading, errors}) => {
  return (
    <form>
      <h1>Manage Courses</h1>
      <TextInput name="title"
                 label="title"
                 onChange={onChange}
                 error={errors.title}/>
      <SelectInput name="authorId"
                   label="Author"
                   value="course.authorId"
                   defaultOption="SelectAuthor"
                   options={allAuthors}
                   onChange={onChange}
                   error={errors.authorId}/>
      <TextInput name="category"
                 label="category"
                 onChange={onChange}
                 error={errors.category}/>
      <TextInput name="length"
                 label="length"
                 onChange={onChange}
                 error={errors.length}/>
      <input type="submit"
             disabled={loading}
             value={loading ? 'Saving..' : 'Save'}
             className="btn btn-primary"
             onClick={onSave}
      />
    </form>
  );
};

CouseForm.propTypes = {
  course: PropTypes.object.isRequired,
  allAuthors: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.array
};

export default CouseForm;

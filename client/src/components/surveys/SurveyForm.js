import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';

const FIELDS = [
  { key: "title", label: 'Survey Title', name: 'title'},
  { key: "subject", label: 'Subject Line', name: 'subject'},
  { key: "body", label: 'Email Body', name: 'body'},
  { key: "emails", label: 'Recipient List', name: 'emails'}
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ key, label, name })=>{
      return(
        <Field
          key={key}
          label={label}
          type="text"
          name={name}
          component={SurveyField}
        />
      );
    });
  };

  render() {
    return(
      <div className="container">
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left white-text">
            <i className="material-icons left">clear</i>
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  };
}

function validate(values) {
  let errors = {};
  if( !values.title || values.title.trim() === null ) {
    errors.title = 'You must provide a title';  
  }
  return errors;
};

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);

 
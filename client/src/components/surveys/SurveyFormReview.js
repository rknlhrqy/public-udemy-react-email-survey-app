import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history}) => {

  const viewFields = _.map(formFields, ({ label, name }) => {
    return(
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return(
    <div>
      <h5>Please confirm your entries</h5>
      {viewFields}
      <button
        className="red btn-flat left white-text"
        onClick={onCancel}
      >
        <i className="material-icons left">clear</i>
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        <i className="material-icons right">email</i>
        Send Survey 
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
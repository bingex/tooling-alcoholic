import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// State management
import { getCompanies } from './../store/actions/companyActions';

function CompaniesPage(props) {
  useEffect(() => {
    props.getCompanies();
  }, {});

  return (
    <div>
      {props.companies.map((c, i) => (
        <div key={i}>{c}</div>
      ))}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    companies: state.companyReducer.companies
  };
}

export default connect(
  mapStateToProps,
  { getCompanies }
)(CompaniesPage);

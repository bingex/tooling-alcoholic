import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SingleCompany from './SingleCompany';

// State management
import { getCompanies } from './../store/actions/companyActions';

// Styles
import { Styled__CircleButton } from './shared/StyledCommon';

// Icons
import { FaPlus } from 'react-icons/fa';

function CompaniesPage(props) {
  const [modifySectionIsOpen, showModifyCompanySection] = useState(false);
  const [companyToModify, setCompanyToModify] = useState(null);

  useEffect(() => {
    props.getCompanies();
  }, {});

  return (
    <div>
      {props.companies &&
        props.companies.map((c, i) => <div key={i}>{c.name}</div>)}

      <Styled__CircleButton
        onClick={() => {
          setCompanyToModify(null);
          showModifyCompanySection(true);
        }}
      >
        <FaPlus size={20} />
      </Styled__CircleButton>

      <SingleCompany
        modifySectionIsOpen={modifySectionIsOpen}
        showModifyCompanySection={showModifyCompanySection}
        companyToModify={companyToModify}
      />
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

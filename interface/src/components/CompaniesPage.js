import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SingleCompany from './SingleCompany';
import { apiDeleteCompany } from './../utils/api';

// State management
import { getCompanies, removeCompany } from './../store/actions/companyActions';
import { setErrors } from '../store/actions/commonActions';

// Styles
import {
  Styled__CircleButton,
  Styled__TileWrapper,
  Styled__Tile,
  Styled__TileActions,
  Styled__TileEdit,
  Styled__TileDelete
} from './shared/StyledCommon';

// Icons
import { FaPlus } from 'react-icons/fa';

function CompaniesPage(props) {
  const [modifySectionIsOpen, showModifyCompanySection] = useState(false);
  const [companyToModify, setCompanyToModify] = useState(null);

  useEffect(() => {
    props.getCompanies();
  }, {});

  const companies =
    props.companies &&
    props.companies.map((c, i) => (
      <Styled__Tile key={i}>
        <Styled__TileActions>
          <span>{c.name}</span>
          <span>
            <Styled__TileEdit
              onClick={() => {
                setCompanyToModify(c);
                showModifyCompanySection(true);
              }}
              size={24}
            />
            <Styled__TileDelete
              onClick={() => {
                deleteCompany(c.id);
              }}
              size={24}
            />
          </span>
        </Styled__TileActions>
      </Styled__Tile>
    ));

  /**
   * Sends request to remove company by id
   * @param {Number} id
   */
  function deleteCompany(id) {
    apiDeleteCompany(id)
      .then(response => {
        if (response.data && response.data.success) {
          props.removeCompany(id);
        }
      })
      .catch(errors => {
        if (errors.response) props.setErrors(errors.response.data);
      });
  }

  return (
    <Styled__TileWrapper>
      {companies}

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
    </Styled__TileWrapper>
  );
}

function mapStateToProps(state) {
  return {
    companies: state.companyReducer.companies
  };
}

export default connect(
  mapStateToProps,
  { getCompanies, removeCompany }
)(CompaniesPage);

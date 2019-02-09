import PropTypes from "prop-types";
import React from "react";
import Issue from "../../../atoms/Issue";

import "./IssuesList.scss";

const IssuesList = ({ issues, ...rest }) => (
  <div className="IssuesList">
    {issues.map(issue => (
      <Issue
        key={issue.id}
        issue={issue}
        {...rest}
      />
    ))}
  </div>
);

IssuesList.propTypes = {
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  ).isRequired,
  remove: PropTypes.func.isRequired,
  closed: PropTypes.func.isRequired,
  pending: PropTypes.func.isRequired
};

export default IssuesList;

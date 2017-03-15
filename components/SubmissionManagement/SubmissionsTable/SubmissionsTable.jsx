/**
 * This component will render the entire assemly of submissions table.
 * It receives via props the array of submission data objects;
 * a showDetails set with submission IDs for which details panel
 * should be shown; and type property (design or develop) to know
 * whether the screening status column should be rendered.
 *
 * Also it will receive a bunch of callbacks which should be properly
 * wired to the children components:
 * onDelete(submissionId) – to delete specified submission;
 * onDownload(submissionId) – to download the specified submission;
 * onOpenOnlineReview(submissionId);
 * onHelp(submissionId);
 * onShowDetails(submissionId).
 */
import React, { PropTypes as PT } from 'react';
import _ from 'lodash';
import shortid from 'shortid';
import Submission from '../Submission/Submission';
import ScreeningDetails from '../ScreeningDetails/ScreeningDetails';

import './SubmissionsTable.scss';

export default function SubmissionsTable(props) {
  const {
    submissionObjects,
    showDetails,
    type,
    onDelete,
    onOpenOnlineReview,
    onHelp,
    onDownload,
    onShowDetails,
  } = props;

  const submissionsWithDetails = [];
  if (!submissionObjects || submissionObjects.length === 0) {
    submissionsWithDetails.push(
      <tr key={999} className="submission-row">
        <td colSpan="6" className="no-submission">
          You have no submission uploaded so far.
        </td>
      </tr>,
    );
  } else {
    submissionObjects.forEach((subObject) => {
      const submission = (
        <Submission
          submissionObject={subObject}
          showScreeningDetails={showDetails.has(subObject.id)}
          type={type}
          onShowDetails={onShowDetails}
          onDelete={onDelete}
          onDownload={onDownload}
          key={shortid.generate()}
        />
      );
      submissionsWithDetails.push(submission);

      const submissionDetail = (
        <tr key={subObject.id} className="submission-row">
          {showDetails.has(subObject.id) &&
            <td colSpan="6" className="dev-details">
              <ScreeningDetails
                screeningObject={subObject.screening}
                onHelp={onHelp}
                onOpenOnlineReview={onOpenOnlineReview}
                submissionId={subObject.id}
              />
            </td>}
        </tr>
      );
      submissionsWithDetails.push(submissionDetail);
    });
  }

  return (
    <div className="submissions-table">
      <table>
        <thead>
          <tr>
            <th>Preview</th>
            <th>ID</th>
            <th>Type</th>
            <th>Submission Date</th>
            {type === 'design' && <th className="status">Screening Status</th>}
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissionsWithDetails}
        </tbody>
      </table>
    </div>
  );
}

const SubShape = PT.shape({
  id: PT.string,
  warpreviewnings: PT.string,
  screening: PT.shape({
    status: PT.string,
  }),
  submitted: PT.string,
  type: PT.string,
});

SubmissionsTable.defaultProps = {
  submissionObjects: [],
  showDetails: new Set(),
  type: '',
  onDelete: _.noop,
  onOpenOnlineReview: _.noop,
  onHelp: _.noop,
  onDownload: _.noop,
  onShowDetails: _.noop,
};

SubmissionsTable.propTypes = {
  submissionObjects: PT.arrayOf(SubShape),
  showDetails: PT.instanceOf(Set),
  type: PT.string,
  onDelete: PT.func,
  onOpenOnlineReview: PT.func,
  onHelp: PT.func,
  onDownload: PT.func,
  onShowDetails: PT.func,
};

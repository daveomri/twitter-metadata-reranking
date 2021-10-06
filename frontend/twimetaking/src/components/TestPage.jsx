import React from 'react';
import PropTypes from 'prop-types';

const TestPage = (props) => {
  const { data } = props;

  if (!data) return <div />;

  return (
    <div>
      <h1>{data.name}</h1>
      <h1>{data.rtl}</h1>
    </div>
  );
};

TestPage.propTypes = {
  data: PropTypes.string.isRequired,
};

export default TestPage;

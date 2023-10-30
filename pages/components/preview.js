import React from 'react'
import LoadingIndicator from './LoadingIndicator'

function Preview({ show, isLoading, content }) {
  return show ? (
    <div>
      {/* Add logic to display previews, e.g., image or table */}
      <LoadingIndicator isLoading={isLoading} />
    </div>
  ) : null
}

export default Preview

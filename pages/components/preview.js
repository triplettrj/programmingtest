import React from 'react'
import LoadingIndicator from './loadingIndicator'

function Preview({ show, isLoading, content }) {
  return show ? (
    <div>
      {content}
      <LoadingIndicator isLoading={isLoading} />
    </div>
  ) : null
}

export default Preview 

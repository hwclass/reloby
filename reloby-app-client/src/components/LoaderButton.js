import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import './LoaderButton.css';

export default ({ isLoading, text, loadingText, disabled = false, ...props }) => (
  <Button disabled={ disabled || isLoading } {...props}>
    { isLoading && <Glyphicon glyph="refresh" className="spinning" /> }
    { !isLoading ? text : loadingText }
  </Button>
);
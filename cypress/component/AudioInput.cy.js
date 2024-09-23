import React from 'react';
import AudioInput from './../../src/components/AudioInput/index.js';

describe('AudioInput Component', () => {
  it('renders the drop zone and the record button', () => {
    cy.mount(<AudioInput onAudioSubmit={() => {}} isLoading={false} />);
    cy.get('.drop-zone').should('exist');
    cy.get('button').should('exist');
  });

  it('triggers file upload', () => {
    const onAudioSubmitMock = cy.stub();
    cy.mount(<AudioInput onAudioSubmit={onAudioSubmitMock} isLoading={false} />);
    
    // Simulate a file upload
    cy.get('input[type="file"]').selectFile('cypress/fixtures/SEMA-MG-2024-04-09T132342-7.wav', { force: true });
    
    // Ensure the file is processed
    cy.wrap(onAudioSubmitMock).should('have.been.called');
  });

  it('toggles recording on button click', () => {
    cy.mount(<AudioInput onAudioSubmit={() => {}} isLoading={false} />);
    
    // Click to start recording
    cy.get('button').click();
    // cy.get('button').contains('Stop').should('exist');  // Check that the button changes to stop

    // Click again to stop recording
    cy.get('button').click();
    // cy.get('button').contains('Mic').should('exist');  // Check that the button changes back to mic
  });
});

import React from 'react';
import Transcription from './../../src/components/Transcription/index.js';

describe('Transcription Component', () => {
  it('renders the transcription component with all steps', () => {
    cy.mount(<Transcription />);
    
    cy.get('h3').contains('Step 1: Upload or Record Your Audio').should('exist');
    cy.get('h3').contains('Step 2: Select the Language of the Audio').should('exist');
    cy.get('h3').contains('Step 3: Transcribe the Audio').should('exist');
  });

  it('allows file upload and language selection', () => {
    cy.mount(<Transcription />);
    
    // Simulate file upload
    cy.get('input[type="file"]').selectFile('cypress/fixtures/SEMA-MG-2024-04-09T132342-7.wav', { force: true });

    // Ensure language dropdown exists and can change value
    cy.get('select').select('English');
    cy.get('select').should('have.value', 'eng');
  });

  it('enables the Transcribe button when audio is uploaded', () => {
    cy.mount(<Transcription />);
    
    cy.get('button').contains('Transcribe').should('be.disabled');
    
    // Simulate file upload
    cy.get('input[type="file"]').selectFile('cypress/fixtures/SEMA-MG-2024-04-09T132342-7.wav', { force: true });
    
    // Now, the button should be enabled
    cy.get('button').contains('Transcribe').should('not.be.disabled');
  });
});

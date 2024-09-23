import React from 'react';
import TranscriptionTextArea from './../../src/components/TranscriptionTextArea/index.js';

describe('TranscriptionTextArea Component', () => {
  it('renders the component', () => {
    cy.mount(<TranscriptionTextArea placeholder="Type here" text="" setText={() => {}} isLoading={false} />);
    cy.get('.text-area-class').should('exist');
  });

  it('displays the placeholder text', () => {
    cy.mount(<TranscriptionTextArea placeholder="Type here" text="" setText={() => {}} isLoading={false} />);
    cy.get('.text-area-class').should('have.attr', 'placeholder', 'Type here');
  });

  // it('shows the loading spinner when isLoading is true', () => {
  //   cy.mount(<TranscriptionTextArea placeholder="Type here" text="" setText={() => {}} isLoading={true} />);
  //   cy.get('.MuiLinearProgress-root').should('exist');  // Material UI Linear Progress bar
  // });

  // it('updates the text when typing', () => {
  //   const setTextMock = cy.stub();
  //   cy.mount(<TranscriptionTextArea placeholder="Type here" text="Initial text" setText={setTextMock} isLoading={false} />);
    
  //   cy.get('.text-area-class').should('have.value', 'Initial text');
  //   cy.get('.text-area-class').type(' Updated');
  //   cy.get('.text-area-class').should('have.value', 'Initial text Updated');
  // });
});

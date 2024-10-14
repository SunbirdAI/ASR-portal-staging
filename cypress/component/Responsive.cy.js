import Transcription from '../../src/components/Transcription'; // Adjust path as necessary

describe('Transcription Component - Responsive Tests', () => {
    const viewports = [[375, 667], [768, 1024], [1440, 900]]; // Mobile, Tablet, Desktop sizes
  
    viewports.forEach((size) => {
      it(`should render correctly on ${size[0]}x${size[1]} viewport`, () => {
        cy.viewport(size[0], size[1]);
        cy.mount(<Transcription />);
        cy.get('button').contains('Transcribe').should('be.visible');
        cy.get('textarea').should('be.visible');
      });
    });
  });
  
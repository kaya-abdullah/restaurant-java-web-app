import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('SeatingTable e2e test', () => {
  const seatingTablePageUrl = '/seating-table';
  const seatingTablePageUrlPattern = new RegExp('/seating-table(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const seatingTableSample = {};

  let seatingTable: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/seating-tables+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/seating-tables').as('postEntityRequest');
    cy.intercept('DELETE', '/api/seating-tables/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (seatingTable) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/seating-tables/${seatingTable.id}`,
      }).then(() => {
        seatingTable = undefined;
      });
    }
  });

  it('SeatingTables menu should load SeatingTables page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('seating-table');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('SeatingTable').should('exist');
    cy.url().should('match', seatingTablePageUrlPattern);
  });

  describe('SeatingTable page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(seatingTablePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create SeatingTable page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/seating-table/new$'));
        cy.getEntityCreateUpdateHeading('SeatingTable');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', seatingTablePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/seating-tables',
          body: seatingTableSample,
        }).then(({ body }) => {
          seatingTable = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/seating-tables+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/seating-tables?page=0&size=20>; rel="last",<http://localhost/api/seating-tables?page=0&size=20>; rel="first"',
              },
              body: [seatingTable],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(seatingTablePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details SeatingTable page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('seatingTable');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', seatingTablePageUrlPattern);
      });

      it('edit button click should load edit SeatingTable page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('SeatingTable');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', seatingTablePageUrlPattern);
      });

      it('last delete button click should delete instance of SeatingTable', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('seatingTable').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', seatingTablePageUrlPattern);

        seatingTable = undefined;
      });
    });
  });

  describe('new SeatingTable page', () => {
    beforeEach(() => {
      cy.visit(`${seatingTablePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('SeatingTable');
    });

    it('should create an instance of SeatingTable', () => {
      cy.get(`[data-cy="tableType"]`).type('Awesome Re-engineered Intelligent').should('have.value', 'Awesome Re-engineered Intelligent');

      cy.get(`[data-cy="seatCount"]`).type('4563').should('have.value', '4563');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        seatingTable = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', seatingTablePageUrlPattern);
    });
  });
});

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

describe('Reservation e2e test', () => {
  const reservationPageUrl = '/reservation';
  const reservationPageUrlPattern = new RegExp('/reservation(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const reservationSample = {};

  let reservation: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/reservations+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/reservations').as('postEntityRequest');
    cy.intercept('DELETE', '/api/reservations/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (reservation) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/reservations/${reservation.id}`,
      }).then(() => {
        reservation = undefined;
      });
    }
  });

  it('Reservations menu should load Reservations page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('reservation');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Reservation').should('exist');
    cy.url().should('match', reservationPageUrlPattern);
  });

  describe('Reservation page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(reservationPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Reservation page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/reservation/new$'));
        cy.getEntityCreateUpdateHeading('Reservation');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', reservationPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/reservations',
          body: reservationSample,
        }).then(({ body }) => {
          reservation = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/reservations+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/reservations?page=0&size=20>; rel="last",<http://localhost/api/reservations?page=0&size=20>; rel="first"',
              },
              body: [reservation],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(reservationPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Reservation page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('reservation');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', reservationPageUrlPattern);
      });

      it('edit button click should load edit Reservation page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Reservation');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', reservationPageUrlPattern);
      });

      it('last delete button click should delete instance of Reservation', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('reservation').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', reservationPageUrlPattern);

        reservation = undefined;
      });
    });
  });

  describe('new Reservation page', () => {
    beforeEach(() => {
      cy.visit(`${reservationPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Reservation');
    });

    it('should create an instance of Reservation', () => {
      cy.get(`[data-cy="reservationDate"]`).type('2022-01-08T15:44').should('have.value', '2022-01-08T15:44');

      cy.get(`[data-cy="personCount"]`).type('27651').should('have.value', '27651');

      cy.get(`[data-cy="seatingInformation"]`).type('Dalasi invoice').should('have.value', 'Dalasi invoice');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        reservation = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', reservationPageUrlPattern);
    });
  });
});

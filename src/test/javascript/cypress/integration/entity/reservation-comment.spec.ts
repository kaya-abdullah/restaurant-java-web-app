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

describe('ReservationComment e2e test', () => {
  const reservationCommentPageUrl = '/reservation-comment';
  const reservationCommentPageUrlPattern = new RegExp('/reservation-comment(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const reservationCommentSample = {};

  let reservationComment: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/reservation-comments+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/reservation-comments').as('postEntityRequest');
    cy.intercept('DELETE', '/api/reservation-comments/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (reservationComment) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/reservation-comments/${reservationComment.id}`,
      }).then(() => {
        reservationComment = undefined;
      });
    }
  });

  it('ReservationComments menu should load ReservationComments page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('reservation-comment');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ReservationComment').should('exist');
    cy.url().should('match', reservationCommentPageUrlPattern);
  });

  describe('ReservationComment page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(reservationCommentPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ReservationComment page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/reservation-comment/new$'));
        cy.getEntityCreateUpdateHeading('ReservationComment');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', reservationCommentPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/reservation-comments',
          body: reservationCommentSample,
        }).then(({ body }) => {
          reservationComment = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/reservation-comments+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/reservation-comments?page=0&size=20>; rel="last",<http://localhost/api/reservation-comments?page=0&size=20>; rel="first"',
              },
              body: [reservationComment],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(reservationCommentPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ReservationComment page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('reservationComment');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', reservationCommentPageUrlPattern);
      });

      it('edit button click should load edit ReservationComment page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ReservationComment');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', reservationCommentPageUrlPattern);
      });

      it('last delete button click should delete instance of ReservationComment', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('reservationComment').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', reservationCommentPageUrlPattern);

        reservationComment = undefined;
      });
    });
  });

  describe('new ReservationComment page', () => {
    beforeEach(() => {
      cy.visit(`${reservationCommentPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ReservationComment');
    });

    it('should create an instance of ReservationComment', () => {
      cy.get(`[data-cy="commentDate"]`).type('2022-01-08T07:09').should('have.value', '2022-01-08T07:09');

      cy.get(`[data-cy="operatorNote"]`).type('product Handmade').should('have.value', 'product Handmade');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        reservationComment = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', reservationCommentPageUrlPattern);
    });
  });
});

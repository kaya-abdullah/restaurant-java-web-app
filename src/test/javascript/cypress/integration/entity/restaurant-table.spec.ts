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

describe('RestaurantTable e2e test', () => {
  const restaurantTablePageUrl = '/restaurant-table';
  const restaurantTablePageUrlPattern = new RegExp('/restaurant-table(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const restaurantTableSample = {};

  let restaurantTable: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/restaurant-tables+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/restaurant-tables').as('postEntityRequest');
    cy.intercept('DELETE', '/api/restaurant-tables/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (restaurantTable) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/restaurant-tables/${restaurantTable.id}`,
      }).then(() => {
        restaurantTable = undefined;
      });
    }
  });

  it('RestaurantTables menu should load RestaurantTables page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('restaurant-table');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('RestaurantTable').should('exist');
    cy.url().should('match', restaurantTablePageUrlPattern);
  });

  describe('RestaurantTable page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(restaurantTablePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create RestaurantTable page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/restaurant-table/new$'));
        cy.getEntityCreateUpdateHeading('RestaurantTable');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', restaurantTablePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/restaurant-tables',
          body: restaurantTableSample,
        }).then(({ body }) => {
          restaurantTable = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/restaurant-tables+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/restaurant-tables?page=0&size=20>; rel="last",<http://localhost/api/restaurant-tables?page=0&size=20>; rel="first"',
              },
              body: [restaurantTable],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(restaurantTablePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details RestaurantTable page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('restaurantTable');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', restaurantTablePageUrlPattern);
      });

      it('edit button click should load edit RestaurantTable page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('RestaurantTable');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', restaurantTablePageUrlPattern);
      });

      it('last delete button click should delete instance of RestaurantTable', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('restaurantTable').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', restaurantTablePageUrlPattern);

        restaurantTable = undefined;
      });
    });
  });

  describe('new RestaurantTable page', () => {
    beforeEach(() => {
      cy.visit(`${restaurantTablePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('RestaurantTable');
    });

    it('should create an instance of RestaurantTable', () => {
      cy.get(`[data-cy="tableCount"]`).type('31345').should('have.value', '31345');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        restaurantTable = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', restaurantTablePageUrlPattern);
    });
  });
});

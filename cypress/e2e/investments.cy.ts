describe("Investments", () => {
    beforeEach(() => {
        cy.signin("test@test.pl", "test");
    });
    it("should get investments page", () => {
        cy.get("button").contains("Investments").click();
        cy.get("h1").contains("Investments").should("exist");
        cy.get("h1").contains("Investments Chart").should("exist");
    });
    it("should create investment", () => {
        cy.get("button").contains("Investments").click();
        cy.get("button").contains("Add New Row").click();
        cy.get('div[role="gridcell"][col-id="name"]').last().within(($cell) => {
            cy.wrap($cell).click().type("New Stock");
        });
        cy.get('div[role="gridcell"][col-id="quantity"]').last().within(($cell) => {
            cy.wrap($cell).dblclick().type("10");
        });
        cy.get('div[role="gridcell"][col-id="buyPrice"]').last().within(($cell) => {
            cy.wrap($cell).dblclick().type("200");
        });
        cy.get('div[role="gridcell"][col-id="currentPrice"]').last().within(($cell) => {
            cy.wrap($cell).dblclick().type("300").type("{enter}");
        });
        cy.wait(600).get('div[role="gridcell"]').each(($cell) => {
            cy.wrap($cell).should("not.have.class", "bg-red-200");
        });
    })
    it("should remove investment", () => {
        cy.get("button").contains("Investments").click();
        cy.get('.ag-center-cols-container').children('div').its('length').then((initialCount) => {
            cy.get("[id='delete-row-button']").last().dblclick();
            cy.get('.ag-center-cols-container').children('div').should('have.length', initialCount - 1);
        });
    });
})
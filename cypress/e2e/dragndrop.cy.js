describe('drag and drop works', () => {
  it('just works', () => {
    cy.visit('/')
    cy.get('#cy-dropzone').selectFile('README.md', { action: 'drag-drop' })
    cy.get('#cy-list').children().first().contains("README.md")
  })
})

import { expect } from '@playwright/test';

export class BookListPage {
  constructor(page) {
    this.page = page;

    this.heading = page.locator('//*[@id="root"]/div/div[2]/h2');
    this.addBookBtn = page.getByRole('button', { name: 'Add Book' });

  }

  async clickAddBook() {
    await this.addBookBtn.click();
  }

  async verifyHeading() {
    await expect(this.heading).toHaveText("Book List");
  }

  async verifyBookAdded(bookName) {
    await expect(this.page.locator('tbody tr').filter({ hasText: bookName })).toBeVisible();
}

async editSelectedBook(bookName) {
    await this.page
  .locator('tbody tr', { hasText: bookName })
  .getByRole('button', { name: 'Edit' })
  .click();
}

  async verifyAmendedDetails(bookName, authorName) {
    const row = await this.page.locator('tbody tr').filter({ hasText: bookName })
    await expect(row).toContainText(authorName);
  }

  async deleteBook(bookName) {
    await this.page
  .locator('tbody tr', { hasText: bookName })
  .getByRole('button', { name: 'Delete' })
  .click();
  }

  async verifyBookDeletion(bookName) {
    await expect(this.page.locator('tbody tr').filter({ hasText: bookName })).not.toBeVisible();
  }
}
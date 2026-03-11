import { expect } from '@playwright/test';

export class EditBookPage {
  constructor(page) {
    this.page = page;

    this.heading = page.locator('//*[@id="root"]/div/div/div/h2');

    this.author = page.locator('input[name="author"]');

    this.saveChangesBtn = page.getByRole('button', { name: 'Save Changes' });
  }

  async verifyHeading() {
    await expect(this.heading).toHaveText("Edit book details");
  }

  async amendBookDetails(authorName) {
    this.author.clear();
    this.author.fill(authorName);
    this.saveChangesBtn.click();    
  }

}
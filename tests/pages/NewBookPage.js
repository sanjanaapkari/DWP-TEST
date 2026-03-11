import { expect } from '@playwright/test';

export class NewBookPage {
  constructor(page) {
    this.page = page;

    this.heading = page.locator('#add-book-heading');
    this.booktitle = page.getByRole('textbox', { name: 'Title:' });
    this.author = page.locator('#author');
    this.isbn = page.locator('#isbn');
    this.price = page.locator('#price');
    this.genre = page.locator('#genre');
    this.publicationDate = page.getByRole('textbox', { name: 'Publication Date:' });
    this.submitBtn = page.getByRole('button', { name: 'Submit Add New Book Form' });
  }

  async addNewBook(bookTitle, author, isbn, price, genre, date) {
    await this.booktitle.fill(bookTitle);
    await this.author.fill(author);
    await this.isbn.fill(isbn);
    await this.price.fill(price);
    await this.genre.selectOption(genre);
    await this.publicationDate.fill(date);
    await this.submitBtn.click();
  }

  async verifyHeading() {
    await expect(this.heading).toHaveText("Add a New Book");
  }

}
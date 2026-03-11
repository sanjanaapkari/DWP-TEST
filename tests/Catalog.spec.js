import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { BookListPage } from './pages/BookListPage';
import { NewBookPage } from './pages/NewBookPage';
import { EditBookPage} from './pages/EditBookPage';

test('Add a book', async ({page}) => {
    const loginPage = new LoginPage(page);
    const bookListPage = new BookListPage(page);
    const newBookPage = new NewBookPage(page);

    await loginPage.navigate();
    await loginPage.login('admin', 'admin');
    await bookListPage.verifyHeading();

    await bookListPage.clickAddBook();
    await newBookPage.verifyHeading();
    await newBookPage.addNewBook('Test Book', 'Sanjana', '12345', '10.99', 'Fiction', '2026-03-14');

    await bookListPage.verifyBookAdded('Test Book');
})

test('Edit a book', async ({page}) => {
    const loginPage = new LoginPage(page);
    const bookListPage = new BookListPage(page);
    const editBookPage = new EditBookPage(page);

    await loginPage.navigate();
    await loginPage.login('admin', 'admin');
    await bookListPage.verifyHeading();

    await bookListPage.editSelectedBook('The Cat in the Hat');
    await editBookPage.verifyHeading();
    await editBookPage.amendBookDetails('Sanjana');
    
    await bookListPage.verifyAmendedDetails('The Cat in the Hat', 'Sanjana');
})

test('Delete a book', async ({page}) => {
    const loginPage = new LoginPage(page);
    const bookListPage = new BookListPage(page);

    await loginPage.navigate();
    await loginPage.login('admin', 'admin');
    await bookListPage.verifyHeading();

    await bookListPage.deleteBook('The Very Busy Spider');
    await bookListPage.verifyBookDeletion('The Very Busy Spider');
})
import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;

    this.heading = page.locator('#login-heading');
    this.username = page.getByRole('textbox', { name: 'Enter your username' });
    this.password = page.getByRole('textbox', { name: 'Enter your password' });
    this.submitBtn = page.getByRole('button', { name: 'Submit login' });
    this.welcomeMessage = page.locator("//*[@id='root']/div/div[1]/h2");
    this.errorHeading = page.locator("h3");
    this.errorMessage = page.locator(".list-disc li");
    this.logoutBtn = page.getByRole('button', { name: 'Log Out' });
  }

  async navigate() {
    await this.page.goto('https://frontendui-librarysystem.onrender.com/login');
  }

  async verifyLoginPage() {
    await expect(this.heading).toHaveText("Login");
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submitBtn.click();
  }

  async verifySuccessfulLogin() {
    await expect(this.welcomeMessage).toHaveText("Welcome, Admin!");
  }

  async verifyUnsucceesfulLoginErrors() {
    await expect(this.errorHeading).toHaveText("There is a problem with your submission");
    await expect(this.errorMessage).toContainText("Invalid username or password. Please try again.");
  }

  async logout() {
    await this.logoutBtn.click();
  }
}
 
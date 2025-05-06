import { Page, Locator } from "@playwright/test";
import { config } from "../../playwright.config";

export class SecureAreaPage {
    private readonly logoutButton: Locator;
    private readonly secureAreaHeading: Locator;
    private readonly flashMessage: Locator;

    constructor(public readonly page: Page) {
        this.logoutButton = this.page.getByRole('link', { name: 'Logout' });
        this.secureAreaHeading = this.page.getByRole('heading', { name: 'Secure Area', exact: true });
        this.flashMessage = this.page.locator('id=flash');
    }

    async goto() {
        await this.page.goto(`${config.theInternetURL}/secure`);
    }

    async logout() {
        await this.logoutButton.click();
    }

    getHeading() {
        return this.secureAreaHeading;
    }

    getFlashMessage() {
        return this.flashMessage;
    }
    
}

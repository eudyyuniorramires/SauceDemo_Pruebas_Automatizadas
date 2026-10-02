import {Page,Locator, expect} from '@playwright/test';
import {BasePage} from './BasePage';


export class LoginPage extends BasePage{

    readonly inputUsername:Locator;

    readonly inputPassword:Locator;

    readonly btnLogin:Locator;

    readonly title:Locator;

    readonly errorMessage:Locator;

    readonly btnDropdown:Locator;

    readonly btnLogout:Locator;

    constructor (page:Page){
        super(page); 

        this.inputUsername = page.locator('[data-test="username"]');

        this.inputPassword = page.locator('[data-test="password"]');

        this.btnLogin = page.locator('[data-test="login-button"]');

        this.title = page.locator('[data-test = "title"]');

        this.errorMessage = page.locator('[data-test = "error"]');

        this.btnDropdown = page.getByRole('button', { name: 'Open Menu' })

        this.btnLogout = page.locator('[data-test = "logout-sidebar-link"]');

    }

    async navigate():Promise<void>{
        await this.goto('https://www.saucedemo.com/');
    }

    async Login(email: string,password: string):Promise<void>{
       
        await this.inputPassword.fill(password);
        await this.inputUsername.fill(email);
        await this.btnLogin.click();


    }



}
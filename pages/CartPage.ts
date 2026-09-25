import {Page,Locator,expect} from '@playwright/test';
import{BasePage} from './BasePage';


export class CartPage extends BasePage{

  
    

    readonly inputFirstName:Locator;

    readonly inputLastName:Locator;

    readonly inputPostalCode:Locator;

    readonly buttonCheckout:Locator;

    readonly buttonFinish:Locator;

    readonly buttonContinue:Locator;

    readonly messageCheckoutComplete:Locator;

    constructor(page:Page){
      super(page);

      this.inputFirstName = page.locator('[data-test="firstName"]');

      this.inputLastName = page.locator('[data-test="lastName"]');

      this.inputPostalCode = page.locator('[data-test="postalCode"]');
       
      this.buttonCheckout = page.locator('[data-test="checkout"]');

      this.buttonContinue = page.locator('[data-test="continue"]');

      this.buttonFinish = page.locator('[data-test="finish"]');

      this.messageCheckoutComplete = page.locator('[data-test="complete-header"]');


    }





    async fillCheckoutForm(firsName: string,lastName:string,postalCode:string):Promise<void>{


        await this.inputFirstName.fill(firsName);

        await this.inputLastName.fill(lastName);

        await this.inputPostalCode.fill(postalCode);

        await this.buttonContinue.click();
        
    }


    async finishCheckout():Promise<void>{

        await this.buttonFinish.click();

        await expect(this.messageCheckoutComplete).toBeVisible();
    }


}
import {test} from '../fixtures/page';
import{validUser} from '../data/testData';
import {expect} from '@playwright/test';


test.describe('TC01-LoginExitoso',()=>{


    test('Login Exitoso',async({loginPage})=>{
         
        await loginPage.navigate();
        await expect(loginPage.inputPassword).toBeVisible();
        await loginPage.Login(validUser.email,validUser.password);
        await expect(loginPage.title).toBeVisible();

    });

});
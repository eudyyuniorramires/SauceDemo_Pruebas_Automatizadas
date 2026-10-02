import {test} from '../fixtures/page';
import{validUser} from '../data/testData';
import {expect} from '@playwright/test';


test.describe('TC01-LoginExitoso',()=>{



    test.beforeEach(async({loginPage})=>{

        await loginPage.navigate();
    })


    test('Login Exitoso',async({loginPage})=>{
         
        await expect(loginPage.inputPassword).toBeVisible();
        await loginPage.Login(validUser.email,validUser.password);
        await expect(loginPage.title).toBeVisible();

    });


    test('Login y cierre de sesion exitoso',async({loginPage})=>{

        await expect(loginPage.inputPassword).toBeVisible();
        await loginPage.Login(validUser.email,validUser.password);
        await expect(loginPage.title).toBeVisible();
        await loginPage.btnDropdown.click();
        await loginPage.btnLogout.click();
        await expect(loginPage.inputPassword).toBeVisible();
    });



});
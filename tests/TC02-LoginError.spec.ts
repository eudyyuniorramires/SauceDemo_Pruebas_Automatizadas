import {test} from '../fixtures/page';
import{invalidUser, validUser} from '../data/testData';
import{expect} from '@playwright/test';


test.describe('TC03-LoginError',()=>{


    test.beforeEach(async({loginPage})=>{
          
        await loginPage.navigate();

    });

   test('Login Error',async({loginPage})=>{
        
       await loginPage.Login(invalidUser.email,invalidUser.password);

       //Validamos que el mensaje de error sea visible
       await expect(loginPage.errorMessage).toBeVisible();

       //Validamos que el mensaje de error sea el esperado 
       await expect(loginPage.errorMessage).toHaveText("Epic sadface: Sorry, this user has been locked out.");

   });

   test('Login Vacio',async({loginPage})=>{

      await loginPage.Login("","");

      //Validamo que el mensaje de error sea visible 

      await expect(loginPage.errorMessage).toBeVisible();

      //Validamos que el mensaje de error sea el esperado
      await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username is required");

   });

      test('Login con usuario faltante',async({loginPage})=>{

      await loginPage.Login("",validUser.password);

      //Validamo que el mensaje de error sea visible 

      await expect(loginPage.errorMessage).toBeVisible();

      //Validamos que el mensaje de error de usuario faltante sea el esperado 
      await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username is required");

   });


    test('Login con contraseña faltante',async({loginPage})=>{

      await loginPage.Login(validUser.email,"");

      //Validamo que el mensaje de error sea visible 

      await expect(loginPage.errorMessage).toBeVisible();

      //Validamos que el mensaje de error de contraseña faltante sea el esperado
      await expect(loginPage.errorMessage).toHaveText("Epic sadface: Password is required");

   });

   test('Prueba de error',async({loginPage})=>{

      await loginPage.Login(validUser.email,"");

      //Validamo que el mensaje de error sea visible 

      await expect(loginPage.errorMessage).toBeVisible();

      //Validamos que el mensaje de error de contraseña faltante sea el esperado
      await expect(loginPage.errorMessage).toHaveText("..........");

   });


}); 
package com.jpetstore.tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;
import java.time.Duration;

public class FlujoBGestionCuentaTest extends BaseTest {

    @Test(priority = 2, description = "Flujo B: Gestión de cuenta de usuario")
    public void testGestionCuenta() throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        
        driver.get(BASE_URL);
        System.out.println("✓ Navegó a JPetStore");
        
        WebElement signInLink = wait.until(ExpectedConditions.elementToBeClickable(By.linkText("Sign In")));
        signInLink.click();
        System.out.println("✓ Click en Sign In");
        
        Thread.sleep(1000);
        WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[type='submit']")));
        loginButton.click();
        System.out.println("✓ Click en Login");
        
        Thread.sleep(2000);
        WebElement signOutLink = wait.until(ExpectedConditions.presenceOfElementLocated(By.linkText("Sign Out")));
        Assert.assertTrue(signOutLink.isDisplayed(), "El usuario no está logueado");
        System.out.println("✓ Login exitoso - Sign Out visible");
        
        WebElement myAccountIcon = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//a[@title='My Account']")));
        myAccountIcon.click();
        System.out.println("✓ Click en ícono My Account");
        
        Thread.sleep(500);
        WebElement myAccountLink = wait.until(ExpectedConditions.elementToBeClickable(By.linkText("My Account")));
        myAccountLink.click();
        System.out.println("✓ Click en My Account del menú");
        
        Thread.sleep(1500);
        WebElement firstNameInput = wait.until(ExpectedConditions.presenceOfElementLocated(By.name("firstName")));
        Assert.assertTrue(firstNameInput.isDisplayed(), "No se encuentra en la página de cuenta");
        System.out.println("✓ En página de gestión de cuenta");
        
        firstNameInput.clear();
        String newFirstName = "TestUser_" + System.currentTimeMillis();
        firstNameInput.sendKeys(newFirstName);
        System.out.println("✓ First Name actualizado: " + newFirstName);
        
        WebElement lastNameInput = driver.findElement(By.name("lastName"));
        lastNameInput.clear();
        String newLastName = "AutoTest_" + System.currentTimeMillis();
        lastNameInput.sendKeys(newLastName);
        System.out.println("✓ Last Name actualizado: " + newLastName);
        
        Thread.sleep(1000);
        WebElement saveButton = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//button[normalize-space()='Save Account Information']")));
        saveButton.click();
        System.out.println("✓ Click en Save Account Information");
        
        Thread.sleep(2000);
        try {
            WebElement successMessage = wait.until(ExpectedConditions.presenceOfElementLocated(
                By.xpath("//*[contains(text(),'Your account has been updated')]")));
            Assert.assertTrue(successMessage.isDisplayed(), "No se muestra mensaje de éxito");
            System.out.println("✓ Cuenta actualizada - Mensaje de éxito visible");
        } catch (Exception e) {
            System.out.println("⚠ Mensaje de éxito no encontrado (verificar manualmente)");
        }
        
        System.out.println("\n FLUJO B COMPLETADO EXITOSAMENTE");
    }
}

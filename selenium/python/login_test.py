import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

@pytest.fixture()  
def chrome_browser():  
    driver = webdriver.Chrome()        
    driver.implicitly_wait(10)
    yield driver
    # Teardown
    driver.quit()

def test_login_success(chrome_browser):  
    """  
    Test login success
    """  
    url = "https://the-internet.herokuapp.com/login"  
    username = "tomsmith"  
    password = "SuperSecretPassword!"  

    # Navigate to the login page
    chrome_browser.get(url)  
   
    # Find username and password input fields
    username_input = chrome_browser.find_element(By.ID, value="username")  
    password_input = chrome_browser.find_element(By.ID, value="password")  
  
    # Enter username and password
    username_input.send_keys(username)  
    password_input.send_keys(password) 

    # Click login button
    login_button = chrome_browser.find_element(By.XPATH, value="//button[@type='submit']")
    login_button.click()
  

    # Assert user is shown the secure area
    assert "You logged into a secure area!" in chrome_browser.find_element(By.ID, value="flash").text
    assert "Secure Area" in chrome_browser.find_element(By.XPATH, value="//h2").text
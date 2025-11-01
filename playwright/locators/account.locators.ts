
export const AccountLocators = {
  myAccountLink: 'a[href*="editAccountForm"]',
  
  pageTitle: '#Catalog h3',
  
  userInformationSection: '#Catalog form',
  
  userIdInput: 'input[name="username"]',
  passwordInput: 'input[name="password"]',
  repeatPasswordInput: 'input[name="repeatedPassword"]',
  
  firstNameInput: 'input[name="account.firstName"]',
  lastNameInput: 'input[name="account.lastName"]',
  emailInput: 'input[name="account.email"]',
  phoneInput: 'input[name="account.phone"]',
  
  address1Input: 'input[name="account.address1"]',
  address2Input: 'input[name="account.address2"]',
  cityInput: 'input[name="account.city"]',
  stateInput: 'input[name="account.state"]',
  zipInput: 'input[name="account.zip"]',
  countryInput: 'input[name="account.country"]',
  
  languagePreferenceSelect: 'select[name="account.languagePreference"]',
  languageEnglish: 'option[value="english"]',
  languageJapanese: 'option[value="japanese"]',
  
  favouriteCategorySelect: 'select[name="account.favouriteCategoryId"]',
  
  enableMyListCheckbox: 'input[name="account.listOption"]',
  enableMyBannerCheckbox: 'input[name="account.bannerOption"]',
  
  saveAccountButton: 'input[name="editAccount"][value="Save Account Information"]',
  
  successMessage: '#Catalog ul.messages li',
  errorMessage: '#Catalog ul.messages li',
  
  accountForm: 'form[action*="editAccount"]',
  
  accountInformationHeader: 'h3:has-text("User Information")',
  profileInformationHeader: 'h3:has-text("Profile Information")'
} as const;

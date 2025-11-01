export const LoginLocators = {
  signInLink: 'a[href*="signonForm"]',
  
  usernameInput: 'input[name="username"]',
  passwordInput: 'input[name="password"]',
  loginButton: 'input[name="signon"][type="submit"]',
  
  welcomeMessage: '#WelcomeContent',
  userGreeting: '#Catalog',
  navigationMenu: '#MenuContent',
  
  signOutLink: 'a[href*="signoff"]',
  myAccountLink: 'a[href*="editAccountForm"]',
  
  errorMessage: '.messages',
  
  logo: '#LogoContent a',
  
  mainBanner: '#Main'
} as const;

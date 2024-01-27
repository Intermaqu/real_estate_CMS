class AuthenticationService {
  registerSuccessfulLogin(userData: [], token: string) {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(userData));
    window.location.href = "/?fromLogin=true";
  }

  isUserLoggedIn() {
    return localStorage.getItem("token") !== null;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getUserData() {
    const userData = localStorage.getItem("userData");
    if (userData) {
      return JSON.parse(userData);
    }
  }
}

export default new AuthenticationService();

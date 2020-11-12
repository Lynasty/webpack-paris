import app from "../src/app.js";

class Login {
    constructor() {
        this.viewUrl = "views/login.html";
    }
    executeHttpRequest() {
        const msgZone = document.querySelector("#message-zone");

        document
                .querySelector("#email-login-form")
                .addEventListener("submit", function (e) {
                    e.preventDefault();
                    msgZone.innerHTML = "";
                    const email = document.querySelector("#email").value;
                    const password = document.querySelector("#password").value;
                    firebase
                            .auth()
                            .signInWithEmailAndPassword(email, password)
                            .then((response) => {
                                // rediriger vers la home
                                app.mvc.router.navigateTo("/#/");
                            })
                            .catch(function (error) {
                                // Handle Errors here.
                                msgZone.innerHTML = app.dom.wrapMsg(error.message, "danger");
                            });
                });
        document
                .querySelector("#github-log-btn")
                .addEventListener("click", function () {
                    const provider = new firebase.auth.GithubAuthProvider();
                    firebase
                            .auth()
                            .signInWithPopup(provider)
                            .then(function (result) {
                                app.mvc.router.navigateTo("/#/");
                            })
                            .catch(function (error) {
                                msgZone.innerHTML = app.dom.wrapMsg(error.message, "danger");
                            });
                });
    }
}

export default Login;
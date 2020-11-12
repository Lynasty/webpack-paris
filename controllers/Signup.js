import app from "../src/app.js";

class Signup {
    constructor() {
        this.viewUrl = "views/signup.html";
    }
    executeHttpRequest() {
        const msgZone = document.querySelector("#message-zone");
        const signupForm = document.querySelector("#email-signup-form");
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            msgZone.innerHTML = "";
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;
            const password2 = document.querySelector("#password2").value;
            if (password !== password2) {
                msgZone.innerHTML = app.dom.wrapMsg(
                        "Vous devez répéter le mot de passe à l'identique",
                        "danger"
                        );
                return;
            }
            firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((response) => {
                        msgZone.innerHTML = app.dom.wrapMsg(
                                "Votre compte a bien été créé, vous êtes désormais connecté.",
                                "success"
                                );
                        signupForm.remove();
                    })
                    .catch(function (error) {
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

export default Signup;
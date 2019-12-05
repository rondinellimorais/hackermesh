require('../util/Util.js')

MainController = {

    init: function () {

        // start selenium webdriver
        global.webdriver = require('selenium-webdriver')
        // global.browser = new webdriver.Builder().forBrowser('safari').build()

        chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())
        global.browser = new webdriver.Builder().forBrowser('chrome').build()

        // faz login
        MainController.login()
    },
    login: function () {

        // load page
        browser.get(LOGIN_PAGE)

        $$("input[name='username']", function (elLogin) {
            if (elLogin != null) {
                elLogin.sendKeys(LOGIN_EMAIL)
            }
        })

        $$("input[name='password']", function (elPassword) {
            if (elPassword != null) {
                elPassword.sendKeys(LOGIN_PASSWORD)
            }
        })

        $$("button.auth-button", function (elSubmit) {
            elSubmit.click()

            // proximo desafio
            setTimeout(() => {
                MainController.nextChallenge()
            }, 6000)
        })
    },
    allComments: function (challengeBaseURL, callback) {

        let challengeForumURL = `${challengeBaseURL}/forum`

        // let comments = [{
        //     text: "my solution in c#",
        //     code: "public class Solution"
        // }]

        browser.navigate().to(challengeForumURL).then(() => {

            let selectComments = () => {

                setTimeout(() => {

                    elementExists("ul.discussion-comments .comment-section", TIME_OUT).then((discussionComments) => {

                        if (discussionComments) {

                            let clientScriptComments = () => {

                                let comments = []
                                $("ul.discussion-comments .comment-section").each(function () {
                                    let text = $(".hackdown-content > p", this).text()
                                    let code = $(".hackdown-content .highlight > pre", this).text()

                                    if (code.length > 0) {
                                        comments.push({ text: text, code: code })
                                    }
                                })
                                return comments
                            }

                            // obtem todos os comentarios
                            browser.executeScript(clientScriptComments).then(function (comments) {
                                console.log("\nNumber of comments")
                                console.log("=========================")
                                console.log(comments.length)

                                if (typeof callback == "function") {
                                    callback(comments)
                                }
                            })
                        }
                    })
                }, 2000)
            }

            // mostra mais comentários. 
            // Porque?
            // porque é melhor ter mais comentário :)
            elementExists(".msB.more-comment-list .btn.btn-primary.btn-large.active", 10000).then((element) => {
                element.click()
                selectComments()

            }).catch(() => {

                // seleciona o q tem
                selectComments()
            })
        })
    },
    createLanguageObjects(challengeBaseURL, languageObj, comments) {

        browser.navigate().to(`${challengeBaseURL}/problem`).then(() => {

            // detecta a linguagem
            let languages = []
            for (let i = 0; i < comments.length; i++) {

                const comment = comments[i]

                for (let x = 0; x < languageObj.patterns.length; x++) {

                    if (comment.code.indexOf(languageObj.patterns[x]) != -1) {

                        console.log(languageObj.name)
                        console.log("=========================")
                        console.log(comment.code)
                        languages.push({ name: languageObj.name, code: comment.code })
                    }
                }
            }

            // teste code
            MainController.testCode(languages)
        })
    },
    testCode: function (languages) {

        // verifica se há código para ser testado
        if (languages.length == 0) {
            MainController.nextChallenge()
            return
        }

        let languageObj = languages[0]

        // seleciona a linguagem no select
        let clientScriptSelect2Open = () => {
            $('.select2-container').each(function (i, el) {
                $(el).data('select2').open()
            })
        }
        browser.executeScript(clientScriptSelect2Open).then(function () {
            var searchBox = browser.findElement(webdriver.By.css(".select-language .Select-input input"));
            searchBox.sendKeys(languageObj.name, webdriver.Key.ENTER)

            setTimeout(() => {

                let clientScriptCodeMirror = () => {

                    // verifica se o documento pode ser alterado
                    if ($(".monaco-editor .read-only").length > 0){
                        return false
                    }

                    // Pega a instancia do Monaco Editor
                    let monacoEditor = monaco.editor.getModels()

                    if (monacoEditor && monacoEditor.length > 0){

                        // adiciona código novo
                        monacoEditor[0].setValue(arguments[0])
                    }

                    return true
                }

                browser.executeScript(clientScriptCodeMirror, languageObj.code).then(function (canEdit) {

                    // quando documento é somente leitura vai para o proximo
                    if (!canEdit) {
                        console.log("Document readonly :(...")
                        console.log("============================\n")
                        MainController.nextChallenge()
                        return
                    }

                    // run code
                    $$("button.btn.hr-monaco-compile.msR", (button) => {
                        button.click()

                        elementExists(".compile-error-wrapper .status", TIME_OUT).then(function (element) {

                            if (element) {

                                element.getText().then(function (text) {

                                    if (text.length > 0 && text.toLowerCase() == "congratulations!") {

                                        // Congratulations!
                                        console.log(text)
                                        console.log("Submit solution...")
                                        console.log("============================\n")
                                        MainController.submitCode()
                                    }
                                    else {

                                        // Compilation error :(
                                        console.error(text)
                                        console.error("Test next code...")
                                        console.error("============================\n")

                                        // deleta o primeiro
                                        languages.splice(0, 1)

                                        // test o proximo codigo
                                        if (languages.length > 0) {
                                            MainController.testCode(languages)
                                        }
                                        else {

                                            // todos os códigos testados, nenhum funcionou :(
                                            MainController.nextChallenge()
                                        }
                                    }
                                })
                            }
                        }).catch(() => {
                            MainController.nextChallenge()
                        })
                    })
                })
            }, 1000)
        })
    },
    submitCode: function () {

        // submit code
        $$("button.btn.hr-monaco-submit", (submitButton) => {
            submitButton.click()

            elementExists(".ui-card.submission-congratulations.ui-layer-2", TIME_OUT).then(() => {
                MainController.nextChallenge()
            }).catch(() => {

                $$(".submission-error-wrapper .status .compile-error", (element) => {
                    if (element) {
                        element.getText().then(function (text) {
                            console.log(text)
                            console.log("Submission error :(...")
                            console.log("============================\n")
                        })
                    }
                })
                MainController.nextChallenge()
            })
        })
    },
    nextChallenge: function () {

        if (global.selectedLanguage) {
            languageObj = selectedLanguage
        } else {
            languageObj = LANGUAGE_PROFICIENCY[Math.floor(Math.random() * LANGUAGE_PROFICIENCY.length)]
        }

        browser.navigate().to(languageObj.url).then(() => {

            browser.findElements(webdriver.By.css("a.js-track-click.challenge-list-item")).then((elems) => {

                if (elems && elems.length > 0) {

                    let element = elems[Math.floor(Math.random() * elems.length)]
                    element.getAttribute("href").then(function (challengeBaseURL) {
                        if (typeof challengeBaseURL == "string") {

                            setTimeout(() => {

                                MainController.allComments(challengeBaseURL, (comments) => {
                                    MainController.createLanguageObjects(challengeBaseURL, languageObj, comments)
                                })

                            }, 1000)
                        }
                    })
                }
            })
        })
    }
}
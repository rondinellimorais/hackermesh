
//
// Global vars
// ========================================================================
global.LOGIN_PAGE = "https://www.hackerrank.com/login?h_r=login&h_l=body_middle_left_button"
global.LOGIN_EMAIL = "rondinelliharris@gmail.com"
global.LOGIN_PASSWORD = "1234567890"
global.TIME_OUT = 60000
global.LANGUAGE_PROFICIENCY = [
	{
		key: "java7",
		name: "Java 7",
		url: "https://www.hackerrank.com/domains/java?filters%5Bdifficulty%5D%5B%5D=medium&filters%5Bdifficulty%5D%5B%5D=hard&filters%5Bstatus%5D%5B%5D=unsolved",
		patterns: ["java", "Scanner", "System.out.", "import System."]
	},
	{
		key: "cpp",
		name: "C++",
		url: "https://www.hackerrank.com/domains/cpp?filters%5Bdifficulty%5D%5B%5D=medium&filters%5Bdifficulty%5D%5B%5D=hard&filters%5Bstatus%5D%5B%5D=unsolved",
		patterns: ["#include", "cstdio", "scanf", "printf", ".h", ">>"]
	},
	{
		key: "c",
		name: "C",
		url: "https://www.hackerrank.com/domains/c?filters%5Bstatus%5D%5B%5D=unsolved&filters%5Bdifficulty%5D%5B%5D=easy&filters%5Bdifficulty%5D%5B%5D=medium&filters%5Bdifficulty%5D%5B%5D=hard",
		patterns: ["#include", "cstdio", "scanf", "printf", ".h", ">>"]
	},
	{
		key: "ruby",
		name: "Ruby",
		url: "https://www.hackerrank.com/domains/ruby?filters%5Bstatus%5D%5B%5D=unsolved&filters%5Bdifficulty%5D%5B%5D=easy&filters%5Bdifficulty%5D%5B%5D=medium&filters%5Bdifficulty%5D%5B%5D=hard",
		patterns: [" "]
	},
	{
		key: "python",
		name: "Python 2",
		url: "https://www.hackerrank.com/domains/python?filters%5Bdifficulty%5D%5B%5D=medium&filters%5Bdifficulty%5D%5B%5D=hard&filters%5Bstatus%5D%5B%5D=unsolved",
		// patterns: ["#!/bin/python3", "#!/bin/python", "def", "import sys"]
		patterns: [" "]
	},
	{
		key: "bash",
		name: "BASH",
		url: "https://www.hackerrank.com/domains/shell?filters%5Bdifficulty%5D%5B%5D=easy&filters%5Bdifficulty%5D%5B%5D=medium&filters%5Bdifficulty%5D%5B%5D=hard&filters%5Bstatus%5D%5B%5D=unsolved",
		patterns: [" "]
	}
]

//
// Global functions
// ========================================================================
$$ = function (cssString) {
	return browser.findElement(webdriver.By.css(cssString))
}

$$ = function (cssString, callback) {

	browser.findElement(webdriver.By.css(cssString)).then(function (element) {
		if (typeof callback == "function" && typeof callback != "undefined") {
			callback(element)
		}
	},
		function (err) {
			if (typeof callback == "function" && typeof callback != "undefined") {
				callback(null)
			}
		})
}

elementExists = function (cssString, timeOut) {

	var element = browser.wait(webdriver.until.elementLocated(webdriver.By.css(cssString)), timeOut)
	if (typeof element == "undefined" || element == null) {
		console.log("ERROR ON function $$")
		console.log("this element is null!")
	}
	return element
}

// setTimeout(() => {

// 	const until = webdriver.until;
// 	var pwd = browser.wait(until.elementLocated(webdriver.By.css("form.confirm-upload input[name='source_file']")), 5000);
// 	browser.wait(until.elementIsVisible(pwd), 5000).sendKeys("/Users/rondinellimorais/Desktop/projetos/hackermesh/output/code-0.java")

// }, 5000)

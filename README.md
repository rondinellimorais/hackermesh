# Hacker Mesh

Esse crawler foi criado para resolver os desafios do www.hackerrank.com.
Eu quero ser o melhor mas tenho preguiça, então eu fiz um crawler que testa os códigos das pessoas que postam no forum.

O projeto é feito em **NodeJS** utilizando o **Selenium-WebDriver** para automatizar a porra toda.

# Dependências #

| Name                                   | Version       |
| -------------------------------------- |:---------------------------------------:|
| [NodeJs](https://nodejs.org/en/docs/)                                                     | v7.2.1        |
| [express](http://expressjs.com/)                                                          | v4.14.0       |
| [selenium-webdriver](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html) | v3.0.1        |
| [node.extend](https://www.npmjs.com/package/node.extend) 				    				| v1.1.6        |
| [chromedriver](https://www.npmjs.com/package/chromedriver) 				    				| -        |
| [json-stringify-safe](https://github.com/isaacs/json-stringify-safe) 			    		| v5.0.1 	    |
| [body-parser](https://www.npmjs.com/package/body-parser) 			    		| v1.15.2 	    |

## Setup
Por default o crawler abre o navegador Google Chrome para começar a festa. Para a automatização do chrome funcionar é necessário instalar o driver, por isso siga os passos abaixo:

1. Abra o Chrome da sua máquina e verifique a versão.
2. Vá até o `package.json` e modifique a versão do drive `"chromedriver": "^76.0.1"`. Quando eu fiz minha versão de chrome era **76.xxx.xx**. Vá até o repo [chromedriver](https://www.npmjs.com/package/chromedriver) e coloque a versão correspondente.
3. Só isso :)

## Install ##

```
#!bash
npm i
```

## Start server ##

```
#!bash
node index.js
```

## Iniciando servidor especificando linguagem
```
#!bash
node index.js -l java8|cpp|python|bash
```

## Iniciando servidor especificando porta
```
#!bash
node index.js -p [Port]
```

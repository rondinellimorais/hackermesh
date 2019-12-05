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
| [json-stringify-safe](https://github.com/isaacs/json-stringify-safe) 			    		| v5.0.1 	    |
| [body-parser](https://www.npmjs.com/package/body-parser) 			    		| v1.15.2 	    |

## Install ##

```
#!bash
npm install --verbose
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

## Instalar drive do Chrome
1. Baixe em http://chromedriver.storage.googleapis.com/index.html
2. Coloque em algum lugar o arquivo binário que está dentro do zip
3. vim .bash_profile
4. adicionei o caminho do diretório onde está o drive
5. Enjoy :)


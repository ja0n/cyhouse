cyhouse
=======

Sistema integrado de automação predial.

A arquitetura inicial do projeto é simples, desenvolvida para ser amplamente estendida com facilidade. Trata-se de um servidor principal, trabalhando com módulos e conectado à internet. O servidor principal do CyHouse funciona como o cérebro da operação, recebendo informações dos módulos e indicando o que cada um deve fazer. Os módulos são como órgãos sensoriais e membros, pequenos dispositivos que se comunicam com o servidor através de um padrão sem fio. Os módulos do CyHouse são chamados de extensões Cy.

--------------------

Prerequisite
===

* [MongoDB](http://www.mongodb.org/)

--------------------

Install
===

> npm install

> npm run start

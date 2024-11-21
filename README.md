# Sistema de Consulta Nutricional - TACO

Este projeto é uma aplicação web desenvolvida para consultar informações nutricionais de alimentos com base na **Tabela Brasileira de Composição de Alimentos (TACO)**. A aplicação oferece uma interface amigável para os usuários e uma API robusta para acessar os dados.

## Objetivo do Projeto

Este sistema foi desenvolvido como parte do **Projeto Integrador II** da UNIFAGOC. O objetivo foi criar uma aplicação completa com backend e frontend utilizando boas práticas de desenvolvimento e arquitetura hexagonal.

## Tecnologias Utilizadas

### Backend
- **Kotlin**
- **Spring Boot**
  - Spring Security
  - Spring Web Services
- **PostgreSQL**

### Frontend
- **React.js**
- **JavaScript**
- **HTML**
- **CSS**

## Arquitetura do Projeto

O sistema foi desenvolvido seguindo a **Arquitetura Hexagonal**, também conhecida como Ports and Adapters. Essa abordagem permite maior flexibilidade e desacoplamento entre as camadas do sistema, facilitando testes e manutenção.

### Estrutura do Backend
- **Domain**: Contém as entidades e as regras de negócio principais.
- **Application**: Responsável por coordenar os casos de uso do sistema.
- **Adapters**:
  - **Entrada**: Camada REST com endpoints expostos, desenvolvida com Spring Boot.
  - **Saída**: Comunicação com o banco de dados PostgreSQL e outros serviços externos.

### Benefícios da Arquitetura Hexagonal
- Separação clara entre lógica de negócios, infraestrutura e interfaces.
- Facilidade para substituir tecnologias ou implementar novas integrações.
- Foco na lógica central do sistema.

## Funcionalidades do Sistema

- **Consulta de alimentos**: Pesquise informações nutricionais de alimentos presentes na Tabela Brasileira de Composição de Alimentos (TACO).
- **Exibição detalhada**: Visualize os dados nutricionais completos de um alimento, como calorias, proteínas, carboidratos, gorduras, entre outros.
- **Autenticação segura**: Acesso protegido por autenticação e autorização utilizando Spring Security.
- **Responsividade**: Interface otimizada para diversos dispositivos.
- **API RESTful**: Backend fornece uma API estruturada e documentada para acesso aos dados.

## Considerações Finais

Este projeto foi uma excelente oportunidade para aplicar os conhecimentos adquiridos durante o curso de **Ciência da Computação** na **UNIFAGOC**. A escolha da **Arquitetura Hexagonal** e das tecnologias utilizadas foi crucial para garantir a escalabilidade e a facilidade de manutenção do sistema.

A aplicação fornece um serviço útil para consulta de informações nutricionais, utilizando dados da **Tabela Brasileira de Composição de Alimentos (TACO)**, e foi construída com foco em boas práticas de desenvolvimento e segurança.

Agradecemos a todos os membros do grupo pela dedicação e trabalho em equipe!

---

**Integrantes do Projeto:**
- Caio (Banner)
- Kaio (Desenvolvedor Backend)
- Savio (Desenvolvedor Frontend)
- Luís, Joao Pedro e Juan (Relatório)



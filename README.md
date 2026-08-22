# Qordem - Sistema de Gestão Operacional e Portaria 🏢

![Status](https://img.shields.io/badge/Status-Concluído-success)
![Versão](https://img.shields.io/badge/Versão-1.0.0-blue)
![Licença](https://img.shields.io/badge/Licença-Proprietária-red)

## 📌 Visão Geral
O **Qordem** é uma aplicação web (Single Page Application) desenvolvida para digitalizar, automatizar e assegurar o controle de acesso e fluxo operacional da portaria. Projetado para substituir o controle manual em planilhas, o sistema garante total integridade, rastreabilidade e segurança patrimonial.

## 🚀 Funcionalidades Principais
* **Gestão de Empresas:** Cadastro e controle (CRUD) de empresas terceirizadas vinculadas à operação.
* **Controle de Visitantes:** Registro de prestadores de serviço com cálculo automático de status de credencial (Pendente, Renovar, Atenção, Verificado).
* **Ordens de Serviço (OS):** Emissão e monitoramento de OS para garantir que toda entrada possua uma justificativa técnica autorizada.
* **Registro de Visitas:** Core do sistema que vincula, em tempo real, o Visitante, a Empresa e a OS, registrando o *timestamp* exato de entrada e saída.
* **Autenticação Segura:** Proteção total de rotas e consumo de API através de JSON Web Tokens (JWT).

## 🛠️ Stack Tecnológica
**Back-end:**
* Python 3.12
* Django & Django REST Framework
* Autenticação via JWT (SimpleJWT)
* Banco de Dados Relacional (MariaDB / MySQL)

**Front-end:**
* ReactJS (Vite)
* Tailwind CSS para estilização UI/UX
* Axios para consumo de API REST
* SweetAlert2 para modais e alertas dinâmicos
* Lucide React para iconografia

## ⚙️ Arquitetura
A arquitetura do projeto segue o padrão de microsserviços lógicos, com back-end e front-end totalmente desacoplados. A comunicação é realizada exclusivamente via requisições HTTP consumindo a API REST estruturada no Django, garantindo escalabilidade e facilidade de manutenção.

## 👨‍💻 Autor
**Arthur Luiz Vieira Yokomizo**
*Engenharia de Software*

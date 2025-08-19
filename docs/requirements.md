# Requisitos do Sistema

## Requisitos Funcionais
- RF-01: Cadastrar tarefa com **title** e descrição opcional.
- RF-02: Listar tarefas.
- RF-03: Buscar tarefa por ID.
- RF-04: Atualizar tarefa (title, description, done).
- RF-05: Remover tarefa.

## Requisitos Não Funcionais
- RNF-01: O sistema deve fornecer uma API HTTP simples (RESTful).
- RNF-02: Testes automatizados devem validar as operações básicas (Jest + Supertest).
- RNF-03: A integração contínua deve rodar os testes em cada push/PR (GitHub Actions).
- RNF-04: Código documentado e mensagens de commit descritivas.
- RNF-05: Facilmente executável localmente com Node.js LTS.

# Agile Tasks App

Sistema básico de **gerenciamento de tarefas** (CRUD) para demonstrar práticas de Engenharia de Software com **GitHub**, **Kanban** e **CI com GitHub Actions**.

## Objetivo & Escopo
- Implementar um CRUD simples de tarefas em Node.js/Express.
- Manter quadro **Kanban** (Projects) com colunas *A Fazer*, *Em Progresso*, *Concluído*.
- Configurar **pipeline** (GitHub Actions) para executar testes automatizados.
- Simular **mudança de escopo** e documentar no README e no Kanban.
- Produzir **UML** (Casos de Uso e Classes) via draw.io (ver `docs/uml`).

## Metodologia
- **Kanban** para fluxo contínuo.
- Issues no GitHub para cada tarefa, vinculadas ao Project.

## Como executar localmente

### Pré-requisitos
- Node.js LTS (>= 18)
- npm

### Passos
```bash
npm ci
npm run dev
# ou em produção
npm start
```
- API disponível em `http://localhost:3000`

### Endpoints
- `GET /health` – status do servidor
- `GET /tasks` – lista tarefas
- `GET /tasks/:id` – detalhe por id
- `POST /tasks` – cria tarefa `{ "title": "Estudar Jest", "description": "opcional" }`
- `PUT /tasks/:id` – atualiza (qualquer campo)
- `DELETE /tasks/:id` – remove

## Testes
```bash
npm test
```

## CI com GitHub Actions
Workflow em `.github/workflows/ci.yml` roda `npm ci` e `npm test` a cada push/PR na branch `main`.

## Simulação de Mudança de Escopo
1. Nova regra: adicionar **priority** (`low|medium|high`) e **dueDate** (ISO) às tarefas.
2. Atualize o código (já suportado no `taskStore.update`) e **adicione** testes que cubram os novos campos.
3. Atualize este README (seção de Endpoints/Modelos).
4. Mova as *issues* no Kanban para refletir a mudança.

## Requisitos & UML
- Ver `docs/requirements.md` e `docs/uml/README.md`.

## Licença
MIT


# Gerenciador de Tarefas (ReactJS)

Projeto de desenvolvimento de uma aplicação web de gerenciamento de tarefas (to-do list) com ReactJS onde os usuários podem criar, visualizar, editar e excluir tarefas.

- ---

## Funções

- Adicionar tarefas
- Visualizar tarefas
- Editar tarefas
- Excluir tarefas

### Adicionar Tarefas
As tarefas são adicionadas na página principal.
Para adicionar uma tarefa é necessário preencher o título, a descrição, e inserir uma data válida.
Quando uma tarefa é adicionada, o sistema notifica ao usuário que a tarefa foi criada.
![Imgur Image](https://imgur.com/WcpQnlw.jpg)
![Imgur Image](https://imgur.com/OkLzstB,jpg)

### Visualizar Tarefas
As tarefas são visualizadas na página principal.
Quando é criada uma tarefa, ela vai para o topo da lista de tarefas, contendo todas as suas informações.
![Imgur Image](https://imgur.com/axcDVd6,jpg)

### Editar Tarefas
Para se editar uma tarefa, clica-se no botão de "Editar" localizado abaixo das informações da tarefa.
Com isso, o usuário é enviado a outra página, na qual poderá realizar as alterações que deseja.
Clicando em "Atualizar Tarefa", o sistema notifica se o usuário deseja prosseguir com a edição, e, se o usuário confirma, as alterações feitas na tarefa são gravadas e o sistema notifica que a edição foi realizada.
![Imgur Image](https://imgur.com/oKgIe6E,jpg)
![Imgur Image](https://imgur.com/5i7y2Df,jpg)
![Imgur Image](https://imgur.com/zTFH0EP,jpg)

### Excluir Tarefas

Para se excluir uma tarefa, clica-se no botão de "Excluir" localizado abaixo das informações da tarefa.
O sistema então pergunta se o usuário tem certeza que deseja excluir aquela tarefa, e, com a confirmação do usuário, exclui a tarefa.
Depois de removida a tarefa, o sistema notifica o usuário que a tarefa foi excluída com sucesso.
![Imgur Image](https://imgur.com/a7H7uI2,jpg)
![Imgur Image](https://imgur.com/Zv00oto,jpg)

## Tecnologias utilizadas

- HTML
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- JavaScript
- [ReactJS](https://react.dev/)
- [Vite](https://vite.dev/) - Ferramenta de construção para aplicações web.
- [CRUD-Gerenciador-de-Tarefas-API](https://github.com/Andrei-Nunes-dev/CRUD-Gerenciador-de-Tarefas-API) -  API que gerencia as funcionalidades de criar, editar, deletar e atualizar as tarefas e também acessa o banco de dados MySQL.

## Decisões de Implementação
### Design e Tratamentos do Sistema
- Devido a quantidade reduzida de funções, decidiu-se colocar as funções de adicionar e visualizar diretamente na página inicial da aplicação, para evitar uma navegação redundante e uma página inicial vazia.
- Decidiu-se dispor as tarefas em uma coluna e de forma "mais estendida" para melhor legibilidade da descrição.
- Escolheu-se limitar o número máximo de caracteres do título para 40 e da descrição para 500. Essa escolha foi feita devido ao espaçamento nos espaços das tarefas.
- O sistema não permite selecionar uma data que seja menor que o dia atual.
- O sistema faz tratamento de acesso a páginas que não existem e a erros nos parâmetros da funcionalidade de editar
![Imgur Image](https://imgur.com/CZro7vC,jpg)
![Imgur Image](https://imgur.com/wxbiHm5,jpg)
---

## Instruções para Execução
- Primeiramente, é necessário que a [CRUD-Gerenciador-de-Tarefas-API](https://github.com/Andrei-Nunes-dev/CRUD-Gerenciador-de-Tarefas-API) esteja sendo executada.
- A URL para acessar a API está localizada no arquivo "api.js", e deve está configurada com a mesma porta que a API está configurada para abrir.
- No arquivo "vite.config.js" esta a configuração da porta da aplicação ReactJS. Está definida para a porta 3001(A porta correspondente deve estar configurada no UseCors da API no arquivo "Program.cs").
- A aplicação pode ser executada por meio do comando "npm run dev" no terminal do Visual Studio Code.
---



## Vídeo de execução
Link Google Drive: https://drive.google.com/file/d/1vP2JnsKfCTGegq4oQbipsfJdcM1gZbAr/view?usp=sharing

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
    


  

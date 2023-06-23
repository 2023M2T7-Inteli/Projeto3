# Inteli - Instituto de Tecnologia e Liderança

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="https://www.inteli.edu.br/wp-content/uploads/2021/08/20172028/marca_1-2.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

# ObyWeb

## ObyWeb

## Integrantes:

- <a href="https://www.linkedin.com/in/davi-motta-53bba618b/">Davi Rosalino Glória Motta</a>
- <a href="https://www.linkedin.com/in/drielly-farias/">Drielly Santana Farias</a>
- <a href="https://www.linkedin.com/in/felipe-sabino-spina-b33372271/">Felipe Sabino Spina</a>
- <a href="https://www.linkedin.com/in/victorbarq/">João Pedro Rodrigues Sotto Maior</a>
- <a href="https://www.linkedin.com/in/victorbarq/">Manuela Dina de Mula Cury</a>
- <a href="https://www.linkedin.com/in/victorbarq/">Marcelo Faska Sitton</a>
- <a href="https://www.linkedin.com/in/renan-feitosa-44328524a/">Renan Feitosa Oliveira</a>

## 📝 Descrição

A partir da proximidade com a natureza e o interesse em inovar, a Natura realiza diversas coletas de dados sobre as matérias primas que usam. Parte desse processo conta com a participação de agroextrativistas que fornecem os dados através de papel impresso ou conversas com os representantes da Natura. Embora sejam meios funcionais de recolher informações, a empresa deseja digitalizar os meios de adquirir esses dados, por meio de protocolos amigáveis e acessíveis ao público parceiro.<br>
A solução proposta consiste em criar duas interfaces. A primeira interface será destinada ao analista, que poderá configurar o protocolo de cada pesquisa, definir os dados que deseja coletar, armazená-los e visualizá-los em um banco de dados organizado. A segunda interface será destinada aos agricultores parceiros, que poderão registrar de forma offline os dados requisitados por meio de um celular e sincronizá-los ao conectar à internet.<br>  
Será possível coletar dados sobre local da cooperativa ou fazenda, local da coleta, nome popular da espécie coletada, estágio da coleta, fotos dos estágios atuais e anteriores, clima, temperatura, características do solo, tipo de processamento (ex: amostra triturada, seca, in natura) e observações. Esses dados serão armazenados em um banco de dados, facilitando a análise posterior.
O programa será desenvolvido usando programação em JavaScript, Node.js, HTML e CSS e usando as ferramentas CodeSandBox, VS Code, DB Schema e DB Browser for SQLite.

## 📁 Estrutura de pastas

|--> documentos<br>
&emsp;| --> outros <br>
&emsp;| T(NUMERO_DA_TURMA)\_G(NUMERO_DO_GRUPO)\_V(VERSÃO)\_Web_application_document.pdf<br>
&emsp;| T(NUMERO_DA_TURMA)\_G(NUMERO_DO_GRUPO)\_V(VERSÃO)\_Web_application_document.docx<br>
|--> imagens<br>
|--> src<br>
&emsp;|--> Backend<br>
&emsp;|--> Frontend<br>
| readme.md<br>
| license.txt

Dentre os arquivos presentes na raiz do projeto, definem-se:

- <b>readme.md</b>: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

- <b>documentos</b>: aqui estarão todos os documentos do projeto. Há também uma pasta denominada <b>outros</b> onde estão presentes aqueles documentos complementares ao <b>web application document</b>.

- <b>imagens</b>: imagens relacionadas ao projeto como um todo (por exemplo imagens do sistema, do grupo, logotipos e afins).

- <b>src</b>: nesta pasta encontra-se todo o código fonte do sistema (existem duas subpastas <b>backend</b> e <b>frontend</b> que contêm, respectivamente, o código do servidor e o código da página web).

## 💻 Configuração para desenvolvimento

Aqui encontram-se todas as instruções necessárias para a instalação de todos os programas, bibliotecas e ferramentas imprescindíveis para a configuração do ambiente de desenvolvimento.

1.  Baixar e instalar o node.js: [https://nodejs.org/pt-br/](https://nodejs.org/pt-br/) (versão 16.15.1 LTS)
2.  Clone o repositório em questão.
3.  No modo administrador, abra o "prompt de comando" ou o "terminal" e, após, abra a pasta "src/backend" no diretório raiz do repositório clonado e digite o segundo comando:
  

```sh
npm install
```

Isso instalará todas as dependências definidas no arquivo <b>package.json</b> que são necessárias para rodar o projeto. Agora o projeto já está pronto para ser modificado. Caso ainda deseje iniciar a aplicação, digite o comando abaixo no terminal:

```sh
npm start
```


4. Agora você pode acessar a aplicação através do link http://localhost:1234/
5. O servidor está online.
## Link para o vídeo
https://www.youtube.com/watch?v=5VVkugmfRA4

## 🗃 Histórico de lançamentos

- 1.0 - 14/04/2023
  - Adição do WAD (Web Aplication Document)
- 1.1 - 01/05/2023
  - Atualização do WAD (Web Aplication Document)
- 1.1 - 09/05/2023
  - Adição da pasta backend
  - Adição do modelo lógico do banco de dados
- 1.2 - 11/05/2023
  - Atualização dos endpoints no backend
  - Adição do WAD (Web Aplication Document)
- 1.3 - 12/05/2023
  - Atualização do WAD (Web Aplication Document)
- 1.4 - 17/05/2023
  - Adição das variáveis de cores base no css
  - Adição do arquivo html e css referentes ao footer e header do site
- 1.5 - 18/05/2023
  - Adição da tela de login
- 1.6 - 22/05/2023
  - Adição da tela do coletor
- 1.7 - 23/05/2023
  - Atualização da tela de login
  - Atualização da tela do coletor
- 1.8 - 24/05/2023
  - Adição do menu lateral da tela do coletor
  - Adição da tela de criar protocolos
- 1.9 - 26/05/2023
  - Revisão do front-end
  - Atualização do WAD (Web Aplication Document)
- 2.0 - 29/05/2023
  - Adições no front-end (criar e responder protocolo)
  - Alterações no banco de dados
- 2.1 - 31/05/2023
  - Atualização no front-end
- 2.2 - 01/06/2023
  - Atualização no front-end
  - Integração da tela de Login
  - Organização de pastas
- 2.3 - 02/06/2023
  - Início da integração da tela home-pesquisador
  - Organização de pastas
- 2.4 - 04/06/2023
  - Integração da tela home-pesquisador
  - Alterações no Login
- 2.5 - 05/06/2023
  - Alterações de endpoint para protocolo
  - Adição de alertas
- 2.6 - 06/06/2023
  - Correção de menus
  - Atualizações no readme
  - Refatoração no banco de dados
  - Alteração de porta
  - Continuidade à integração das telas
- 2.7 - 07/06/2023
  - Atualização WAD
  - Atualização endpoints
  - Organização de pastas e arquivos
  - Adição 'npm start'
  - Update README
- 3.0 - 12/06/2023
  - Criação da rota para responder protocolo
  - Update no app.js
  - Variáveis json para criar protocolo
- 3.1 - 13/06/2023
  - Update responder protocolo
  - Home pesquisador
- 3.2 - 15/06/2023
  - Update responder protocolo
- 3.3 - 19/06/2023
  - Mudança no database
  - Update responder protocolo
  - Integração da página de criação de protocolos
  - Adição de toast
- 3.4 - 21/06/2023
  - Update responder protocolo
- 3.5 - 22/06/2023
  - Adição do scroll da home pesquisador
  - Adição de toast na página de login
  - Adição da barra de pesquisador
  - Visualização de protocolo por pesquisador
- 4.0 - 23/06/2023
  - Delete protocolo
  - Correção do input img
  - Adição do endpoint visualizarprotocolo
  - CSS da tela de responder protocolo
  - CSS da tela home coletor
  - Ajustes finais
  - Organização das pastas
  - Integração responder protocolo
  - Modularização
  - WAD V5

  
  
  
## 📋 Licença/License

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/2023M2T7-Inteli/Projeto3">ObyWeb</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.inteli.edu.br">Inteli</a>, <a href="https://www.linkedin.com/in/davi-motta-53bba618b/">Davi Rosalino Glória Motta</a>, <a href="https://www.linkedin.com/in/drielly-farias/">Drielly Santana Farias</a>, <a href="https://www.linkedin.com/in/felipe-sabino-spina-b33372271/">Felipe Sabino Spina</a>, <a href="https://www.linkedin.com/in/victorbarq/">João Pedro Rodrigues Sotto Maior</a>, <a href="https://www.linkedin.com/in/victorbarq/">Manuela Dina de Mula Cury</a>, <a href="https://www.linkedin.com/in/victorbarq/">Marcelo Faska Sitton</a>, <a href="https://www.linkedin.com/in/renan-feitosa-44328524a/">Renan Feitosa Oliveira</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>



## 🎓 Referências

Aqui estão as referências usadas no projeto:

1. <https://creativecommons.org/share-your-work/>

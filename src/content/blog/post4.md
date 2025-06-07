---
title: "Setup do ambiente de desenvolvimento Debian"
description: "Relato da experiência inicial com a configuração do ambiente Debian."
pubDate: "Jun 7 2025"
heroImage: "/post4_img.png"
tags: ["MAC0470", "Debian"]
---

> **Resumo:** Este post relata minhas experiências iniciais com a configuração do ambiente Debian, no contexto da disciplina **Desenvolvimento de Software Livre (MAC0470)**. Nesta etapa da disciplina, começamos a explorar o processo de empacotamento de software para o Debian, o que exigiu a preparação de um ambiente adequado para desenvolvimento e testes. A configuração envolveu o uso de máquinas virtuais, escolha e instalação da imagem correta da distribuição, além da execução de tutoriais práticos fornecidos pela comunidade. Essas atividades foram fundamentais para entender o ecossistema de desenvolvimento do Debian e os desafios iniciais enfrentados ao contribuir com projetos de código aberto estruturados.

---

Na terceira parte da disciplina, começamos a contribuir com pacotes Debian. Para isso, era necessário utilizar uma máquina com essa distribuição instalada.

Após a aula do dia 04/06, decidi configurar uma Máquina Virtual com Debian usando o VirtualBox. Os monitores recomendaram o uso de uma imagem `-nocloud` x86_64 (AMD64) e indicaram onde encontrá-la. No entanto, por falta de atenção, acabei baixando a imagem errada.

Ao tentar usar o arquivo `.vdi` na VM, fui solicitado a fazer login, mas nenhuma combinação de usuário e senha funcionava. Diante disso, resolvi baixar uma imagem `.iso` e utilizá-la para recuperar o acesso à `.vdi`.

Depois de conseguir logar na máquina, comecei a seguir o tutorial disponível em [Configurando seu ambiente - Debian Brasil](https://debianbrasil.org.br/empacotamento/configurando-seu-ambiente).

No entanto, já no primeiro passo — a instalação de algumas bibliotecas — encontrei erros: várias delas não eram localizadas. Tentei rodar `apt update`, mas sem sucesso. Como a VM não tinha sequer interface gráfica, resolvi abandonar essa abordagem.

No fim das contas, criei uma nova VM diretamente a partir da `.iso`, e dessa vez tudo funcionou bem. O restante do tutorial fluiu sem problemas.


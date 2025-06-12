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

---
 
Na aula do dia 11 de junho, tivemos a presença dos convidados **Lucas Kanashiro** e **Charles [...]**, que auxiliaram a turma no processo de contribuição com o empacotamento Debian. Eu e minha dupla escolhemos trabalhar com o pacote `ruby-mini-mime`.

Apesar de ter um computador com **dual boot**, a partição do Linux estava muito pequena. Por preguiça de redimensioná-la, optei por instalar a máquina virtual no Windows. No início da aula, percebi que só havia feito login na conta do **Salsa** pelo Linux, e não conseguia acessar pelo Windows. Tive então que reiniciar o computador no Linux para recuperar meu e-mail e senha.

Contudo, ao voltar para o Windows, meu computador estava muito lento, e a tela inicial estava ficando preta logo quando eu logava no meu perfil, mas depois de muito tentar, consegui iniciar meu Windows corretamente. 

Ao voltar para o Windows, enfrentei problemas de desempenho: o sistema estava extremamente lento e, após o login, a tela ficava preta. Depois de várias tentativas, consegui inicializar o sistema corretamente. Fiz login no Salsa e iniciei a VM com Debian para seguir o tutorial.

Durante a execução do tutorial, era necessário configurar a **integração entre a máquina virtual e o sistema host**, especialmente para compartilhar o **clipboard** (área de transferência). Isso era importante para copiar a chave SSH e adicioná-la ao GitLab, além de facilitar a transferência de comandos mais longos. No entanto, a funcionalidade de compartilhamento não estava funcionando corretamente, e enquanto os convidados explicavam os passos do tutorial, eu tentava resolver esse problema paralelamente.

Apesar dos contratempos, tudo acabou funcionando bem. Minha dupla criou a [issue no Debian Brasil Team](https://salsa.debian.org/debian-brasil-team/docs/-/issues/499), e eu subi os arquivos e abri o *Merge Request*. Os comandos em si foram bastante tranquilos, então, mesmo tendo que lidar com problemas técnicos ao mesmo tempo, consegui realizar minha parte sem dificuldades.

Mais tarde, percebi que tanto o Windows quanto o GRUB estavam mais lentos após as mudanças feitas. Descobri que o motivo era a **competição por recursos de virtualização entre o VirtualBox e o Hyper-V**, o sistema nativo de virtualização do Windows. Para resolver o problema, seria necessário desativar manualmente um dos dois. Como já havíamos concluído a contribuição para o Debian, optei por **desinstalar a máquina virtual**, o que resolveu os problemas de desempenho.

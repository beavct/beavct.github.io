---
title: "Setup do ambiente de desenvolvimento Kernel Linux"
description: "Como foi a configuração de ambiente para o desenvolvimento do Kernel Linux."
pubDate: "Mar 23 2025"
heroImage: "/post1_img.webp"
tags: ["MAC0470", "Linux", "Kernel"]
---

Este post relata minhas experiências iniciais com a configuração de ambiente para desenvolvimento do kernel Linux, no contexto da disciplina **Desenvolvimento de Software Livre**. Ao longo das primeiras aulas, realizamos tutoriais práticos com o objetivo de preparar um ambiente de testes completo — desde a instalação de ferramentas de virtualização até a compilação e execução de um kernel customizado. Esses exercícios foram fundamentais para compreender os primeiros passos no desenvolvimento de software de código aberto em larga escala, como o próprio kernel Linux.

### Tutorial 1 — Ambiente de Testes com QEMU e libvirt

Na aula do dia **27 de fevereiro**, realizamos nosso primeiro tutorial, [*Setting up a test environment for Linux Kernel Dev using QEMU and libvirt*](https://flusp.ime.usp.br/kernel/qemu-libvirt-setup/), focado na criação de uma máquina virtual para compilar e testar o kernel Linux a partir do código-fonte. Durante a execução, enfrentei um problema relacionado à ausência de uma biblioteca Python, que causava erro ao executar o comando `mount` na VM. Apesar das tentativas dos monitores, não conseguimos solucionar o problema na hora. Curiosamente, ao reiniciar a VM, o erro desapareceu e pude seguir com o tutorial normalmente.

### Tutorial 2 — Compilação e Boot do Kernel para ARM

No dia **12 de março**, foi realizado o segundo tutorial, [*Building and booting a custom Linux kernel for ARM*](https://flusp.ime.usp.br/kernel/build-linux-for-arm/), no qual aprendemos a compilar um kernel customizado e inicializá-lo na máquina virtual. Eu não pude comparecer à aula, mas executei o tutorial posteriormente. Durante o processo, tive dificuldade ao montar o sistema de arquivos na VM. Na aula seguinte, com a ajuda de um monitor, descobri que o problema era um erro simples: eu estava tentando montar a partição errada (usei `sda1` em vez de `sda2`).

### Tutorial 3 — Configuração de Build e Módulos do Kernel

Ainda na aula do dia **19 de março**, realizamos o terceiro tutorial, [*Introduction to Linux kernel build configuration and modules*](https://flusp.ime.usp.br/kernel/modules-intro/), cujo foco foi a criação e teste de módulos simples para o kernel. Felizmente, esse foi o tutorial tranquilo — consegui completar todas as etapas sem dificuldades ou erros.

### Tutorial 4 — Introdução a Drivers de Dispositivo de Caracteres no Linux  

No dia **26 de março**, realizamos o quarto tutorial, [*Introduction to Linux kernel Character Device Drivers*](https://flusp.ime.usp.br/kernel/char-drivers-intro/), no qual exploramos os conceitos fundamentais dos *character devices* no Linux. O tutorial apresentou a estrutura e funcionamento desse tipo de dispositivo, seguido da implementação de um driver simples para ilustrar os conceitos discutidos. Mais uma vez a realização do tutorial foi tranquila.

---


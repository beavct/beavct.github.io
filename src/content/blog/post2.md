---
title: "Contribuição com o Kernel Linux"
description: "Nossa primeira contribuição para o subsistema IIO do Kernel Linux"
pubDate: "Mar 23 2025"
heroImage: "/post2_img.jpg"
tags: ["MAC0470", "Kernel", "IIO", "Linux"]
---

Depois de realizar o último tutorial [The iio_simple_dummy Anatomy](https://flusp.ime.usp.br/iio/iio-dummy-anatomy/), onde fomos introduzidos aos principais conceitos de um driver do subsistema IIO (Industrial I/O), demos início à nossa primeira contribuição com o **Kernel Linux**, mais especificamente dentro desse subsistema.

Junto com a minha dupla, Gabriela Victor, escolhemos como tarefa inicial resolver um problema de duplicação de código no driver `zopt2201` — sensor que mede intensidade de luz ambiente (ALS) e radiação ultravioleta B (UVB). Após investigar o arquivo `drivers/iio/light/zopt2201.c`, identificamos que as funções:

- `zopt2201_write_scale_als_by_idx`
- `zopt2201_write_scale_uvb_by_idx`

eram **exatamente idênticas** em sua implementação. Ambas deveriam realizar operações específicas para os vetores `als` e `uvb`, respectivamente, mas descobrimos que **a função `zopt2201_write_scale_uvb_by_idx` estava incorretamente acessando os campos de `als`**, o que potencialmente causaria comportamentos errôneos no driver.

## O problema

- **Duplicação total de código** entre as duas funções.
- **Bug potencial:** A função `write_scale_uvb_by_idx` acessava o array `als` em vez de `uvb`, tornando-a funcionalmente incorreta.

## A solução

A solução proposta foi a **criação de uma função genérica** que encapsula o comportamento comum entre as duas funções, mas que permite especificar qual vetor de escala deve ser usado.

Criamos a seguinte função:

```c
static int zopt2201_write_scale_by_idx(struct zopt2201_data *data, int idx, struct zopt2201_scale *zopt2201_scale_array);
```

Que possui um parâmetro adicional, o vetor correto a ser utilizado. Assim, conseguimos reutilizar a lógica comum e garantir que cada chamada manipulasse apenas o vetor apropriado.

## Estrutura de dados utilizada

Para que a função genérica funcionasse corretamente, foi necessário **nomear a estrutura** utilizada nos arrays de escala. Originalmente, a estrutura era **anônima e repetida** nas definições dos vetores `als` e `uvb`, o que impedia sua reutilização em uma função comum.

Refatoramos o código definindo explicitamente a estrutura como `zopt2201_scale`:

```c
struct zopt2201_scale{
   unsigned int scale, uscale; /* scale factor as integer + micro */
   u8 gain; /* gain register value */
   u8 res; /* resolution register value */
};
```

## Envio do patch
Com as alterações implementadas e compiladas com sucesso, redigimos a mensagem de commit explicando a refatoração e a correção do bug. Inicialmente, enviamos o patch para os monitores da disciplina para revisão. Após a aprovação, o patch foi submetido para a mailing list do subsistema IIO, seguindo as boas práticas de contribuição com o Kernel Linux.


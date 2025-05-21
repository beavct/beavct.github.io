---
title: "Contribuição com o GNOME"
description: "Relato da experiência de contribuição para a comunidade GNOME durante a disciplina MAC0470."
pubDate: "Mar 23 2025"
heroImage: "/postm_img.jpg"
tags: ["MAC0470", "GNOME", "GNOME Weather", "libgweather"]
---

Durante a segunda parte da disciplina MAC0470, minha dupla, Gabriela Victor, e eu decidimos contribuir com o projeto GNOME.

## Escolha da Contribuição

Iniciamos explorando issues marcadas como *newcomers* em diferentes aplicativos do ecossistema GNOME, mas nenhuma delas despertou nosso interesse. Em seguida, analisamos outras issues abertas e encontramos [Weather information not fetched correctly (0°C) for some cities supported by YR.no (ex: São Bernardo do Campo)](https://gitlab.gnome.org/GNOME/gnome-weather/-/issues/437), no aplicativo **GNOME Weather**, que nos chamou a atenção.

A issue era recente, estava conectada a outras tarefas e o responsável pelo app Weather (e também pelo Calendar) era Jess Fortin.

## Configuração do ambiente de desenvolvimento

Para iniciar a contribuição, seguimos os seguintes passos:

- Instalamos as versões nightly dos aplicativos Weather e Builder;
- Tentamos configurar as dependências para conseguir realizar o build do projeto;
    - Encontramos dificuldades iniciais com a ausência do comando GObject, que causava falhas no build por terminal;
    - Após diversas tentativas, retornamos o projeto aos arquivos originais e conseguimos executá-lo corretamente com o auxílio de um colega da disciplina.

## Diagnóstico do problema
Realizamos testes com diferentes cidades no aplicativo para entender o funcionamento da API:

- Ao buscar por São Bernardo do Campo, SP - Brasil, recebemos:

```bash
GWeather-Message: 13:56:24.983: Failed to get met.no forecast data: [status: 400] Bad Request
(org.gnome.WeatherDevel:2): GWeather-DEBUG: 13:56:24.983: No forecast list available, not fixing up

```

- Por outro lado, ao buscar Zhytomyr, Ukraine, a resposta foi:

```bash
(org.gnome.WeatherDevel:2): GWeather-DEBUG: 14:10:24.627: metno parsed 89 forecast infos
(org.gnome.WeatherDevel:2): GWeather-DEBUG: 14:10:24.628: Fixed up missing current weather with first forecast data

```

## Bibliotecas e ferramentas utilizadas

### Bibliotecas 
- Gio: provê funcionalidades modernas para entrada/saída, manipulação de arquivos, operações de rede, comunicação entre processos (IPC), entre outros recursos essenciais para aplicações GNOME.
- GLib: biblioteca base da plataforma GNOME, oferecendo utilitários fundamentais como estruturas de dados (listas, tabelas hash, etc.), manipulação de strings, sistema de tipos, gerenciamento de memória, entre outros.
- [GWeather](https://wiki.gnome.org/Projects/LibGWeather): biblioteca responsável por lidar com dados meteorológicos e suas respectivas unidades (como temperatura, velocidade do vento, umidade, etc.). Também fornece suporte para localização e acesso a informações meteorológicas de forma integrada às bibliotecas GNOME.

### API do met.no
O met.no é o site oficial do Instituto Meteorológico da Noruega (Norwegian Meteorological Institute), responsável por fornecer dados climáticos e previsões meteorológicas para diversos serviços públicos e privados.

A API fornecida pelo met.no é amplamente utilizada por aplicações que necessitam de previsões do tempo de forma gratuita, confiável e atualizada — como é o caso do aplicativo Weather do GNOME.

Referências úteis:

- [Guia para realizar requisições](https://docs.api.met.no/doc/locationforecast/HowTO.html)
- [Códigos de status](https://docs.api.met.no/doc/StatusCodes.html)
- [Ferramenta para testes](https://docs.api.met.no/doc/WebClients.html)

## Procurando o problema
Ao ativar o modo de debug, identificamos que a requisição feita ao `met.no` para São Bernardo estava incorreta:

```bash
https://aa037rv1tsaszxi6o.api.met.no/weatherapi/locationforecast/2.0/classic?lat=-23.6938&lon=-565.46
```

A longitude `-565.46` é inválida, já que os valores aceitos estão no intervalo de [-180, +180].

Suspeitamos que a localização estivesse sendo buscada de forma automática por uma API, mas ao examinar o código-fonte do app Weather, encontramos o seguinte trecho em `hourlyForecast.ts`:

```ts
const coords = info.location.get_coords();
const nearestCity = GWeather.Location.get_world()?.find_nearest_city(
    coords[0],
    coords[1]
);
```
Decidimos então printar esses valores logo depois de serem pedidos para a biblioteca GWeather, ele logo de cara eles já estavam incorretos.

A longitude fornecida (-565.46) é inválida, uma vez que os valores aceitos estão no intervalo [-180, +180].

Logo após essa chamada, os valores retornados já estavam incorretos. Isso indicava que o problema não estava no app Weather, mas sim na biblioteca [Gweather/libgweather](https://gitlab.gnome.org/GNOME/libgweather).

### Análise da biblioteca libgweather

Lemos alguns arquivos dessa biblioteca e encontramos pedaços de código como:

```c
// gweather_location_get_coords
g_return_if_fail (loc->latlon_valid);
*latitude = loc->latitude / M_PI * 180.0;
*longitude = loc->longitude / M_PI * 180.0;
```

```c
// location_ref_for_idx
gboolean latlon_valid = isfinite (latitude) && isfinite (longitude);
```

Que indicavam que a biblioteca também não usava uma API para pegar os dados da localização de uma cidade. 
Em vez disso, utiliza um arquivo chamado `Locations.xml`, presente no diretório `data`, onde todas as localizações e suas coordenadas são adicionadas **manualmente**.

Ao verificar esse arquivo, confirmamos que **São Bernardo do Campo** estava com as mesmas **coordenadas incorretas** vistas no aplicativo. Além disso, algumas das localidades mencionadas na issue original nem estavam presentes no XML.

## Contribuição realizada

- Corrigimos as coordenadas da cidade de **São Bernardo do Campo**;
- Adicionamos outras cidades mencionadas na issue original;
- Criamos uma [nova issue na libgweather](https://gitlab.gnome.org/GNOME/libgweather/-/issues/325), alertando que outras coordenadas podem estar incorretas, o que pode causar erros no GNOME Weather;
- Sugerimos melhorias no aplicativo Weather:
    - **Validação** das coordenadas antes de realizar a requisição para a API;
    - Mensagens de log mais **descritivas** em caso de erro;
    - **Notificação mais clara** ao usuário final indicando o motivo do erro (por exemplo, cidade com coordenadas inválidas).

Nova tela de erro do aplicativo de Clima:
![Tela de localização inválida](/post3_imgs/clima_tela.png)

Impressão de erro no console:
![Erro no console](/post3_imgs/console.png)

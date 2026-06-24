# Rastreamento do Site Delvechio Tech

Atualizado em 2026-06-24.

## IDs oficiais

- Google Tag Manager: `GTM-WDCNVPF5`
- Google Analytics 4: `G-0Y45T4006P`
- Meta Pixel: `1359789356013760`

## Decisão de implementação

O site instala diretamente apenas o Google Tag Manager. O GA4 e o Meta Pixel devem ser configurados dentro do GTM para evitar duplicidade de PageView e facilitar manutenção futura.

## Onde o GTM foi instalado

O snippet principal do GTM foi instalado no topo do `<head>` e o snippet `noscript` foi instalado imediatamente após a abertura do `<body>` nas páginas:

- `/index.html`
- `/clinicas/index.html`
- `/imobiliarias/index.html`
- `/agente-ia/index.html`
- `/pequenas-empresas/index.html`
- `/templates/index.html`

## Eventos enviados pelo site

O arquivo `/script.js` envia eventos seguros para o `dataLayer` quando alguém clica em links de WhatsApp.

### `click_whatsapp`

Disparado em qualquer clique para WhatsApp.

Campos enviados:

- `click_text`: texto visível do link, limitado a 120 caracteres
- `page_path`: caminho da página atual
- `whatsapp_destination`: URL do WhatsApp sem parâmetros de mensagem
- `lead_intent`: `diagnostico` ou `whatsapp`

### `generate_lead`

Disparado quando o clique de WhatsApp tem intenção de diagnóstico.

Campos enviados:

- `lead_source`: `whatsapp`
- `lead_intent`: `diagnostico`
- `page_path`: caminho da página atual

## Configuração recomendada dentro do GTM

1. Criar uma tag GA4 com o ID `G-0Y45T4006P`.
2. Disparar a tag GA4 em todas as páginas.
3. Criar uma tag Meta Pixel com o ID `1359789356013760`.
4. Disparar o PageView do Meta Pixel em todas as páginas.
5. Criar um acionador de evento personalizado para `click_whatsapp`.
6. Enviar `click_whatsapp` para GA4 como evento.
7. Criar um acionador de evento personalizado para `generate_lead`.
8. Enviar `generate_lead` para GA4 e para Meta como evento de lead.

## Observação de privacidade

O site não envia nome, telefone, e-mail, mensagem do WhatsApp ou dados sensíveis de saúde para o `dataLayer`. O rastreamento atual mede comportamento de clique e intenção comercial sem capturar dados pessoais do lead.

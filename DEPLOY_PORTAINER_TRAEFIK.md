# Deploy do site `delvec.tech` com Portainer + Traefik

Este site é estático e roda em Nginx dentro de um container Docker.

## 1. DNS

No painel do domínio `delvec.tech`, crie:

- Tipo `A`
- Nome `@`
- Valor: IP público da sua VPS

Opcional:

- Tipo `CNAME`
- Nome `www`
- Valor: `delvec.tech`

## 2. Network do Traefik

O `docker-compose.yml` assume que a network externa do Traefik se chama:

```txt
traefik
```

Se no seu Portainer ela tiver outro nome, por exemplo `proxy`, troque:

```yaml
networks:
  - traefik
```

e:

```yaml
traefik.docker.network=traefik
```

para o nome correto.

## 3. Certresolver

O compose assume que seu Traefik usa o resolver:

```txt
letsencrypt
```

Se no seu Traefik for `le`, `cloudflare`, `myresolver` ou outro nome, altere:

```yaml
traefik.http.routers.delvec-tech.tls.certresolver=letsencrypt
```

## 4. Subir pelo Portainer

No Portainer:

1. Vá em `Stacks`
2. Clique em `Add stack`
3. Nome: `delvec-tech-site`
4. Cole o conteúdo do `docker-compose.yml`
5. Em `Web editor`, envie também os arquivos do projeto ou use um repositório Git
6. Clique em `Deploy the stack`

## 5. Subir pela VPS

Dentro da pasta do site:

```bash
docker compose up -d --build
```

Depois acesse:

```txt
https://delvec.tech
```

## 6. Checklist se não abrir

- DNS do domínio aponta para o IP da VPS.
- Portas `80` e `443` abertas no firewall.
- Traefik está rodando.
- O nome da network externa está correto.
- O nome do certresolver está correto.
- Não existe outro container usando `Host(\`delvec.tech\`)`.

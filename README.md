# wagtail-docker-starter
Un kit de inicio (starter kit) completamente dockerizado y listo para producción para Wagtail CMS. Integra un pipeline de frontend moderno (Vite + SCSS) junto con una infraestructura backend robusta (Nginx + PostgreSQL). 

## Requerimientos:

- Docker
- Docker compose

## Recomendaciones

1. Actualización de dependencias: Antes de iniciar el desarrollo, asegúrese de actualizar todos los paquetes a sus versiones requeridas o más recientes.

    * Python
    * Django
    * Wagtail

## Desarrollo

El proyecto se configura por medio de variables de ambiente.
Está desarrollado para leer los archivos `.env` de cada contenedor y el
principal del proyecto. Para ver las opciones disponibles puede guiarse por
los archivos `.env.example`.

Generar los archivos de configuración en git Bash

```shell
$ docker run -ti --rm -v "c:/ruta/a/carpeta/del/proyecto":"/var/lib/dotenver/" jmfederico/dotenver
```

Generar los archivos de configuración en Windows cmd

```shell
$ docker run -ti --rm -v "c:\ruta\a\carpeta\del\proyecto":"/var/lib/dotenver/" jmfederico/dotenver
```

Generar los archivos de configuración en Mac, Linux o WSL

```shell
$ docker run -ti --rm -v "${PWD}:/var/lib/dotenver/" jmfederico/dotenver
```

### Levantar Docker

```
$ docker-compose build
$ docker-compose up -d
```

La aplicación estará disponible en: https://localhost

### Crear Usuario Administrador

```
$ docker-compose run --rm django ./manage.py createsuperuser

## Sass Transpilation

En su ambiente de desarrollo las transpilaciones de sass a css se realizan automaticamente.
Si requiere incluir sass en su template recuerde cargar el templatetag e incluir su archivo en el bloque extra_css

```
{% load sass_src %}
{% block inline_css %}
  {# inside ui/ #}
  <link href="{% sass_src 'main_theme.scss' %}" rel="stylesheet" type="text/css" />
{% endblock %}

```

La unica carpeta que se escanea en busca de estilos es `assets/ui`

Si desea transpilar manualmente los archivos `.scss`

```
$ docker-compose run --rm django ./manage.py compilescss
```

### **Nota**:

Actualmente no es necesario ejecutar este comando, puesto que los archivos son transpilados automaticamente en el momento de publicar.
Dicho esto, es recomendable que usted no realice commit de los archivos `.css` y `.map` generados en su ambiente local.

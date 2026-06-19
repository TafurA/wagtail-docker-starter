# Use an official Python runtime based on Debian 12 "bookworm" as a parent image.
FROM python:3.14-slim-bookworm

# Add user that will be used in the container.
RUN useradd wagtail

# Port used by this container to serve HTTP.
EXPOSE 8000

# Set environment variables.
# 1. Force Python stdout and stderr streams to be unbuffered.
# 2. Set PORT variable that is used by Gunicorn. This should match "EXPOSE"
#    command.
ENV PYTHONUNBUFFERED=1 \
    PORT=8000

# Install system packages required by Wagtail and wagtail.
RUN apt-get update --yes --quiet && apt-get install --yes --quiet --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    libmariadb-dev \
    libjpeg62-turbo-dev \
    postgresql-client \
    zlib1g-dev \
    libwebp-dev \
 && rm -rf /var/lib/apt/lists/*

# Install Poetry
WORKDIR /root
# Instala Poetry
RUN curl -sSL https://install.python-poetry.org/ | python3 -

# Asegura que Poetry esté en el PATH para las siguientes instrucciones
ENV PATH="/root/.local/bin:$PATH"

# Copia archivos necesarios para instalación de dependencias
COPY pyproject.toml poetry.lock* ./

# Configura Poetry (sin virtualenvs)
RUN poetry config virtualenvs.create false

# Instala dependencias del proyecto
RUN poetry install --no-root

# Agrega plugin si lo necesitas
RUN poetry self add poetry-plugin-export

# Install the project requirements.
# COPY requirements.txt /
# RUN pip install -r /requirements.txt

# Use /app folder as a directory where the source code is stored.
WORKDIR /app

# Set this directory to be owned by the "wagtail" user. This Wagtail project
# uses SQLite, the folder needs to be owned by the user that
# will be writing to the database file.
RUN chown wagtail:wagtail /app

# Copy the source code of the project into the container.
COPY --chown=wagtail:wagtail . .

# Collect static files.
# RUN python manage.py collectstatic --noinput --clear

# Runtime command that executes when "docker run" is called, it does the
# following:
#   1. Migrate the database.
#   2. Start the application server.
# WARNING:
#   Migrating database at the same time as starting the server IS NOT THE BEST
#   PRACTICE. The database should be migrated manually or using the release
#   phase facilities of your hosting platform. This is used only so the
#   Wagtail instance can be started with a simple "docker run" command.

# Expose the wagtail port
EXPOSE 8000/tcp

COPY docker/django/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh && ln -s /usr/local/bin/docker-entrypoint.sh /
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
 
# Run wagtail’s development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

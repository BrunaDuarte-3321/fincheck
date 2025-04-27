FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /api

# Instala o cliente PostgreSQL para usar o comando pg_isready
RUN apt-get update && apt-get install -y postgresql-client

# Copia os arquivos de dependência
COPY package*.json ./
RUN npm install

# Copia o restante da aplicação, inclusive o wait-for-db.sh
COPY . .

# Dá permissão para executar o script
RUN chmod +x wait-for-db.sh

EXPOSE 3000

# O comando de start vai ser definido no docker-compose.yml
CMD ["npm", "start"]

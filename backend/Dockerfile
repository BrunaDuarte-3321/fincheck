FROM node:18

# Defina o diretório de trabalho dentro do container
WORKDIR /api

# Instale o cliente PostgreSQL para usar o comando pg_isready
RUN apt-get update && apt-get install -y postgresql-client

# Copia apenas os arquivos de dependência e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante da aplicação
COPY . .

EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]

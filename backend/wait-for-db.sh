#!/bin/sh

echo "Aguardando o banco de dados em db:5432..."

# Espera o banco estar pronto
until pg_isready -h db -p 5432 -U root; do
  echo "Banco não está pronto, aguardando..."
  sleep 2
done

echo "Banco de dados está pronto. Rodando Prisma..."

npx prisma generate
npx prisma migrate deploy

echo "Iniciando a aplicação..."
npm start

echo "Aplicação iniciada."

# Usar uma imagem oficial do Python como imagem base
FROM python:3.8-slim

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos de dependências e instalar as dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todos os arquivos locais para o container
COPY . /app

ENV DATABASE_URL="sqlite:///./test.db"

# Instruir a porta em que a aplicação será executada
EXPOSE 8000

# Comando para executar a aplicação usando uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--reload"]
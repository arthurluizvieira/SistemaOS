# Usar imagem oficial do Python
FROM python:3.11-slim

# Configura diretório de trabalho dentro do container
WORKDIR /app

# Copia dependências dos arquivos de requirements.txt
COPY requirements.txt .


# Instala as dependências do sistema (necessário pro mysqlclient)
RUN apt-get update && apt-get install -y build-essential default-libmysqlclient-dev gcc \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip && pip install -r requirements.txt

# Copia o restante do código
COPY . .


# Expõe porta padrão do Django (da pra ajustar c quizer depois)
EXPOSE 8000

# Comando de entrada (pode ser modificado depois se usar gunicorn, etc)
# Comando para rodar 
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]









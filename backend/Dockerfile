# Dockerfile para el backend NestJS + TypeORM
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Exponer el puerto del backend
EXPOSE 3000

# Comando para iniciar la app (modo desarrollo)
CMD ["npm", "run", "start:dev"]
FROM node:20-alpine3.19

# Définition de l'environnement de production
ENV NODE_ENV=production

WORKDIR /app

# Copie et installation des dépendances strictes
COPY package*.json ./
RUN npm ci --omit=dev

# Copie du reste du code source
COPY . .

# Sécurité : utilisation d'un utilisateur non-root
USER node

EXPOSE 3000

# Démarrage de l'application (modifiez index.js si votre fichier principal s'appelle autrement)
CMD ["node", "index.js"]
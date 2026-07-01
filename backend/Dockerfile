# --- Étape 1 : Préparation des dépendances ---
FROM node:22-alpine AS deps
WORKDIR /app

COPY package*.json ./
# Installation STRICTE des dépendances de production uniquement
RUN npm ci --omit=dev

# --- Étape 2 : Image de Production ---
FROM node:22-alpine AS production

# Définition de l'environnement
ENV NODE_ENV=production
WORKDIR /app

# Récupération exclusive des modules "propres" de l'étape précédente
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./

# Copie du code source applicatif
COPY . .

# Sécurité : Création et utilisation d'un utilisateur non-root
USER node

EXPOSE 3000

# Démarrage de l'application (Adaptez index.js si votre fichier s'appelle server.js ou app.js)
CMD ["node", "index.js"]

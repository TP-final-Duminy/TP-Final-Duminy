# --- Étape 1 : Builder ---
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
# Installation propre des dépendances (y compris devDependencies pour le build)
RUN npm ci

COPY . .
# Compilation du code (ex: TypeScript vers JavaScript)
RUN npm run build

# --- Étape 2 : Production ---
FROM node:20-alpine AS production

# Définition de l'environnement de production
ENV NODE_ENV=production

WORKDIR /app

# Copie des dépendances de production uniquement
COPY package*.json ./
RUN npm ci --only=production

# Récupération de l'artefact compilé depuis l'étape builder
COPY --from=builder /app/dist ./dist

# Sécurité : Création et utilisation d'un utilisateur non-root (intégré dans l'image Node)
USER node

# Exposition du port de l'API
EXPOSE 3000

# Démarrage de l'application
CMD ["node", "dist/index.js"]
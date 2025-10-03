FROM node:18 AS frontend-builder
WORKDIR /app/phonebook
# COPY /phonebook/package*.json ./
COPY phonebook/package*.json ./
RUN npm install
COPY phonebook/ ./
RUN npm run build

FROM node:18 AS backend-builder
WORKDIR /app/backend
COPY ./package*.json ./
RUN npm install
COPY index.js ./
COPY models ./models
# COPY .env ./

FROM node:18 
WORKDIR /app
COPY --from=backend-builder /app/backend ./backend
COPY --from=frontend-builder /app/phonebook/dist ./backend/dist

WORKDIR /app/backend


# ENV MONGODB_URI=`mongodb+srv://23520303_db_user:${password}@cluster0.lmstc2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
# ENV MONGODB_URI=mongodb+srv://23520303_db_user:1718943649@cluster0.lmstc2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
ENV PORT=3001
EXPOSE 3001

CMD ["node", "index.js"]


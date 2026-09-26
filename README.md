# Práctica 06 - Despliegue de una API Node.js en AWS

API REST de empleados preparada para producción con MongoDB Atlas, AWS EC2, Nginx y PM2 en modo clúster.

## Arquitectura

```text
Internet -> AWS Security Group (80/443) -> Nginx -> 127.0.0.1:3000 -> PM2/Node.js -> MongoDB Atlas
```

El puerto 3000 no se expone públicamente. SSH se restringe a la IP del administrador y Atlas permite únicamente la IP elástica de EC2 y, temporalmente, la IP local utilizada durante las pruebas.

## Desarrollo local

```bash
cd backend
npm install
cp .env.example .env
```

Reemplazar `MONGO_URI` en `.env` con la cadena entregada por Atlas. Luego:

```bash
npm run check
npm run dev
```

Pruebas rápidas:

```bash
curl http://127.0.0.1:3000/health
curl 'http://127.0.0.1:3000/api/v1/employees?page=1&limit=20'
```

## Variables de producción

Crear en EC2 el archivo `/var/www/practica7/shared/.env`, nunca dentro de Git:

```dotenv
NODE_ENV=production
HOST=127.0.0.1
PORT=3000
MONGO_URI=mongodb+srv://USUARIO:CONTRASENA@CLUSTER.mongodb.net/practica7?retryWrites=true&w=majority
```

Si la contraseña contiene caracteres especiales, deben codificarse para URL.

## Archivos de despliegue

- `ecosystem.config.cjs`: PM2, modo clúster y PM2 Deploy.
- `deploy/nginx-practica7.conf`: proxy inverso público hacia la API privada.
- `.env.example`: contrato de variables sin secretos.

## Verificación en producción

```bash
curl http://IP_ELASTICA/health
curl 'http://IP_ELASTICA/api/v1/employees?page=1&limit=20'
pm2 list
pm2 logs practica7-api
sudo nginx -t
sudo systemctl status nginx
```

## Seguridad

- No subir `.env`, archivos `.pem`, contraseñas ni URLs de webhook.

## Monitor y notificaciones de Discord

El directorio `deploy/` incluye un servicio y un temporizador de systemd que
comprueban `/health` cada 30 segundos. El monitor notifica a Discord solamente
cuando cambia el estado de la API (caída o recuperación). La URL privada del
webhook se guarda únicamente en `/etc/practica7-monitor.env` dentro de EC2.
- Abrir `80` y `443` al público; restringir `22` a la IP personal.
- No abrir `3000` en el Security Group.
- Crear un usuario de base de datos exclusivo para esta aplicación.
- Añadir la IP elástica de EC2 a la lista de acceso de Atlas.

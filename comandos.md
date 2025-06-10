# Ver la versión de node
node -v

# Instalar Angular de manera GLOBAL
npm install -g @angular/cli

# Comprobar que está instalado
ng version

# Si da error, hay que habilitar scripts en PowerShell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# Crear un nuevo proyecto
ng n myapp

# Arrancar proyecto
ng serve

# Crear componente, se recomienda que esté en una carpeta llamada components

ng g c nombreComponente

# Cuando lo haya creado, debo importarlo en app.component.ts

# Generar servicio
ng g s nombreServicio

# Instalar servidor JSON
npm install -g json-server 

# Levantar servidor JSON
json-server --watch db.json --port 3000



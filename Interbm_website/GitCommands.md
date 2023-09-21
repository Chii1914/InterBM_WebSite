//Comandos basicos
git status / para revisar que hice, si comitie o no.
git add //Para agregar a etapa stage
git commit t-m "Primer commit" --para crear un commit
git commit "para agregar un cambio al commit"
git restore --staged "nombrearchivo.extension"
git restore "nombrearchivo" /con esto recupero el archivo, vuelvo al antiguo archivo

///Movimiento entre ramas y visualización de historial
git branch // Indica las ramas en las q estoy trabajando
git checkout -b "nombrederama" // Crea una rama
git checkout "nombrederama" //Te cambia de rama
git log --oneline //Visualizamos el historial de cambios
cat "nombredearchivo" // Muestra contenido de archivo
git merge "nombrederama" // Trae los cambios de una rama, a la rama en la cual yo esté.

//Actualización de archivos
git mv "argumento1" "argumento2" //cambio de nombre, primero lo q tengo y dps lo q queiro tener
Si cambio el nombre de un archivo, tengo que actualizar el nuevo y el antiguo"
git add "argumento1"
git add "argumento2"
git commit -m "Nombre del cambio"
git status -s //Otra visualizacion de status
git diff //Visualiza las modificaciones del archivo a través de la terminal
git diff --staged //( .....)
git log --oneline //Historial de cambio, + id + mensaje del commit

//Github -- Repositorio en la nube
git remote add origin "https://github.com/..." //Esta indicando donde obtener y cambiar code
git push -u origin main //Crea mi rama "main" en carpeta "origin"  
 Te hace logwear un usuario, y clave. La clave está en el perfil de github "Developer settings"
Personal access tokens "nombre de token"
git push //Esto lo manda a la carpeta de github
git push -u origin RamaC //Crea la rama en elrepositorio.

// Practica
git push origin features/test_lucciano

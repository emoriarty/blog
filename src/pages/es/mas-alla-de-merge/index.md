---
title: Más allá de merge
date: "2019-05-05T00:12:03.284Z"
language: es
translations: [ "en", "beyond-merge" ]
---

Cualquiera que haya trabajado algún tiempo con git, irremediablemente sabrá
que es hacer un *merge*. Supongamos que tenemos una rama *A* que sale de master.
El comando `merge` traerá los cambios producidos en *A* a *master*.

```bash
71a621b (HEAD -> master) (A) A file updated
2dc6065 (A) new A file
76a1097 Demo file updated
a31e004 README updated
44d4c5b New README file
ee42779 New demo file
```

Si todo ha ido bien, los cambios se emplazan por delante en la rama *master*.

```bash
1———2———3———A1———A2
```

El registro —*log*— refleja un orden incremental de los *commits*, en otras
palabras, los *commits* son mostrados en el orden en que son añadidos. Una linea
temporal de cambios.

Cuando estas modificaciones han ocurrido al mismo tiempo en una rama *B*, lo
cual no estan raro como parece, la estrategia de fusión —*merge*— no puede hacer
una actualización *fast-forward* (añadir los cambios por delante).

```bash
057a856 (HEAD -> master) Merge branch 'B'
71a621b (A) A file updated
1ac6aff (B) B file updated
2dc6065 (A) new A file
d657116 (B) new B file
76a1097 Demo file updated
a31e004 README updated
44d4c5b New README file
ee42779 New demo file
```

Puesto que los cambios ocurrieron en un mismo marco temporal, el comando `merge`
ejecuta una estrategia recursiva, entrelazando los *commits* de *A* y *B*.

```bash
1———2———3———B1———A1———B2———A2
```

Estos *commits* entrecruzados no muestran adecuadamente los diferentes bloques
por rama. Como se puede ver arriba, los *commits* de *B* preceden los de *A*
cuando en realidad se introdujeron después. Además, los *commits* no estan
alineados por significado, todos los *commits* pertenicientes a *A* deberían mostrarse
antes que los de *B*.

Para poder prevenir esta situación una vez la *feature* ha sido completada.
En vez de hacer un *merge* con todos los *commits* presentes en la rama, la
solición es pasar los cambios a *master* como un único commit junto a un mensaje
descriptivo. Este enfoque mejora la trazabilidad del registro de git.

Quizás para proyectos de menor calado o apuestas personales no sea tan importante
(aunque siempre es mejor manetener las buenas prácticas) el manetener en
estricto orden un registro de eventos. Pero cuando se trata de grandes equipos
donde cada *feature* o *bug* debe estar perfectamente aislado y etiquetado,
un registro desordenado marcará la diferencia entre el caos y la armonía del
proyecto.

Para los recien llegados a git (y también para aquellos que no han tenido mucho
tiempo para profundizar) hay más opciones aparte del comando `merge`.

Vamos más allá de `merge`.

## Rebase

A diferencia de *merge*, *rebase* permite hacer un *merge* basado en la propia rama,
manteniendo los *commits* relacionados en un mismo lote.

```bash
1———2———3———A1———A2———B1———A2
```

Como podemos comprobar arriba, la rama mantiene una linealiad acorde a los bloques
de trabajo y no por marca temporal. 

Un forma interesante para prevenir conflictos mientras se trabaja en una rama
nueva, es actualizar el espacio de trabajo actual con los cambios de la rama
origen.

```git
git rebase <origin-branch> 
```

Dado el siguiente estado.

```bash
        B1———B2
       /
A1———A2———A3———A4
```

El comando `rebase` permite quitar momentáneamente los commits actuales (los que
no están presente en la rama de origen), volcar los nuevos commits y vuelve a
incluir los cambios actuales.

```bash
                  B1———B2
                 /
A1———A2———A3———A4
```

Aunque se pretende actualizar habitualmente la rama de trabajo actual, puede pasar
que las diferencias entre ambas ramas sean demasiado complejas que los conflictos
terminan apareciendo. Al igual que `merge`, los conflictos deben ser solucionados
aunque pude hacerse de manera interactive. `rebase` permite que hacer en caso
de conflicto: solucionarlos o abortar acción. Abajo se muestra una lista con las
acciones disponibles en caso de conflicto.

```bash
git rebase --continue # follow rebase
git rebase --skip     # jump current conflict
git rebase —-abort    # stop rebase and leave things as they were
git rebase --quit     # like abort but keeping the committed changes
```

## Forzando *push*

Puede pasar cuando se está haciendo un *rebase*, el repositorio remoto rechaza
los nuevos cambios el hecho del propio *rebase*. La mensaje devuelto dice algo
así como que la rama local está por detrás de la remota.

Cuando `rebase` ha sido llevado a cabo, los cambios provenientes de la rama de
origen son situados antes de la pila de commits pertenecientes a la rama de trabajo,
desincronizando la rama homólogo en remoto. En este caso particular, el mensaje es
algo confuso, nos pide actualizar desde remote cuando en realidad no es así. 

A finde de solventar este problema, el comando `push` puede ser forzado usando la
opción `--force`.

```bash
git push --force
```

__Nunca, pero nunca, se debe forzar una acción *push* en una rama colaborativa__.
Esta acción destruirá las modificaciones que habrían sido llevadas a cabo por otros
miembros del repositorio y tú terminarías por convertirte en objeto de odio entre
los compañeros. Solo deberías usar `--force` en una rama remota donde solo tú seas
el único usuario.

Para evitar posibles sobrescrituras en una rama remota, existe la opción
`--force-with-lease`. Mientras que `--force` fuerza los cambios sin miramientos,
`--force-with-lease` no actualizará si detecta que cualquier otro miembro
ha añadido sus modificaciones en remoto.

Así que, recuerda, siempre es preferible no forzar un `push` pero si no hay más
remedio, entonces tira de `--force-with-lease`.

```bash
git push --force-with-lease
```

## Seleccionando *commits*

Mientras se trabaja en una rama no se suele prestar mucha atención a como está
quedando el registro. Es normal, estamos concentrados en la tarea. Para cuando
el trabajo termina, es hora de ordenar el registro. Acumular todos esos innecesarios
*commits* puede dar la impresión de que sufrimos de un caso agudo de
síndrome de diógenes.

```bash
259aff2 (HEAD -> A) body edit
7a48555 wip: body content
71a621b A file updated
2dc6065 new A file
d9ad32e (master) A new commit is introduced while previous changes are in stash
13b16a5 Revert "README updated"
76a1097 Demo file updated
a31e004 README updated
44d4c5b New README file
ee42779 New demo file
```

El registro superior muestra un listado histórico donde la rama *master* (*d9ad32e*)
y el *HEAD* (*259aff2*) local apuntan a *commits* diferentes. Excepto el primer
*commit* (*2dc6065*) el resto de mensajes son redudantes o no son descriptivos.
Dado que cada *commit* se refiera a la misma funcionalidad, la solución más
adecuada es usar el comando `rebase` para agrupalos todos en un único *commit*.

`rebase` no es solo una forma alternative de hacer *merge*. En realidad, la función 
principal del comando es la de reescribir el registro de *git*. Con esta idea en
mente, `rebase` se puede usar en una misma rama. En lugar de especificar un
nombre de rama, un identificador de commit puede ser usado. De hecho, un nombre
de rama no es más que un nombre significativo que apunta a un commit en concreto.

Otra propiedad interesante de `rebase` es que puede ser ejecutado de manera
automática o interactiva pasando la opción `-i`.  El modo interactivo ofrece 
la posibilidad de reordenar el registro actuando sobre cada *commit* con una
acción específica.

```bash
g rebase -i d9ad32e
```

Tras lanzar el comando previo, aparce el editor por defecto abriendo el archivo
mostrado más abajo. En mi caso *vim* es el editor por defecto pero tú puedes
cofigurar el tuyo usando la opción de configuración [core.editor][coreditor]. 

```bash
reword 2dc6065 new A file
fixup 71a621b A file updated
fixup 7a48555 wip: body content
fixup 259aff2 body edit

# Rebase d9ad32e..259aff2 onto d9ad32e (4 commands)
...
```

Por razones de brevedad se ha omitido la parte inferior del fichero, un resumen
sobre que hace cada comando.

`fixup`, o `f` para abreviar, combina en bloque los *commits* marcados al previemente
seleccionado (*2dc6065*). A diferencia de `squash`, `fixup` no reutiliza el
mensaje facilitado.

`reword` permite reescribir el mensaje asociado al commit mientras mantiene
el mismo en el registro.

`rebase` ejecuta las acciones descritas tras guardar y cerrar el editor.
En este caso, cuando la tarea ha sido completada, el editor salta de nuevo
para poder introducir la nueva descripción del *commit*

Una vez el *rebase* ha terminado, el registro debería parecerse al mostrado abajo.
Los commits entre *2569f57* y *d9ad32e* han sido includios en el primero.

```bash
2569f57 (HEAD -> A) feature A
d9ad32e (master) A new commit is introduced while previous changes are in stash
13b16a5 Revert "README updated"
76a1097 Demo file updated
a31e004 README updated
44d4c5b New README file
ee42779 New demo file
```

## Montones de commits relacionados

A veces ocurre el tener una idea repentina mientras se está trabajando en otro
asunto totalmente distinto. Dejas lo que estás haciendo y te pones manos a la
obra con la nueva idea. ¡Maldita serendipia!

Los siguientes pasos a seguir en git son (1) guardar cambios y (2) crear una
nueva rama desde *master*. Ahora ya podemos trabajar en cualquier cosa que sea
esa brillante idea. El bucle *git* ha empezado: Cambios. Testear. Guarder
progreso. Y de vuelta al inicio del bucle hasta que la tarea esté acabada.

Por último volveremos a trabajar en la rama inacabada y el mismo bucle se
repite.

Muchos *commits* son creados durante este proceso. La mayor parte (sino todos)
pertencen a la misma tarea. ¿Por qué todos estos *commits* cuando en realidad
uno solo por rama sería suficiente? ¿No es más fácil buscar en un registro por
commit con una descripción clara y concisa que hacerlo entre un montón de *commits*
diferentes? ¿Están todos en el mismo bloque? ¿Han quedado entrelazados entre
*commits* no relacionados?

Está claro que podemos seleccionar y unir *commits* haciendo un *rebase* sobre la
propia rama pero ¿para que molestarse cada vezc cuando realmentes ya sabemos que
todo pertenecen al mismo conjunto? ¿Por qué no fusionarlos con en el primer
commit de la rama? Pues que sepas que sí se puede hacer.

Veamos ques es la propiedad *autosquash*.

## *Autosquash* (o cómo mantener un registro claro mientras se trabaja)

```bash
1a9bfea (HEAD -> A) New A file
d9ad32e (master) A new commit is introduced while previous changes are in stash
13b16a5 Revert "README updated"
76a1097 Demo file updated
a31e004 README updated
44d4c5b New README file
ee42779 New demo file
```

Tras el primer *commit* de la rama *A* (*1a9bfea*), podemos intuir que vamos a trabajar 
todo el tiempo en un mismo archivo, o relacionados. Por tanto los siguientes *commits*
pueden ser forzados para formar parte de ese mismo primer registro usando la opción
`--fixup`.

```bash
git commit --fixup=1a9bfea
```

Como recordarás *fixup* es una de las acciones disponibles que ofrece el comando
`rebase`. De la misma manera, la ocpción *fixup* permite unir el *commit* que se
está llevando a cabo junto al indicado. Tras la ejecución veríamos el siguente
registro.

```bash
4cca556 (HEAD -> A) fixup! New A file
1a9bfea New A file
d9ad32e (master) A new commit is introduced while previous changes are in stash
13b16a5 Revert "README updated"
76a1097 Demo file updated
a31e004 README updated
44d4c5b New README file
ee42779 New demo file
```

¿Te has fijado en el prefijo «fixup!» en el último *commit*? También el mensaje
es el mismo que el del registro anterior. ¡Un momento! No se suponía que debían
unirse ambos *commits*? Sí, es cierto. Pero no te preocupes demasiado por esto.
Es imperativo que los cambios queden registrados, en caso contrario podrían
perderse para siempre. Más tarde veremos como fusionarlos.

Hay otra forma de hacer *fixup* (que traducido sería algo así como «arreglar»).
En vez de proporcionar un identificador de *commit*, se puede buscar a través
de los mansajes asociados a un *commit* mediante un texto coincidente. El primer
resultado será usado como punto de entrada.

```bash
git commit —fixup=:/A\ file
```

Ahora, supongamos que modificamos y registramos el archivo *README*. Luego
trabajamos en el mismo archivo previo y lo registramos con la opción
*fixup* de nuevo. El registro resultante debería ser algo parecido al mostrado
a continuación.

```bash
1e0118e (HEAD -> A) fixup! fixup! fixup! New A file
6991e75 README updated
72f1297 fixup! fixup! New A file
4cca556 fixup! New A file
1a9bfea New A file
d9ad32e (master) A new commit is introduced while previous changes are in stash
13b16a5 Revert "README updated"
76a1097 Demo file updated
a31e004 README updated
44d4c5b New README file
ee42779 New demo file
```

Llegados a este punto, la rama ya ha sido completada. Es hora de hacer *rebase*
desde donde se estableció la nueva rama. El commit de referencia es *d9ad32e*.

```bash
git rebase -i —-autosquash d9ad32e 
```

La propiedad `--autosquash` mueve automáticamente cada uno de los *commits*
con el prefijo «fixup!» justo después del registro inmediato al proporcionado
en el *rebase*.

```bash
pick 7eadcf3 New A file
fixup c913bb3 fixup! New A file
fixup e8bd977 fixup! fixup! New A file
fixup 77ca177 fixup! fixup! fixup! New A file
pick e8fe7f6 README updated

# Rebase d9ad32e..77ca177 onto d9ad32e (5 commands)
...
```

Podemos observar como *git* ha reemplazado automáticamente el comando *pick* por
*fixup*. *git* sabe como proceder porque anteriormente hemos marcado los
*commits* para ser fusionados con el registro seleccionado. El orden específico
se garantiza añadiendo un nuevo prefijo «fixup!» en el mensaje del *commit*.
Por cada nuevo prefijo se incrementa su posición en la cola.

Después de guardar y cerrar el fichero, *rebase* se ejecuta y el resultado del
registro es el siguiente.

```bash
d571d6c (HEAD -> A) README updated
8e078dd New A file
d9ad32e (master) A new commit is introduced while previous changes are in stash
13b16a5 Revert "README updated"
76a1097 Demo file updated
a31e004 README updated
44d4c5b New README file
ee42779 New demo file
```

En vez de unir toda la rama a un mismo registro, he preferido dejar cada archivo
en un único e independiente *commit*. De estas manera hemos podido ver como usar
*autosquash* en un caso más práctico.

## Aplastando ramas en *master*

El último método que vamos a ver sobre como *aplastar* (sí, es la traducción para
*squash*) *commits* no útiles (que no inútiles) puede hacerse pasando la opción
`--squash` cuando se ejecuta el comando `merge`.

```bash
* d571d6c - (A) README updated (23 hours ago) <Enrique Arias>
* 8e078dd - New A file (23 hours ago) <Enrique Arias>
| * 1ac6aff - (B) B file updated (5 days ago) <Enrique Arias>
| * d657116 - new B file (5 days ago) <Enrique Arias>
|/
* d9ad32e - (HEAD -> master) A new commit is introduced while previous changes are in stash (2 weeks ago) <Enrique Arias>
* 13b16a5 - Revert "README updated" (3 weeks ago) <Enrique Arias>
* 76a1097 - Demo file updated (3 weeks ago) <Enrique Arias>
* a31e004 - README updated (3 weeks ago) <Enrique Arias>
* 44d4c5b - New README file (3 weeks ago) <Enrique Arias>
* ee42779 - New demo file (3 weeks ago) <Enrique Arias>
```

Observando el registro actual, vemos que la rama *A*, *B* y *master* apuntan
a los identificadores de *commits* *d571d6c*, *1ac6aff* y *d9ad32e*, respectivamente.
Decidimos que ya es hora de unir *A* y *B* en *master* pero no queremos mantener
los commits actuales de las ramas derivadas. Recuerda que estos ejemplos son meramente 
divulgativos, en el mundo real lo más probable es que al menos se preservase
un commit por rama con el fin de mantener al menos un registro sucinto pero
completo.

Fusionemos primero la rama *B*.

```bash
git merge --squash B
```

Si volvemos a ver el *log*, no encontraremos rastro de un nuevo *commit* y es que
`merge --squash` no completa la operación. En este caso los cambios de la rama
*B* quedan registrados en el área de *stage* dejando al usuario el *commit*
pendiente. Estando así la cosa, pasemos a fusionar también la rama *A* con la
opción `--squash` y hagamos *commit*.

```bash
git merge --squash A && git commit
```

En el registro resultante no hallaremos rastro alguno de los *commits* individuales
de las ramas *A* y *B* en *master*. Solo un *commit* representa todos los cambios
realizados en cada rama.

```bash
* ee34439 - (HEAD -> master) Squashed commit of the following: (12 seconds ago) <Enrique Arias>
| * d571d6c - (A) README updated (23 hours ago) <Enrique Arias>
| * 8e078dd - New A file (23 hours ago) <Enrique Arias>
|/
| * 1ac6aff - (B) (B) B file updated (5 days ago) <Enrique Arias>
| * d657116 - (B) new B file (5 days ago) <Enrique Arias>
|/
* d9ad32e - A new commit is introduced while previous changes are in stash (2 weeks ago) <Enrique Arias>
* 13b16a5 - Revert "README updated" (3 weeks ago) <Enrique Arias>
* 76a1097 - Demo file updated (3 weeks ago) <Enrique Arias>
* a31e004 - README updated (3 weeks ago) <Enrique Arias>
* 44d4c5b - New README file (3 weeks ago) <Enrique Arias>
* ee42779 - New demo file (3 weeks ago) <Enrique Arias>
```

La última cosa que queda por hacer es eliminar la ramas sobrantes. Una vez
fusionadas, ya no hay más necesidad de ellas.

Y este es el resultado final del registro sin ramas aledañas.

```bash
* ee34439 - (HEAD -> master) Squashed commit of the following: (12 hours ago) <Enrique Arias>
* d9ad32e - A new commit is introduced while previous changes are in stash (3 weeks ago) <Enrique Arias>
* 13b16a5 - Revert "README updated" (3 weeks ago) <Enrique Arias>
* 76a1097 - Demo file updated (3 weeks ago) <Enrique Arias>
* a31e004 - README updated (3 weeks ago) <Enrique Arias>
* 44d4c5b - New README file (3 weeks ago) <Enrique Arias>
* ee42779 - New demo file (3 weeks ago) <Enrique Arias>
```

Espero que estos consejos sobre usar *git* para mantener un registro incremental,
comprensible y sucinto te sean de ayuda. Quizás pueda no parecer demasiado
importante conservar un registro ordenado pero, creeme, le estarás haciendo un
favor al tipo que gestione el repositorio *git* del proyecto. Te esterá eternamente
agradecido. Por otro lado, siguiendo estas prácticas a diario tendrán un impacto 
positivo en tu carrera profesional. Así que no tengas un registro desordenado,
deja que el trabajo hable por ti.

[coreditor]: https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration#_code_core_editor_code

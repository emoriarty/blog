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

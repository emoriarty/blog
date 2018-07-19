---
title: "Pure Function"
date: 2018-03-20 01:00:00 +0100
excerpt: Las funciones puras permiten construir aplicaciones más robustas gracias a su carácter inmutable. También ofrecen una gran reusabiliad.
permalink: /pure-function
tags: [programacion-funcional, diseño, patrones, terminos-informaticos]
---
La programación funcional es un término que en los últimos años ha tomado cierta relevancia en el mundo de la programación. También otros paradigmas como concurrencia fiable o componentización están en boga. Todos estos conceptos tienen su base en una serie de patrones y cualidades del lenguaje que los hacen posibles. Entre estos pautas se encuentran las funciones puras.

Una **función pura** no es más que una función que recibe un valor y devuelve siempre el mismo resultado en base a un cálculo. Hay un tipo de función basada en la [mónada identidad][identity] donde este cálculo es inexistente, retornando el mismo valor de entrada, pero esto es otro tema.

Otro aspecto importante es que la ejecución de una función no tenga ningún tipo de efecto secundario sobre el estado global del programa. Esto evita comportamientos inesperados que podrían derivar en errores de difícil hallazgo.

Aunque antes de profundizar en las características que ofrece este tipo de funciones, valdría la pena saber exactamente de donde proceden. Para ello hay que volver a abrir esos polvorientos apuntes de matemáticas que siempre pensaste que no servirían de nada.

## Origen

Como antes mencioné, el origen de las funciones se encontra en las matemáticas. Principalmente en cálculo analítico y álgebra. La definición general propuesta es la siguiente.

> El concepto general de Función, aplicación o mapeo se refiere a una regla que asigna a cada elemento de un primer conjunto un único elemento de un segundo conjunto <sup><a href="{{ page.permalink | relative_url }}#quote-1">1</a></sup>.

A continuación se muestra otra interpretación diferente.

> Una función es una relación especial entre valores. Cada valor de entrada devuelve el mismo valor de salida.

Según estas dos explicaciones, si una determinada función recibe como valor de entrada 1 y devuelve 2, se espera que cada vez que reciba un valor 1 deberá retornar siempre el mismo valor de salida esperado: 2. Lo mismo ocurrirá con cualquier otro combinación.

Si atendemos a la primera descripción, veremos que una función también se puede llamar aplicación o mapeo. Este último nombre dado ofrece una imagen clara de lo que debería ser una función tanto en matemáticas como en programación. Por mapeo entendemos una relación unívoca entre distintos elementos.

<table class="table-half arrows-table">
<tr>
<td>1 => 2</td>
</tr>
<tr>
<td>2 => 4</td>
</tr>
<tr>
<td>3 => 6</td>
</tr>
<tr>
<td>4 => 8</td>
</tr>
</table>

Como puede observarse en la tabla, cada elemento de la columna izquierda tiene su único equivalente en la columna derecha. Esta relación también se puede expresar mediante la siguiente función matemática.

{% highlight shell %}
f(x) = x·2
{% endhighlight %}

A todos nos sonará la expresión anterior de cuando estudiábamos en el instituto. Pues bien, en programación se definiría de una manera no mucho más diferente.

{% highlight javascript %}
const f = x => x * 2;
{% endhighlight %}

La función de este ejemplo está escrita en Javascript. En lo referente a funciones no importa el lenguaje utilizado, si bien alguna pequeña particularidad pueda haber entre ellos, a todos los efectos aplica el mismo concepto.

Siguiendo con los ejemplos anteriores, en ambos casos si el valor utilizado de la columna izquierda se pasa como argumento a la función, el resultado será el valor adyacente a la derecha. Cualquier otro valor devuelto no cumpliría con la descripción de una función para esa tabla.

Otra de la características de las funciones en matemáticas es su representación cartesiana. El valor de entrada (x) suele corresponder a la horizontal del plano, mientras que el resultado (y) pertenece a su vertical. Una relación como en la tabla anterior genera una línea recta en el gráfico cartesiano (x, y). A esta función se la nombra función lineal.

{% progressive_picture
  thumbnail: /assets/pure-function-1.thumb.jpg 
  src: /assets/pure-function-1.jpg
  height: 1244 
  width: 1238
  alt: 'Función lineal sobre plano cartesiano.'
  class: 'picture-shrink' %}

Aunque en raras ocasiones generamos este tipo de gráficos, la capacidad de interpretar estos valores como componentes que conforman un gráfico permite conceptualizar estos resultados en otros ámbitos. En programación funcional a esta relación entre x e y también se le llama morfismo. Lo cual no es más que otra forma de describir como un conjunto de valores es mapeado a otro conjunto.

Que el origen de las funciones esté en las matemáticas, no significa que uno deba haber obtenido un doctorado para entenderlas. Si es cierto que es recomendable tener un conocimiento mínimo en la materia. En ciertas ocasiones podrías encontrarte con algún problema de solución matemática y no saber resolverlo por no tener el bagaje necesario.

La gran diferencia entre ambas disciplinas estriba en que las funciones en matemáticas sirven exclusivamente a un solo propósito. En programación pueden tener diferentes usos. En la mayoría de las ocasiones se utilizan para realizar procesos completos, que por su naturaleza arbitraria permite la ausencia o presencia múltiple de parámetros. También puede devolver diferentes resultados en base a un mismo argumento. Esta cualidad procedimental de las funciones es la que se pretende evitar mediante programación funcional. Para ello se acuñó el término función pura, que no es más que el uso específico de la funciones sea el mismo que en matemáticas.

¿Y qué beneficio aporta una función pura ante una convencional? Podrías estar preguntándote. Para responder a esta pregunta, se expone más abajo una serie de características que muestran porqué favorecer el uso este tipo de funciones.

## Cacheable

Ahora sabemos que en base a un valor de entrada, una función pura siempre devuelve el mismo resultado. Podemos aprovechar esta cualidad para almacenar en memoria el resultado, utilizando el argumento como identificador. Cada vez que se invoque la misma función, con un parámetro previamente utilizado, devolverá el resultado almacenado. De esta forma se mejora el rendimiento de una función, evitando repetir el mismo cálculo cuando se conoce de antemano el resultado para un dato de entrada.

A esta técnica de optimización se la conoce en programación como _[memoization][memoization]_ (o _memoisation_ en inglés de las islas).

{% highlight javascript %}
const memoize = f => {
  const cache = {}
  return (...args) => {
    const cacheId = JSON.stringify(args);
    cache[cacheId] = cache[cacheId] || f(...args);
    return cache[cacheId];
  };
};
{% endhighlight %}

La función anterior espera recibir una función {% ihighlight javascript %}f{% endihighlight %} como argumento. Una vez ejecutada devuelve una función anónima que contiene la operación de cacheo. Esta nueva función, a partir del conjunto de argumentos recibido, crea el identificador de almacenamiento en la variable {% ihighlight javascript %}cacheId{% endihighlight %}. Si el contenido de esta variable tiene asociado un valor en el objeto {% ihighlight javascript %}cache{% endihighlight %}, devuelve el resultado anteriormente calculado. En caso contrario, ejecuta la función original y se guarda el producto obtenido junto al nuevo identificador en el objeto {% ihighlight javascript %}cache{% endihighlight %}.

{% highlight javascript %}
const by2 = x => x*2
const cachedBy2 = memoize(by2)
cachedBy2(2) // 4
cachedBy2(2) // 4 returned from cache object
cachedBy2(4) // 8
cachedBy2(4) // 8 returned from cache object
{% endhighlight %}

No solamente se puede almacenar resultados de tipo primitivo. También tienen cabida objetos, _arrays_ incluso otras funciones (realmente éstas no dejan de ser un tipo de objeto específico).

{% highlight javascript %}
const fetchBooksByGenre = url => () => fetch(url, { genre: genre }) 
const fetchThrillerBooks = memoize(fetchBooksByGenre('/api/books/by/thriller'))
const fetchBioBooks = memoize(fetchBooksByGenre('/api/books/by/bio'))
{% endhighlight %}

Las funciones anteriores no es que sean la mar de útiles. En cierto modo cada vez que se vaya a conformar una función por género ya almacenada, será devuelta desde cache.

## Portabilidad

Se considera que una función es portable cuando su contexto queda totalmente aislado. Ninguna referencia externa es necesaria para su funcionamiento, a excepción de las suministradas mediante argumentos. La ventaja que ofrece este tipo de función autocontenida es que se puede transportar de un proyecto a otro sin necesidad de modificación.

{% highlight javascript %}
// forma impura
const newBook = (args)  =>{
  try {
    const book = saveBook(args);
    notifySuccess(book);
  } catch (error) {
    notifyError(error);
  }
};

// forma pura
const newBook = (db, email, bookAttrs)  =>{
  try {
    const book = saveBook(db, bookAttrs);
    notifySuccess(email, book);
  } catch (error) {
    notifyError(email, error);
  }
};

{% endhighlight %}

En este ejemplo se puede ver la misma función en su variante pura e impura. Mientras que la versión impura sólo recibe un argumento con los valores para crear un nuevo libro, la segunda incluye también una conexión a base de datos y un email dónde notificar la acción llevada a cabo o el error ocurrido.

Aunque en apariencia la diferencia es poca cosa, varias lecturas surgen con este pequeño cambio.

En el caso de la función pura es mucho más informativa puesto que se revela su propósito desde la misma firma del contrato. Al contrario que la impura que dificulta si comprensión al ocultar estos detalles.

Por otro lado, al haber parametrizado los clientes de base de datos y correo se ha creado una función mucho más flexible que la anterior. Si por algún motivo se debe cambiar la base de datos, pues se transfiere un nuevo cliente a la función y listo.

También se puede utilizar en otros proyectos que requieran la misma funcionalidad, solo habría que copiar y pegar el código.

Incluso si el tipo de lenguaje lo permite, como es el caso de Javascript, una función así podría ser serializada y enviarse a través de un socket para terminar siendo ejecutada remotamente.

## Inmutabilidad

Una de las condiciones indispensables para construir un sistema robusto, es evitar las alteraciones inesperadas de sistema. Todo programa mantiene un estado global compartido entre los diferentes objetos que lo componen. Las interacciones entre ellos, o con el exterior, modifican este estado que termina reflejándose entre las distintas partes del sistema. Estos cambios conforman el flujo esperado del programa y cualquier mutación no controlada puede convertirse en _bugs_ de difícil localización.

Un caso muy concreto de este tipo de errores ocurre cuando se transfiere una variable a una función. No es su valor lo que recibe la función sino su referencia. Una dirección que apunta donde se encuentra el contenido de la misma. Cualquier acción llevada a cabo sobre esta variable que modifique su valor, se verá reflejado en otra parte del sistema que esté utilizando esa misma referencia.

Este efecto secundario, en ocasiones esperado, suele ser fuente de problemas. Para prevenir estas situaciones es mejor generar una nuevo resultado a partir de la variable proporcionada.

Un efecto secundario no es solo la modificación de una variable. También lo es lanzar excepciones, llamar a otras funciones desde una otra función, leer o escribir datos en disco,  acceso a base de datos, accesos a otras redes, datos introducidos por un usuario. Si pretendemos evitar todas estas acciones obtendremos el programa más robusto del mundo. Aunque en su contrapartida no sería más que una caja estanca que no sirve para nada.

Puesto que restringir todos los efectos secundarios en la práctica es inviable, al menos podemos contenerlos evitando mutaciones innecesarias. De esta manera se minimizaría su impacto en el estado del sistema.

Como ya se ha apuntado antes, la mejor forma de prevenir estas mutaciones en una función es no modificar los parámetros de entrada. Tan solo se deben utilizar para realizar la operación propuesta y devolver un nuevo valor.

Incluso en sistemas que permiten la ejecución multihilo, esta condición de inmutabilidad posibilita la ejecución en paralelo de una misma función. De esta manera se evitan situaciones que podrían derivar condiciones de [secuencia (race condition)][race-condition] al haber alterado la memoria compartida.

## Transparencia referencial

Se llama transparencia referencial a la circunstancia que permite sustituir el nombre de la función (su llamada) por el cuerpo de la misma sin alterar el comportamiento del programa.

Puesto que la condición indispensable de una función pura es que siempre devuelva el mismo valor de salida para un mismo dato de entrada, podemos considerar que se cumple esta propiedad si el intercambio de ambas partes no falla.

Pongamos por ejemplo el siguiente fuente.

{% highlight javascript %}
const library = [];
const book = { isbn: '9788433920638', title: 'Post Office', author: 'Charles Bukowski' };

const rateBook = (book, stars) =>
  Object.assign(book, { rate: stars });

const finishBook = book =>
  Object.assign(book, { finished: true });

const findBookIndex = (library, isbn) =>
  library.findIndex(bookItem => bookItem.isbn === isbn);

const findBook = (library, isbn) =>
  library[findBookIndex(library, book)];

const isBookPresent = (library, book) =>
  findBook(library, book.isbn) !== undefined;

const addBookToShelve = (library, book) =>
  !isBookPresent(library, book)
    ? Array.prototype.concat.call(library, Object.assign(book))
    : library;

console.log(addBookToShelve(library, rateBook(finishBook(book), 5)));
{% endhighlight %}

Todas las funciones son supuestamente puras. Si no fuera así la sustitución de la llamada por el contenido no funcionará.

Si observamos la última línea encontramos tres llamadas a función anidadas entre si. Para poder comprobar si son transparentemente referenciales (ojo al vocablo) sustituyamos la más interna (la primera en ejecutarse) en la secuencia: {% ihighlight javascript %}finishBook{% endihighlight %}. Pero antes estructuremos un poco más el código para ver mejor el cambio realizado.

{% highlight javascript %}
addBookToShelve(
  library,
  rateBook(
    finishBook(book),
    5
  )
);
{% endhighlight %}

Sustituyendo finishBook por su contenido quedaría como se muestra a continuación.

{% highlight javascript %}
addBookToShelve(
  library,
  rateBook(
    Object.assign(book, { finished: true }),
    5
  )
);
{% endhighlight %}

Si ejecutamos el código anterior deberá seguir funcionando como se espera. Ahora le toca el turno a la función {% ihighlight javascript %}rateBook{% endihighlight javascript %}.

{% highlight javascript %}
addBookToShelve(
  library,
  Object.assign(
    Object.assign(book, { finished: true }),
    { rate: 5 }
  )
);
{% endhighlight %}

Y así podríamos seguir hasta haber sustituido todas las funciones.

Obviamente esta no es una práctica que vayamos a utilizar para comprobar todo el fuente en cualquier proyecto medianamente grande. El resultado final podría ser un galimatías muy serio. Por tanto, la transparencia referencial, no tiene mayor utilidad que durante el proceso de desarrollo. Nos permite poder comprobar el comportamiento, fiabilidad y pureza de una función en base al intercambio de su cuerpo por la llamada.

No sería un mal ejercicio completar  por tu cuenta el intercambio de llamadas a función por su contenido. Cuando lo tengas hecho comprueba que el resultado sea el mismo que cuando se ejecutó el fuente original.

{% highlight javascript %}
[{
  isbn: "9788433920638",
  title: "Post Office",
  author: "Charles Bukowski",
  finished: true,
  rate: 5
}]
{% endhighlight %}

## Testing

Puesto que una función pura no depende de ningún tipo de recurso externo, facilita su ejecución en cualquier tipo de contexto. Este carácter independiente permite probar una función sin necesidad de simular el entorno ni el uso de terceros ni grandes configuraciones. Solamente deberemos proveer el valor (o valores) necesario de entrada y comprobar su resultado.

Continuando con el ejemplo anterior, para comprobar que la función {% ihighlight javascript %}addBook{% endihighlight %} añade un libro correctamente, podemos crear un archivo similar al mostrado a continuación.

{% highlight javascript %}
import addBook from '../src/addBook';

const mockedBook = { title: 'Mocked title', author: 'Mocked author' };
const mockedLibrary = [];
addBook(mockedLibrary, mockedBook).includes(mockedBook)
  ? success('Adds book to library successfully')
  : fail('Book is not being added');
{% endhighlight %}

Lógicamente lo más interesante es poder generar informes con todas las pruebas, así que lo suyo sería utilizar una librería que simplifique esta labor. Por ejemplo, podemos usar _[tape][tape]_ como solución sencilla u otra más completa como _[jest][jest]_.

El auge de la programación funcional también está influyendo en campos como el _[testing][generative-testing]_. Una de las propuestas más prometedoras se llama generative testing. Este nuevo enfoque se basa en la generación automática de los argumentos de entrada. A diferencia del método tradicional, basado en suposiciones comunes, mediante esta técnica se pretende identificar los casos de uso no contemplados y así poder completar el alcance de una función.

Recuerda que este tipo estrategia no son sustitutivas. Sin embargo usadas en combinación pueden aportar grandes beneficios.

## Conclusión

No he redactado todas la cualidades que ofrecen las funciones puras. He elegido aquellas que he considerado más oportunas en base a su uso más práctico durante el desarrollo diario. Espero que tras haber leído el artículo comprendas los beneficios que aporta el uso de funciones puras y cuándo utilizarlas.

Es importante remarcar que este patrón se utiliza principalmente bajo un marco funcional. Esto no significa que no podamos utilizarlo en contextos más imperativos. De hecho la cualidad más importante, como se ha apuntado anteriormente, es la independencia ante cualquier tipo de paradigma.

Así que a qué esperas, cada vez que tengas la oportunidad, sin importar el lenguaje que utilices, favorece este tipo de función. A la larga comprobarás que es más práctico.

## Referencias

<ul>
  <li id="quote-1">
    <a href="https://es.wikipedia.org/wiki/Función_matemática">
      Extraído del artículo función matemática de la wikipedia.
    </a>
  </li>
</ul>

## Fuentes

* [mathsisfun.com/sets/function.html](http://www.mathsisfun.com/sets/function.html)
* [wikiwand.com/es/Funci%C3%B3n_matem%C3%A1tica](https://www.wikiwand.com/es/Funci%C3%B3n_matem%C3%A1tica)
* [wikiwand.com/en/Functional_programming](https://www.wikiwand.com/en/Functional_programming)
* [medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976)
* [wikiwand.com/en/Pure_function](https://www.wikiwand.com/en/Pure_function)
* [https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions](https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c)
* [medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-1](https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-1-1f15e387e536)
* [drboolean.gitbooks.io/mostly-adequate-guide-old/content/ch3.html](https://drboolean.gitbooks.io/mostly-adequate-guide-old/content/ch3.html)
* [github.com/getify/Functional-Light-JS/blob/master/manuscript/ch2.md/#chapter-2-the-nature-of-functions](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch2.md/#chapter-2-the-nature-of-functions)
* [henrikeichenhardt.blogspot.com.es/2013/06/why-shared-mutable-state-is-root-of-all.html](http://henrikeichenhardt.blogspot.com.es/2013/06/why-shared-mutable-state-is-root-of-all.html)

[identity]: https://es.wikipedia.org/wiki/M%C3%B3nada_(programaci%C3%B3n_funcional)?oldformat=true#M%C3%B3nada_identidad
[memoization]: https://www.interviewcake.com/concept/java/memoization
[race-condition]: https://www.wikiwand.com/es/Condici%C3%B3n_de_carrera
[generative-testing]: https://medium.com/javascript-inside/generative-testing-in-javascript-f91432247c27
[tape]: https://github.com/substack/tape
[jest]: https://facebook.github.io/jest/

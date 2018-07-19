---
title: "Principio de responsabilidad única"
date: 2018-03-29 06:00:00 +0100
excerpt: Parte de un buen diseño se debe a la utilización de varios patrones durante el desarrollo de un programa. Uno de lo más útiles y fáciles de implementar es el principio de responsabilidad única.
permalink: /principio-responsabilidad-unica
tags: [programacion-funcional, diseño, patrones, terminos-informaticos]
---
En un [artículo anterior][pure-function] tratábamos el tema de las funciones puras. El texto introduce de manera implícita el concepto de responsabilidad única sin apenas profundizar en él. Entender la importancia de esta patrón de diseño me ha parecido lo suficientemente interesante como para dedicarle un _spin-off_.

Si consideramos las funciones puras como los bloques fundamentales sobre los que construir un programa, es de esperar que éstos sean lo más robustos posible. La fiabilidad de estos elementos no solo serán testadas minuciosamente sino que también se construirán siguiendo una serie de patrones.

Entre estos patrones se encuentra el [principio de responsabilidad única][srp] o _SRP_ (_single responsible principle_) en sus siglas inglesas. Según esta norma no se permite que una función tenga mayor propósito que el indicado. Es decir, si su cometido es capitalizar todas las letras de un texto, solo ejecuta esa tarea exclusivamente, cualquier otra acción debe que se derive de este proceso debe ser extraído a otra función. Mediante este diseño se pretende evitar los posibles comportamientos inesperados de una función multipropósito.

{% highlight javascript %}
const showBookPreview = book => {
  const title = `${book.title.charAt(0).toUpperCase()}${book.title.slice(1)}`;
  const firstName = `${book.author.name.first.charAt(0).toUpperCase()}${book.author.name.first.slice(1)}`;
  const middleName = book.author.name.middle
    ? `${book.author.name.middle.charAt(0).toUpperCase()}${book.author.name.middle.slice(1)}`
    : '';
  const lastName = `${book.author.name.last.charAt(0).toUpperCase()}${book.author.name.last.slice(1)}`;
  const firstChapter = book.chapters[0];
  let excerpt = firstChapter.slice(0, 1000);

  return `\
    <article>\
      <header>\
        <h2>${title}<h2/>\
        <p>${firstName} ${middleName} ${lastName}</p>\
      </header>\
      <p>${firstChapter.length > 1000 ? excerpt.concat('...') : excerpt}</p>\
    </article>`
};
{% endhighlight %}

Es evidente al ver el ejemplo anterior que la función cumple pocas convenciones además de contener varias operaciones claramente diferenciadas. Por lo tanto showBookPreview está imcumpliendo el patrón de responsabilidad única.

Aunque yo haya escrito el ejemplo, hace tantas cosas el cuerpo de esta función que me cuesta seguirla y eso que no es más que manipular un texto y generar un nuevo resultado. Nada del otro mundo. El código podría complicar aún más si se ampliase su funcionalidad mediante accesos a BBDD, llamadas a API, resultados asíncronos, etcétera. Si a esto le sumamos la falta de familiaridad pasado un tiempo sin trabajar sobre el fuente, me encontraré a mí mismo intentando descifrar que hace exáctamente la susodicha con la consecuente pérdida de tiempo. Ni cabe que decir que cualquier otro que la encuentre por primera vez invertirá más tiempo que el propio autor. A la larga este tipo de funciones hormonadas terminan teniendo un impacto negativo en la productividad del equipo. Incluso aunque esté formado por un solo desarrollador. Hay un término que aunque su contexto sea más amplio sirve a la perfección para denominar este tipo de fuente: [código espagueti][spaghetti].

Una pregunta que puede surgir en referencia a esta función es ¿Qué pasa si necesitamos presentar la vista preliminar en otro formato? Por lo visto tendremos que crear otra función que haga lo mismo aunque variando el formato devuelto. Obviamente no es la solución idónea. Estaríamos duplicando el mismo proceso en distintas partes del programa. Esto conlleva un mayor mantenimiento además de imcumplir otro principio tan importante como DRY (_Don’t Repeat Yourself_) o simplemente [no te repitas][dry].

Debido a un diseño pobre esta función está mal construida desde su base. Para solucionarlo vamos a utilizar el patrón que estamos tratando en el artículo. Lo primero que debemos hacer es localizar las distintas operaciones que se efectúan en la función. Una vez localizadas las extraeremos en sus respectivas funciones.

Lo primero que nos interesa es poder presentar la vista previa del libro en diferentes formatos. Esta acción transformadora se lleva a cabo en la parte inferior del cuerpo, justo donde empieza la cláusula return. Una aproximación de esta [separación de conceptos][soc] (SoC) sería la siguiente.

{% highlight javascript %}
const getBookExcerpt = book => {
  const title = `${book.title.charAt(0).toUpperCase()}${book.title.slice(1)}`;
  const firstName = `${book.author.name.first.charAt(0).toUpperCase()}${book.author.name.first.slice(1)}`;
  const middleName = book.author.name.middle
    ? `${book.author.name.middle.charAt(0).toUpperCase()}${book.author.name.middle.slice(1)}`
    : '';
  const lastName = `${book.author.name.last.charAt(0).toUpperCase()}${book.author.name.last.slice(1)}`;
  const firstChapter = book.chapters[0];
  let excerpt = firstChapter.slice(0, 1000);

  return {
    title,
    author: `${firstName} ${middleName} ${lastName}`,
    excerpt: firstChapter.length > 1000 ? excerpt.concat('...') : excerpt
  }
};
{% endhighlight %}

Bien, ahora tenemos una función que tan solo devuelve un objeto con el extracto del libro. Todavía no cumple el principio de responsabilidad única al completo y sigue siendo ilegible pero al menos ya podemos decir que es reutilizable. El siguiente paso es crear la función que transforme el objeto en HTML.

{% highlight javascript %}
const toHTML = bookExcerpt => `\
  <article>\
      <header>\
        <h2>${bookExcerpt.title}<h2/>\
        <p>${bookExcerpt.author}</p>\
      </header>\
      <p>${bookExcerpt.excerpt}</p>\
  </article>
{% endhighlight %}

A diferencia de {% ihighlight javascript %}getBookExcerpt{% endihighlight %}, {% ihighlight javascript %}toHTML{% endihighlight %} si cumple con el principio de responsabilidad única. Su sola operación es formatear el dato entrante y devolver el resultado. Combinando las dos funciones obtendremos el siguiente código.

{% highlight javascript %}
toHTML(getBookExcerpt(book));
{% endhighlight %}

Además de haber reducido los cuerpos de las funciones, la combinación de éstas resulta en una llamada mucho más compresible. De hecho no tendría necesidad de acudir a la implementación de cada para entender exactamente qué está ocurriendo: a partir de un libro se extrae un fragmento y se transforma a HTML. Más claro, agua.

Otra de las ventajas que resultan de esta práctica es que ahora es más fácil ampliar el alcance del programa. Si surge la necesidad de devolver el fragmento del libro en distintos formatos tan solo habría que crear las funciones correspondiente para cada caso. El único requisito es que acepten el objeto devuelto por {% ihighlight javascript %}getBookExcerpt{% endihighlight %}.

{% highlight javascript %}
const toYAML = bookExcerpt => `
  title: ${bookExcerpt.title}
  author: ${bookExcerpt.author}
  exceprt: ${bookExcerpt.excerpt}`

const toJSON = bookExcerpt => JSON.stringify(bookExcerpt)
{% endhighlight %}

La función {% ihighlight javascript %}toJSON{% endihighlight %} se puede abreviarse incluso más eliminando la función que la contiene. Tan solo asignaremos la función stringify que es lo que nos interesa a la variable {% ihighlight javascript %}toJSON{% endihighlight %}.

{% highlight javascript %}
const toJSON = JSON.stringify
{% endhighlight %}

De hecho no haría falta crear la variable {% ihighlight javascript %}toJSON{% endihighlight %}, tan solo bastaría utilizar la función {% ihighlight javascript %}JSON.stringify{% endihighlight %} disponible en el ámbito global. Pero por una cuestión de coherencia textual es mejor mantener un nombre similar al resto de funciones de la misma familia.

Con estos nueva gama de funciones podemos otra contenga una nueva operación: seleccionar que tipo de formato transforma el extracto del libro.

{% highlight javascript %}
const transformBookExcerpt = (book, format) => {
  const excerpt = getBookExcerpt(book);
  switch(format) {
    case 'json': return toJSON(bookExcerpt);
    case 'yaml': return toYAML(bookExcerpt);
    case 'html':
    default: return toHTML(bookExcerpt);
  }
};
{% endhighlight %}

Por supuesto, esto es solo un ejemplo para ver los beneficios que aporta la utilización de funciones de único propósito. En una situación real las funciones de transformación como {% ihighlight javascript %}toHTML{% endihighlight %} o {% ihighlight javascript %}toYAML{% endihighlight %} serían algo más complejas. Incluso los nombres no serían los apropiados, deberían ser más explicativos. Podrían llamarse algo así como {% ihighlight javascript %}bookExcerptTo + formato{% endihighlight %}. De todas formas insisto en la finalidad meramente ilustrativa del ejemplo.

Todavía queda pendiente terminar de refactorizar {% ihighlight javascript %}getBookExcerpt{% endihighlight %}. Si observamos tanto el título como el nombre del autor se capitalizan de la misma manera. Claramente esto es otra operación que puede extraerse.

{% highlight javascript %}
const capitalize = (text='') => `${text.charAt(0).toUpperCase()}${text.slice(1)}`
{% endhighlight %}

Una vez extraído {% ihighlight javascript %}getBookExcerpt{% endihighlight %} queda de la siguiente forma.

{% highlight javascript %}
const getBookExcerpt = book => {
  const title = capitalize(book.title);
  const firstName = capitalize(book.author.name.first);
  const middleName = capitalize(book.author.name.middle);
  const lastName = capitalize(book.author.name.last);
  const firstChapter = book.chapters[0];
  let excerpt = firstChapter.slice(0, 1000);

  return {
    title,
    author: `${firstName} ${middleName} ${lastName}`,
    excerpt: firstChapter.length > 1000 ? excerpt.concat('...') : excerpt
  };
};
{% endhighlight %}

Con estos cambios tenemos un fuente mucho más asequible para cualquier neófito.  También hemos creado una serie de funciones reutilizables en cualquier parte del programa. Cabe destacar que a su vez estos bloques son más fácilmente testables al haber reducido el objetivo de la función original a un sola tarea.

En definitiva, esta particularidad de único propósito permite convertir las funciones en bloques de código reusable y fácil comprensión. Así que cuando abordemos una nueva funcionalidad, no está de más reescribirla hasta conseguir aislar todas aquellas partes que puedan ser reusables.

También es recomendable si trabajas dentro de un equipo y no tienes un claro conocimiento del proyecto, antes de abordar una nueva funcionalidad es mejor preguntar a otro miembro más veterano si alguna de las acciones que vas a abordar ya estuviera hecha. Recuerda que no hay que repetirse.

## Fuentes

* [codeburst.io/understanding-solid-principles-single-responsibility-b7c7ec0bf80](https://codeburst.io/understanding-solid-principles-single-responsibility-b7c7ec0bf80)
* [toptal.com/software/single-responsibility-principle](https://www.toptal.com/software/single-responsibility-principle)
* [oodesign.com/single-responsibility-principle.html](http://www.oodesign.com/single-responsibility-principle.html)

[pure-function]: /articulos/pure-function
[srp]: https://www.wikiwand.com/es/Principio_de_responsabilidad_%C3%BAnica
[spaghetti]: https://es.wikipedia.org/wiki/C%C3%B3digo_espagueti
[dry]: https://es.wikipedia.org/wiki/No_te_repitas
[soc]: https://www.wikiwand.com/es/Separaci%C3%B3n_de_intereses

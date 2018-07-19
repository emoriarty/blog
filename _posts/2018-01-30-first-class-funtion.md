---
title: "First class function"
date: 2018-01-30 22:00:00 +0100
excerpt: En un lenguaje de programación, se dice que cumple con la condición First-class function, si permite tratar las funciones como cualquier otro tipo de objeto.
permalink: /first-class-function
tags: [programacion-funcional, diseno, patrones, terminos-informaticos]
---
_First-class function_ es la cualidad por la que un lenguaje de programación puede tratar las funciones como si fueran cualquier otro tipo de objeto. Se entiende por objeto cualquier tipo de entidad que pueda asignarse a una variable, almacenarse en un _array_, transferir como argumento e incluso ser devuelto como resultado de otra función.

La idea en si proviene de otro concepto llamado _[first-class citizen][fcc]_. Este viene a decir que una entidad pueda soportar cualquier tipo de operación común disponible en otras entidades.

En el ejemplo siguiente se muestra una función anónimo siendo asignada a una variable llamada {% ihighlight javascript %}sayHello{% endihighlight %}. El código mostrado es _Javascript_ pero lo mismo aplica para otros lenguajes que soporten esta característica.

{% highlight javascript %}
const sayHello = () => "Hello";
{% endhighlight %}

Si exponemos la variable podremos ver que el contenido es la función previamente definida.

{% highlight javascript %}
sayHello; // () => "Hello"
{% endhighlight %}

Al añadir los dos paréntesis al final de la variable se ejecuta la función, devolviendo el resultado que acompaña a la cláusula {% ihighlight javascript %}return{% endihighlight %}. En el ejemplo se ha usado una función _[arrow][arrow]_, introducida en la versión _[ES6][es6]_ de _[ECMAScript][ecmascript]_. Entre las propiedades de esta nueva especificación permite devolver el resultado sin necesidad de incluir el comando {% ihighlight javascript %}return{% endihighlight %}, tampoco el uso de llaves, cuando la función está contenida en una sola línea.

{% highlight javascript %}
sayHello(); // "Hello"
{% endhighlight %}

Puesto que es una variable, también podemos utilizarla como argumento en otras funciones.

{% highlight javascript %}
const sayHelloWorld = (fn)  =>  fn() + " World";
const sayHelloElia = (fn) => fn() + " Elia";

sayHelloWorld(sayHello); // "Hello World"
sayHelloElia(sayHello); // "Hello Elia"
{% endhighlight %}

Obviamente el ejemplo anterior está diseñado solamente para mostrar la transferencia de funciones como argumentos. Lo óptimo hubiese sido que {% ihighlight javascript %}sayHello{% endihighlight %} aceptase un parámetro y concatenase su valor con el cuerpo del resultado.

Otro ejemplo donde también se hace uso de esta característica son los habituales _callbacks_ en _Javascript_. Estos no dejan de ser funciones anónimas (en la mayoría de los casos) que se utilizan como argumentos. Este encadenamiento de funciones puede llevar a crear capas de abstracción innecesarias.

Seguro que alguna vez te has encontrado algo parecido al siguiente fragmento de código. Siempre son otros los que hacen las cosas mal.

{% highlight javascript %}
ajax.get("/user/1", function (data) {
  return showData(data);
});
{% endhighlight %}

En la supuesta llamada a un _API_ se describe una función anónima que puede recibir dos argumentos. El primero con los datos esperados y el segundo con el error. Pero en la función contenedora solo contiene un argumento. ¿Qué ocurriría si se produjese un error? Entonces debería modificarse todas las llamadas similares para aceptar este segundo argumento y suministrarlo a la función contenida {% ihighlight javascript %}showData{% endihighlight %}.

{% highlight javascript %}
ajax.get("/user/1", function (data, error) {
  return showData(data, error);
});
{% endhighlight %}

Como veis es tontería. Hemos añadido una función que contiene a otra función que recibe el mismo número de argumentos. Por lo tanto, debemos eliminar este tipo de funciones _proxy_ que solo añaden complejidad al código además de retrasar la evaluación del mismo. El resultado correcto sería el siguiente.

{% highlight javascript %}
ajax.get("/user/1", showData);
{% endhighlight %}

Y así queda mucho más legible, sucinto y elegante.

Otro caso interesante es asignar funciones de distintos objetos en entidades propias de la aplicación. En el ejemplo siguiente puede verse como se crea una entidad {% ihighlight javascript %}User{% endihighlight %} que asigna por cada propiedad funciones pertenecientes a otros objetos. Esta característica permite crear entidades lógicas de manera fácil y menos verbosa. Al mismo tiempo se reutilizan funciones comunes reduciendo así los puntos donde podría provocarse un error.

{% highlight javascript %}
const User = {
  fetch: api.getUser,
  create: api.createUser,
  destroy: api.destroyUser,
  show: view.show
};
{% endhighlight %}

_Et voilà!_ Con esto deberías haberte hecho una idea de que es una _First-class function_.

Entre los lenguajes que lo soportan a parte del mencionado _Javascript_ estarían: _Haskell_, _Python_, _Scala_, _Perl_. En lenguajes imperativos como _C_ y _Java_ esta característica está soportada parcialmente.

Otro asunto que aun no he mencionado y es por el que me he decidido a hacer este artículo (y otros que vendrán), es que la noción de que las funciones puedan ser tratadas como cualquier otro tipo de dato es la base de la programación funcional. Sin este recurso difícilmente podrían darse técnicas como _partial-application/currying_ o _closures_, fundamentales para la composición de funciones. Un ejemplo podría ser el siguiente _snippet_.

{% highlight javascript %}
const sayHello = (name) => "Hello " + name;
const sayWorld = () => "World";
const sayElia = () => "Elia";

const sayHelloWorld = compose(sayHello, sayWorld);
const sayHelloElia = compose(sayHello, sayElia);

sayHelloWorld(); // "Hello World"
sayHelloElia(); // "Hello Elia"
{% endhighlight %}

{% ihighlight javascript %}compose{% endihighlight %} es un tipo especial de función que puede conseguirse a través de librerías como _[Ramda][ramda]_ o _[Lodash][lodash]_. El propósito de esta función es generar nuevas funciones más complejas a partir de otras más sencillas que cumplen un único cometido (principio de responsabilidad única o _SRP_). Pero esto es otro concepto que veremos en un futuro.

Como puedes apreciar hemos generado dos funciones a partir de otras tres. De no ser por la propiedad _First-class function_ (entre otras cosas como _High order function_) este tipo de código no sería posible.

¡Y esto es todo por ahora! Más adelante iré compartiendo otros artículos sobre terminología en programación.

## Fuentes
* [en.wikipedia.org/wiki/First-class_function](https://en.wikipedia.org/wiki/First-class_function)
* [stackoverflow.com/questions/10141124/any-difference-between-first-class-function-and-high-order-function](https://stackoverflow.com/questions/10141124/any-difference-between-first-class-function-and-high-order-function)
*[i-programmer.info/programming/theory/5933-what-exactly-is-a-first-class-function-and-why-you-should-care.html](http://www.i-programmer.info/programming/theory/5933-what-exactly-is-a-first-class-function-and-why-you-should-care.html)
* [appendto.com/2016/10/javascript-functions-as-first-class-objects/](https://appendto.com/2016/10/javascript-functions-as-first-class-objects/)
* [drboolean.gitbooks.io/mostly-adequate-guide/content/ch2.html](https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch2.html)

[fcc]: https://en.wikipedia.org/wiki/First-class_citizen
[ramda]: http://ramdajs.com/docs/#compose
[lodash]: https://lodash.com/docs/4.17.4#flowRight 
[arrow]: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones/Arrow_functions
[ecmascript]: https://es.wikipedia.org/wiki/ECMAScript
[es6]: http://es6-features.org

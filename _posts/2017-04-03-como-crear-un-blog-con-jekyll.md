---
title: "Cómo crear un blog o sitio web con Jekyll"
date: 2017-04-03 00:00:00 +0100
excerpt: Tutorial sobre como poder crear un blog o sitio web mediante Jekyll. Es necesario tener unos conocimientos mínimos en programación.
permalink: /como-crear-un-blog-con-jekyll
tags: [jekyll, web, ui, blog, tutorial, temas]
---

En este artículo voy a explicar cómo puedes crear tu propio blog o página web. El mismo lo he concebido como un taller donde podrás ver paso a paso desde la instalación de las herramientas necesarias hasta la finalización del sitio web. 

Antes de empezar debo advertirte que para la realización de este taller, son necesarios unos conocimientos mínimos en _[HTML][html]_, _[CSS][css]_ y programación en _[Javascript][js]_. La finalidad del artículo no es solo publicar contenido (artículos o textos) sino tener un completo control del contenedor (la página web) para poder modificar su estructura, cambiar estilos y/o añadir comportamiento.

Tampoco es necesario ser una experta o experto en esta disciplina, solo hay que tener ganas y curiosidad. Cómo verás el programa que vamos a usar nos ofrece unos diseños predefinidos, lo cual facilitará la labor de arranque inicial.

También me gustaría recalcar que no voy a profundizar en las tecnologías mencionadas. Si quieres aprender o tener un mejor dominio en las mismas, te recomiendo que eches un vistazo otros tutoriales, como por ejemplo los de [librosweb][librosweb]. Puedes encontrar otras páginas web de aprendizaje realizando una sencilla búsqueda en _[google][google-search]_. Abajo muestro unos resultados de la búsqueda indicada.

* [devcode.la/cursos/html-css][web-course-1]
* [codecademy.com/es/tracks/html-css-traduccion-al-espanol-america-latina-clone][web-course-2]
* [aulafacil.com/cursos/t2204/informatica/crear-paginas-web/html][web-course-3]
* [blogthinkbig.com/20-cursos-programacion-gratuitos-tomar-linea][web-course-4]

Lo que si haré, en la medida de lo que me sea posible, es aportar explicaciones sobre conceptos que considere necesarios para un mejor entendimiento en la creación de páginas web. Así que si eres de esos que no se asusta ensuciarse las manos y sientes curiosidad por cómo funcionan las cosas (una página web en este caso) entonces sigue leyendo. En caso contrario, si lo único que deseas es publicar contenido y no te importa el aspecto del contenedor, lo mejor es busques otras opciones como pueda ser _[medium][medium]_ o _[wordpress][wordpress]_.

Por cierto, quiero advertirte que para el desarrollo de este taller he usado un sistema operativo _MacOS_. Si usas un sistema _Unix/Linux_ casi la mayoría de comandos que utilice son los mismos. Si por contra utilizas un _Windows_, será mejor que te deshagas de él cuanto antes. Bromas a parte, cuando sea necesario también incluiré cómo hacerlo con _Windows_ aunque no garantizo su completo funcionamiento.

Antes de empezar, si quieres puedes descargar el código fuente usado en el tutorial desde [aquí][project]. De esta forma puedes contrastar los avances que vayas realizando con el proyecto ya finalizado como referencia.

Por último, si os interesa podéis leer las [motivaciones][motivaciones] que me han llevado a crear este blog. Probablemente tú tengas otras distintas y aunque no sean las mismas ni sepa cuáles son, sí hay una cosa que es cierta: si estás leyendo este artículo es porque estás pensando en crear uno. Así que sin más dilación empecemos con el taller.

## Consideraciones antes de empezar
Al principio estuve valorando si utilizar un servicio de publicación de blogs o crear el mío propio. De los primeros hay muy buenos, cómo puede ser [medium][medium],  pero no dejan mucho margen para la personalización de la página. Cierto es que cada vez ofrecen más opciones de adaptación cómo cambiar el color de la cabecera o añadir un logo propio. Aunque la idea de una estructura y diseño impuestos no me pareció nada atractiva de tal manera que me decidí por la segunda opción. Siendo ésta mucho más versátil me daba mucha pereza tener que hacerlo todo desde cero. Al final opté por una tercera vía: utilizar un [generador de páginas estáticas][web-sites-generator].

Lo interesante de un generador es que puedes redactar los artículos en archivos de texto plano y de fácil lectura, evitando el engorro y distracciones que un archivo _HTML_ puede acarrear. Aunque esto no es del todo cierto, os aseguro que es mucho más sencillo que escribir un texto de dos mil palabras en un _HTML_.

Cuando utilizo el término __página estática__ no pretendo decir que se quede congelada y ni tan siquiera se pueda hacer _[scroll][scroll]_. Lo que expresa es que no habrá ningún tipo de interacción con el servidor más que devolver la página previamente alojada. Es decir, no habrá ninguna base de datos ni servicios web desde donde recuperar los datos necesarios para construir la página por cada petición de usuario. Este tipo de página web se le denomina __página dinámica__. Bien cabe remarcar, que los servicios web se pueden utilizar desde la propia página pero para ello será necesario el uso de librerías Javascript. En definitiva, una página estática es un archivo permanente que será devuelto por el servidor sin previa tratamiento. Para saber más puede consultar en este [enlace][pag-sta-dyn].

Hay una amplia oferta de [generadores][generators]. Cual utilices dependerá de tus conocimientos y la experiencia que hayas tenido con alguno. Pero al final cualquiera de estas herramientas requerirán, en mayor o menor medida, tener conocimientos en _HTML_, _CSS_ y _Javascript_. Personalmente recomiendo siempre optar entre las cinco más usadas y entre estas las que mayor soporte ofrezca.

De entre todas la opciones posibles al final decidí emplear _[Jekyll][jekyll]_. También estuve considerando _[middleman][middleman]_ pero _Jekyll_ lleva más tiempo siendo desarrollado, lo cual garantiza que los posibles errores de diseño ya fueron corregidos. En el momento de la edición de este artículo, la última versión disponible es la [3.4.2][jekyll-current-version]. Otra buena razón por la que lo elegí es que un sitio web cómo _[Github][github-pages]_ lo utiliza como motor interno para la generación de páginas estáticas. Lo cual avala un continuo mantenimiento además de ofrecer una buena documentación. Cómo curiosidad, la misma herramienta fue creada por [uno de los co-fundadores][github-co-founder] de _Github_.

Por tanto, para utilizar Jekyll necesitaremos instalar las siguientes herramientas.
* un terminal o consola de comandos (todos los s.o. la tienen),
* un editor de textos (_[visual studio code][code]_, _[sublime][sublime]_, _[atom][atom]_, _[vim][vim]_, _[notepad++][notepad]_),
* _[el intérprete de Ruby][ruby]_,
* _Jekyll_.

No te preocupes si no conoces alguno de los puntos en el listado anterior, los explicaré más adelante. Así que teniendo claro que es lo que necesitamos, procedamos a hacer la instalación.

## Instalación
Para la instalación necesitaremos abrir un terminal y nos dirigimos al directorio donde queramos situar el proyecto. Una vez dentro, lo primero será confirmar que ruby está instalado en el sistema y que su versión sea igual o superior a la 2.0.

Para comprobar si está instalado teclea lo siguiente en la consola.

{% highlight shell %}
$ ruby -v
{% endhighlight %}

Si el mensaje devuelto se muestra `bash: ruby: command not found` entonces es que no existe. En caso contrario devolverá un mensaje informando de la versión utilizada. En muestra el siguiente mensaje.

{% highlight shell %}
ruby 2.4.0p0 (2016-12-24 revision 57164) [x86_64-darwin16]
{% endhighlight %}

En caso de no tenerlo o ser una versión anterior, la mejor opción es utilizar un gestor de versiones. Imagino que habrán algunos más disponibles pero los más conocidos son _[rvm][rvm]_ y _[rbenv][rbenv]_. Personalmente utilizo _rbenv_, me gusta la sencillez con la que maneja las diferentes versiones de ruby simplemente modificando el _PATH_ del sistema. De todas formas con las dos herramientas es bien sencillo instalar _Ruby_. Por costumbre de uso, vamos a continuar la instalación con _rbenv_. Si utilizas un Mac, recomiendo utilizar _[Homebrew][brew]_ para instalar _rbenv_. Una vez hayas instalado _Homebrew_, ejecuta el siguiente comando en el terminal que previamente teníamos abierto.

{% highlight shell %}
$ brew install rbenv
{% endhighlight %}

No voy a entrar en detalles en cuanto a la instalación de _rbenv_. Para ello puedes consultar en su página de github donde viene muy bien detallado [cómo hacerlo][rbnev-install]. Eso sí, es requisito indispensable saber leer en inglés.

Tras la intalación de rbenv, el siguiente paso será ejecutar el siguiente comando.

{% highlight shell %}
$ rbenv install 2.4.0 # número de versión debe superior a la 2.0
{% endhighlight %}

Acto seguido instalaremos _bundler_. Esta herramienta nos ayudará a gestionar las dependencias que vayamos a utilizar en nuestro proyecto _Jekyll_ a través de un archivo llamado _Gemfile_. Por cierto, en _Ruby_ a las librerías se les llaman gemas, por tanto de ahora en adelante me referiré a ellas como tales.

{% highlight shell %}
$ gem install bundler
{% endhighlight %}

Realizados los dos pasos anteriores satisfactoriamente, procederemos a instalar _Jekyll_. Para ello, utilizaremos la herramienta _gem_ que viene instalado junto con _Ruby_.  _gem_ es un sistema de gestión de paquetes, de hecho _bundler_ hace uso de este comando. Teclea lo siguiente en la consola.

{% highlight shell %}
$ gem install jekyll
{% endhighlight %}

Si todo ha ido bien deberías ver en la terminal lo siguiente.

{% highlight shell %}
Fetching: jekyll-3.4.0.gem (100%)
Successfully installed jekyll-3.4.0
Parsing documentation for jekyll-3.4.0
Installing ri documentation for jekyll-3.4.0
Done installing documentation for jekyll after 2 
seconds
1 gem installed
{% endhighlight %}

¡Bravo! Ya tenemos _Jekyll_ instalado en el sistema.

### Windows
Para instalar _Ruby_ en _Windows_ cómo lo hiciéramos en _MacOS_, lo mejor será utilizar un gestor de paquetes cómo es _Homebrew_. La herramienta en cuestión se llama [chocolatey][chocolatey]. O si lo prefieres puedes descargar un [instalador][ruby-installer] y saltar hasta la siguiente [sección](#primer-contacto-con-jekyll).

Para instalar chocolatey debes abrir una consola con acceso de administrador. Una vez abierta copia y ejecuta el siguiente comando.

{% highlight powershell %}
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1 && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
{% endhighlight %}

Si todo ha salido bien el resultado será parecido a la imagen inferior.

{% progressive_picture
  thumbnail: /assets/jekyll-1.thumb.jpg
  src: /assets/jekyll-1.jpg
  height: 622
  width: 998
  alt: 'Mensaje de instalación satisfactoria de chocolatey' %}

Para poder continuar con el proceso de instalación de _Jekyll_, debemos cerrar la consola y reabrirla cómo nos indica el primer _warning_ en el mensaje anterior. Una vez abierta instalaremos ruby con la siguiente sentencia.

{% highlight powershell %}
> choco install ruby -y
{% endhighlight %}

Si tras ejecutar el comando apareciera un mensaje de error como el siguiente.

{% highlight powershell %}
Error deserializing response of type chocolatey.infrastructure.app.configuration.ConfigFileSettings:
 Root element is missing.
Root element is missing.
{% endhighlight %}

Deberemos eliminar un archivo que se ha generado durante la instalación. Este problema es debido a que este archivo se crea vacío y durante su lectura se produce el error. Seguro que en un futuro lo solventarán pero de momento la única solución es eliminarlo. Para ello navegaremos hasta donde se halle al fichero y ejecutaremos el comando _del_ como se indica debajo.

{% highlight powershell %}
> cd ProgramData\chocolatey\config\
> del chocolatey.config
{% endhighlight %}

Con esta solución deberíamos poder instalar _Ruby_ sin problemas. En la siguiente imagen se puede ver el mensaje en caso de que la instalación ha sido satisfactoria.

{% progressive_picture
  thumbnail: /assets/jekyll-2.thumb.jpg
  src: /assets/jekyll-2.jpg
  height: 242
  width: 600
  alt: 'Mensaje de instalación satisfactoria de ruby' %}

Por lo visto para que tengan efectos los cambios realizados por _chocolatey_ debemos cerrar la ventana y reabrirla con permisos de administrador de nuevo.

El siguiente paso es instalar  _bundler_ y _Jekyll_ como hicieramos en _MacOS_.

{% highlight powershell %}
> gem install bundler
> gem install jekyll
{% endhighlight %}

Si en este paso, otro error volviera a mostrarse con el siguiente mensaje.

{% highlight powershell %}
SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed
{% endhighlight %}

Será necesario instalar manualmente el certificado ya que este ha expirado. En un futuro imagino que lo incluirán en el paquete pero mientras tanto navega a esta [página][certificate-issue] y sigue las instrucciones para solucionarlo. A mí con la sección _«Installing using update packages»_ me ha bastado para que funcionara.

Una vez hechos todos estos pasos deberías poder utilizar _Jekyll_ en _Windows_ cómo veremos en el resto del taller.

## Primer contacto
Cómo indicara anteriomente, Jekyll es un generador de páginas estáticas permitiendonos la creación contenido mediante archivos de texto basados en [Markdown][markdown]. Estos archivos serán inyectados en la plantillas HTML previamente definidas. Para poder facilitar la generación de las página web definitiva _Jekyll_ ofrece una herremienta llamada _[Liquid][liquid]_ para poder cargar contenido de manera dinámica o utilizar ciertas estructuras de control. Pero antes de profundizar en todas las caraterísticas de _Jekyll_, veamos como funciona.

Ya habíamos instalado las herramientas necesarias para que _Jekyll_ funcionase. Si todavía tienes el terminal abierto, elige el directorio donde quieras instalar la página web que vamos a crear. Una vez estés en el directorio seleccionado ejecuta el siguiente comando.

{% highlight shell %}
$ jekyll new jekyll-tut
{% endhighlight %}

Al proyecto lo he llamado _jekyll-tut_ por motivos didácticos pero tú puedes nombrarlo como quieras.

Cuando el comando haya finalizado, veremos un mensaje indicando que el proyecto se ha instalado correctamente. Tras acceder al nuevo directorio, observaremos una estructura similar a la siguiente.

{% highlight shell %}
.
├── Gemfile 
├── Gemfile.lock
├── _config.yml
├── _posts
├── about.md
└── index.md
{% endhighlight %}

Luego explicaré cada uno de los archivos presentes, y no presentes, en la carpeta. Por ahora mejor arranquemos _Jekyll_ y veamos que se ha generado. Para ello usaremos el siguiente comando (siempre en el mismo directorio).

{% highlight shell %}
$ jekyll serve
{% endhighlight %}

Tras la ejecución del anterior comando han aparecido unos mesajes en la consola. Si nos fijamos en las dos últimas líneas, podremos ver una dirección _URL_ y una acción de comando.

{% highlight shell %}
Server address: http://127.0.0.1:4000/
Server running... press ctrl-c to stop.
{% endhighlight %}

La primera indica la dirección web donde podemos acceder para visitar el sitio web generado. La segunda señala como detener el servidor. Si accedemos al siguiente [enlace](127.0.0.1:4000) podremos observar lo que Jekyll ha generado por defecto. La página en concreto será como la siguiente imagen.

{% progressive_picture
  thumbnail: /assets/jekyll-3.thumb.jpg
  src: /assets/jekyll-3.jpg
  height: 431
  width: 600
  alt: 'Página de incio generada automáticamente por Jekyll' %}

_Voilà!_ Esta es la página que _Jekyll_ ha creado utilizando el tema por defecto llamado _[minima][minima]_. Estos temas son configurables a través el archivo __config.yml_ desde la versión [3.2.0][3.2.0]. Más adelante veremos cómo se puede configurar un tema predefinido y/o modificarlo.

Todos los enlaces que hay en la página son navegables, por ejemplo si pulsamos sobre el artículo (_post_) _«Welcome to Jekyll»_ nos dirigirá a una página nueva con el contenido del artículo. También hay una suscripción vía [RSS][rss] y una página _about_. Adelante échales un vistazo.

## Cómo funciona _Jekyll_
Jekyll está diseñado para que focalicemos nuestra atención en la creación de contenido. De hecho desde su concepción primigenia está orientado para facilitar la creación y mantenimiento de un blog, separando el contenido de la presentación. Para ello hace uso de _layouts_ (presentación) que definen la disposicón de los elementos. También se pueden crear componentes reutilizables (_includes_) cómo pueden ser la cabecera (_header_) y el pie de página (_footer_). Estos _layouts_ e _includes_ están almacenados por convención en los directorios {% ihighlight shell %}_layouts{% endihighlight %} e {% ihighlight shell %}_includes{% endihighlight %} respectivamente.

Puede que ahora te estés preguntando donde están esas carpetas en el proyecto. Haces bien en preguntártelo. Pues bien, si recuerdas el tema _minima_ es instalado por defecto la primera vez que se crea un proyecto _Jekyll_. Este tema provee todos los archivos necesarios para crear un blog. Entre esos archivos se incluyen los directorios {% ihighlight shell %}_layouts{% endihighlight %} e {% ihighlight shell %}_includes{% endihighlight %}. Por lo tanto, no hay necesidad de que las carpetas sean incluidas en el proyecto. También cabe la posibilida de crear un proyecto vacío incluyendo la opción {% ihighlight shell %}--blank{% endihighlight %} cuando se crea un proyecto nuevo. 

<a name="ls-bundle-show"></a>Para ver que archivos contiene el tema _minima_, podemos ejecutar uno de los siguientes comandos en consola indicados a continuación.

{% highlight shell %}
$ ls -l `bundle show minima` # Muestra en consola el contenido del directorio
{% endhighlight %}

<a name="open-bundle-show"></a>Aunque, si lo prefieres, puedes abrirlo en una ventana de sistema con una de las siguentes instrucciones dependiendo del sistema operativo.

_MacOS_
{% highlight shell %}
$ open `bundle show minima` # Abre una ventana de sistema en MacOS
{% endhighlight %}

_Linux_
{% highlight shell %}
$ xdg-open `bundle show minima`# La variante open en Linux
{% endhighlight %}

_Windows_
{% highlight shell %}
> bundle show minima
/usr/local/lib/ruby/gems/2.3.0/gems/minima-2.1.0
> explorer /usr/local/lib/ruby/gems/2.3.0/gems/minima-2.1.0
{% endhighlight %}

<a name="minima-content"></a>Una vez ejecutado el comando, encontraremos los siguientes archivos.

{% highlight shell %}
.
├── LICENSE.txt 
├── README.md
├── _includes # componentes
├── _layouts # plantillas
├── _sass # estilos
└── assets # resto de elementos usados en la página cómo imágenes, archivos pdf, etcétera.
{% endhighlight %}

Cómo podemos comprobar, dentro de las carpetas {% ihighlight shell %}_layouts{% endihighlight %} e {% ihighlight shell %}_includes{% endihighlight %} hay una serie de archivos _HTML_. Los primeros definen la estructura general del sitio web y los segundos son elementos parciales que pueden reutilizarse tanto en los _layouts_ como desde cualquier otro archivo. No te preocupes de momento por el resto de carpetas y archivos. Profundizaremos en ellos conforme avance el taller.

Para poder entender mejor como funcionan en conjunto _layouts_ e _includes_, lo mejor es ver como se utilizan, para ello tomaremos como ejemplo el único artículo creado del blog.

### Composición de un _Post_
En la siguiente imagen podemos el artículo que _Jekyll_ genera como ejemplo.

{% progressive_picture
  thumbnail: /assets/jekyll-4.thumb.jpg
  src: /assets/jekyll-4.jpg
  height: 1398
  width: 1474
  alt: 'Diferentes secciones de un post' %}

Rodeado en verde vemos la sección correspondiente al contenido de la página, el _post_ en sí mismo. En naranja apreciamos las elementos parciales, _includes_. Y por último, en amarillo se indica el contenedor o _layout_. Podemos ver que este último contiene al resto de componentes, estableciendo la disposición del conjunto formado por _post_ e _includes_.

Ahora que ya sabemos qué es qué en un _post_, veamos cómo es el archivo. Para abrirlo, dirijámonos a la siguiente ruta {% ihighlight shell %}_post/2017-02-28-welcome-to-jekyll.markdown{% endihighlight %}. ¿Lo tienes delante? Bien, veamos como se compone.

<a name="yaml-front-matter"></a>
#### _YAML Front Matter_
Esta sección se la puede consideradar como una cabecera donde se especifican las preferencias particulares e información adicional que Jekyll utilizará para procesar el archivo. Siguiendo como referencia con el _post_ de ejemplo, la cabecera es la siguiente.

{% highlight yaml %}
---
layout: post
title:  "Welcome to Jekyll!"
date:   2017-02-28 01:01:13 +0100
categories: jekyll update
---
{% endhighlight %}

En la figura anterior se puede ver la parte superior del _post_. Este fragmento corresponde a la sección llamada _YAML Front Matter_ y que como su nombre señala, utiliza la sintaxis [_YAML_][yaml]. Cómo más adelante veremos, el archivo {% ihighlight shell %}_config.yml{% endihighlight %}, donde se deinen las opciones globgenrealesales, hace uso de este mismo formato. Por contra, en el _Front Matter_ de un _post_ se establecen las opciones particulares al mismo, sobrescribiendo así lo preferencia definida en el archivo de configuraión global.

A continucación, en la lista se muestranla descripción de cada una de la opciones específicas de un _post_.
* {% ihighlight yaml %}layout{% endihighlight %}: indica cual es la layout (plantilla) a usar.
* {% ihighlight yaml %}title{% endihighlight %}: título del artículo y de la página.
* {% ihighlight yaml %}date{% endihighlight %}: fecha de publicación.
* {% ihighlight yaml %}categories{% endihighlight %}: categorías a las que pertenece el artículo.

Exceptuando {% ihighlight yaml %}layout{% endihighlight %}, el resto de las preferencias son sólo específicas del archivo. Es decir, no se definirían en el {% ihighlight shell %}_config.yml{% endihighlight %}.

Es importante recalcar qué para que _Jekyll_ interprete la sección _Front Matter_, esta debe *situar al inicio de cada archivo*. Otra peculiaridad, es que todas esta opciones deben ir *envueltas entre dos línes de tres guiones ({% ihighlight yaml %}---{% endihighlight %})*. Todo las variables que se encuentren dentro estas dos «líneas» serán utilizadas como opciones particulares.

El resto del archivo es el contenido como se muestra en la imagen del _post_. El formato que se ha utiliza se llama _markdown_ y al igual que HTML es un lenguaje de marcado ligero pero mucho más legible. No te preocupes si no sabes _Markdown_, hay muchos conversores que te facilitarán la tarea de transcribirlos desde un archivo _word_ o _google docs_.

Por último, cade señalar que cualquier archivo que contenga esta sección al inicio del mismo será procesado al igual que un _post_.

### _Templating (Liquid)_
Si _YAML Front Matter_ es la cabecera, como es obvio, el resto del archivo será el cuerpo. En esta sección, a parte de redactar el artículo con _markdown_, también se pueden incluir sentencias condicionales y funciones aportando un mayor dinamismo al resultado. Estas sentencias son procesadas mediante un motor de plantillas llamado _[Liquid][liquid]_.

{% highlight liquid %}
{% raw %}{% highlight ruby %}{% endraw %} 
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% raw %}{% endhighlight %}{% endraw %}
{% endhighlight %}

En el fragmento superior, las sentencias {% raw %}{% highlight ruby %}{% endraw %} y {% raw %}{% endhighlight %}{% endraw %} delimitan el contenido del texto que será procesado por _Liquid_. En este caso concreto, el resultado generado es el siguiente.

{% highlight html %}
<figure class="highlight">
  <pre>
    <code class="language-ruby" data-lang="ruby">
      <span class="k">def</span>
      <span class="nf">print_hi</span>
      <span class="p">(</span>
      <span class="nb">name</span>
      <span class="p">)</span>
      <span class="nb">puts</span>
      <span class="s2">"Hi, </span>
      <span class="si">#{</span>
      <span class="nb">name</span>
      <span class="si">}</span>
      <span class="s2">"</span>
      <span class="k">end</span>
      <span class="n">print_hi</span>
      <span class="p">(</span>
      <span class="s1">'Tom'</span>
      <span class="p">)</span>
      <span class="c1">#=&gt; prints 'Hi, Tom' to STDOUT.</span>
    </code>
  </pre>
</figure>
{% endhighlight %}

Como vemos el texto inicial es transformado a una serie de etiquetas _HTML_ para poder ser decorado mediante estilos. Al final, esto es lo que veríamos en el navegador.

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Otros ejemplos de sentencias _Liquid_ serían los siguientes.

{% highlight liquid %}
{% raw %}{{ page.title }}{% endraw %}
{% raw %}{{ post.url | relative_url }}{% endraw %}
{% raw %}{% include head.html %}{% endraw %}  
{% endhighlight %}

Cómo bien habremos observado, las etiquetas están envueltas entre los símbolos **{% raw %}{% %}**{% endraw %} y **{% raw %}{{ }}{% endraw %}**. Esto no es sólo por una cuestión estética, los corchetes y porcentajes (**{% raw %}{% %}**{% endraw %}) permiten ejecutar condiciones o funciones, como por ejemplo {% ihighlight liquid %}{% raw %}{% if expression %}{% endif %}{% endraw %}{% endihighlight %} o recorrer una lista {% ihighlight liquid %}{% raw %}{% for product in collection.products %}{% endfor %}{% endraw %}{% endihighlight %}. Por contra **{% raw %}{{ }}{% endraw %}** devuelve el valor que contenga la propiedad de un objeto o el valor de una variable.

Hay también un tercer llamado filtro y está representado por **{% ihighlight liquid %}|{% endihighlight %}**. Se utiliza para modificar el valor devuelto por el objeto o variable contenido. En la figura anterior, {% ihighlight liquid %}{% raw %}| relative_url{% endraw %}{% endihighlight %} prefija el valor de {% ihighlight liquid %}{% raw %}post.url{% endraw %}{% endihighlight %} la ruta relativa del sitio web, especificada en el archivo de configuración global, {% ihighlight bash %}_config.yml{% endihighlight %}.

Para profundizar en liquid puedes leer la [documentación oficial][liquid-doc].

A continuación vamos a ver cómo es el _layout_ que se utilizó en el _post_.

### _Layout_
Cómo ya se introdujo antes, el _layout_ contiene la estructura donde se incluirá el contenido procesado del _post_ que hemos visto en el apartado anterior. Por defecto, este archivo se hallará en la raíz del proyecto bajo la carpeta {% ihighlight liquid %}_layouts{% endihighlight %} pero como bien podemos ver dicho directorio no existe.

Ya sabemos que este directorio se encuentra en situado en el directorio donde está instalada la gema _minima_, que incluye la estructura y estilo general del sitio web. ¿Pero cómo se importa el archivo? Tranquilos, no es magia, aunque lo desconocido se pueda considerar como tal. _Jekyll_ primero busca si existe el _layout_ bajo nuestro proyecto, si no lo encuentra irá a buscarlo bajo el directorio donde se encuentre el tema. Para poder ver el contenido del tema en una ventana de sistema, puedes consultarlo en la [sección anterior, dedicada a cómo funciona Jekyll](#open-bundle-show). De ahora en adelante, me limitaré a usar la versión en terminal.

{% highlight shell %}
$ ls -l `bundle show minima`
{% endhighlight %}

{% ihighlight shell %}bundle show{% endihighlight %} retorna la ruta donde se encuentra la gema indicada, en este caso _minima_ es el nombre de la misma. {% ihighlight shell %}` `{% endihighlight %} básicamente ejecuta el comando que se encuentre en su interior,devolviemdo el resultado para poder ser utilizado en otro contexto. En este caso la salida del comando es una ruta que usará la instrucción {% ihighlight shell %}ls{% endihighlight %} para listar el contenido de la ruta. El resultado lo puedes ver en la siguiente [enlace](#minima-content).

El nombre del _layout_ utilizado es _post_, por lo tanto buscaremos un archivo con el mismo nombre con la extensión {% ihighlight shell %}.html{% endihighlight %} dentro del directorio {% ihighlight shell %}_layouts{% endihighlight %}. En la siguiente figura se muestra el archivo reducido para focalizarnos en lo que ahora nos interesa.

{% highlight html %}
---
layout: default
---
<article class="post" itemscope itemtype="http://schema.org/BlogPosting">
  .
  .
  .
  <div class="post-content" itemprop="articleBody">
    {% raw %}{{ content }}{% endraw %}
  </div>
  .
  .
  .
</article>
{% endhighlight %}

En este archivo encontramos dos peculiaridades. La primera es que la sección _Front Matter_ se hace referencia otro layout. Por lo tanto este archivo no es el contenedor principal sino una parte del conjunto. La segunda es la sentencia {% ihighlight liquid %}{% raw %}{{content}}{% endraw %}{% endihighlight %}. Aquí es donde se embeberá el contenido del archivo que utilice el _layout post_. Cómo analogía, podríamos pensar que al igual que en un puzzle infantil que se fuera construyendo de dentro hacia afuera.

Ahora que sabemos que el otro _layout_ se llama _default_, debemos encontrar un archivo nombrado {% ihighlight shell %}default.html{% endihighlight %} dentro de {% ihighlight shell %}_layouts{% endihighlight %}.

{% highlight html %}
<!DOCTYPE html>
<html lang="{{ page.lang | default: site.lang | default: "en" }}">

  {% raw %}{% include head.html %}{% endraw %}

  <body>

    {% raw %}{% include header.html %}{% endraw %}

    <main class="page-content" aria-label="Content">
      <div class="wrapper">
        {% raw %}{{ content }}{% endraw %}
      </div>
    </main>

    {% raw %}{% include footer.html %}{% endraw %}

  </body>

</html>
{% endhighlight %}

¡Al fin! Ya hemos completado el puzzle. Cómo podemos ver, tanto el {% ihighlight html %}DOCTYPE{% endihighlight %} cómo la etiqueta {% ihighlight html %}html{% endihighlight %} están presentes. Como ocurriera en el layout post, este también contiene la sentencia {% ihighlight liquid %}{% raw %}{{ content }}{% endraw %}{% endihighlight %}. Aquí es donde se incluirá el _layout post_ junto con el contenido del _post_.

### _Includes_
La etiqueta {% ihighlight liquid %}include{% endihighlight %} como su significado indica, nos permite incluir el contenido de otro archivo. Al igual que vimos con los layouts _Jekyll_ buscará primero en el directorio {% ihighlight shell %}_includes{% endihighlight %} que se encuentre en el directorio de nuestro proyecto, en caso de no hallarlo buscará en el directorio del tema instalado que se esté utilizando.

Un ejemplo lo podemos encontrar en el _layout_ {% ihighlight shell %}default.html{% endihighlight %}. Esta sentencia incluirá al archivo {% ihighlight shell %}head.html{% endihighlight %} en el mismo lugar donde se hallase.

{% highlight liquid %}
{% raw %}{% include head.html %}{% endraw %}
{% endhighlight %}

Estos archivos no tiene mayor secreto que, normalmente, ser fragmentos _HTML_. Si quieres ver más ejemplos puedes echar un vistazo en la carpeta donde está instaldo el tema _minima_. Puedes ver como hacerlo [aquí](#ls-bundle-show).

#### Parámetros
Otra característica importante de los _includes_ es la posibilidad de pasarles parámetros. Esto permite crear componentes reutilizables agnósticos al contexto donde se utilicen. También facilita la edición en un contexto _Markdown_ pudiendo incluir estructuras complejas que en _HTML_ resultan sencillas (recuerda que un archivo _Markdown_ se transforma a _HTML_).

{% highlight liquid %}
<figure>
   <a href="{% raw %}{{ include.url }}{% endraw %}">
   <img src="{% raw %}{{ include.file }}{% endraw %}" style="max-width: {% raw %}{{ include.max-width }}{% endraw %};"
      alt="{% raw %}{{ include.alt }}{% endraw %}" />
   <figcaption>{% raw %}{{ include.caption }}{% endraw %}</figcaption>
</figure>
{% endhighlight %}

El ejemplo superior (extraído de la documentación oficial de _Jekyll_) contiene cinco parámetros: {% ihighlight liquid %}url{% endihighlight %}, {% ihighlight liquid %}file{% endihighlight %}, {% ihighlight liquid %}max-width{% endihighlight %}, {% ihighlight liquid %}alt{% endihighlight %} y {% ihighlight liquid %}caption{% endihighlight %}. Estos parámetros son automáticamente incluidos como propiedades del objecto {% ihighlight liquid %}include{% endihighlight %}, creado en el propio contexto del archivo _include_.

Suponiendo que el ejemplo de la figura anterior pertenece a un archivo nombrado {% ihighlight shell %}image.html{% endihighlight %}, los parámetros se pasarían de la siguiente manera.

{% highlight liquid %}
{% raw %}{% include image.html url="http://jekyllrb.com"
max-width="200px" file="logo.png" alt="Jekyll logo"
caption="This is the Jekyll logo." %}{% endraw %}
{% endhighlight %}

## Crear un _post_
Cómo hemos visto, los _posts_ se encuentran bajo la carpeta {% ihighlight shell %}_posts{% endihighlight %}. Así que el nuevo archivo será instalado en ese directorio. Pero antes de crearlo, veamos que requisitos debe cumplir el _post_.

* El nombre del archivo debe tener el siguiente formato {% ihighlight shell %}YYYY-MM-DD-título.EXT{% endihighlight %}.
  * {% ihighlight shell %}YYYY{% endihighlight %} corresponde al año,
  * {% ihighlight shell %}MM{% endihighlight %} al mes,
  * {% ihighlight shell %}DD{% endihighlight %} al día,
  * {% ihighlight shell %}EXT{% endihighlight %} es la extensión del archivo ({% ihighlight shell %}.markdown{% endihighlight %}, {% ihighlight shell %}.md{% endihighlight %} o {% ihighlight shell %}.html{% endihighlight %}).
* Por último, todo post debe contener al inicio la sección _[YAML Front Matter](#yaml-front-matter)_.

¡Ya está! No nos hace falta nada más. Bueno sí, necesitaremos un tema sobre el cual escribir aunque para no perder mucho tiempo decidiendo qué y haciendo honor al pragmatismo, en detrimento de la originalidad, utilizaremos el texto _lorem ipsum_. De hecho, también lo usaremos como título. Por lo tanto, el archivo tendrá el siguiente nombre.

{% highlight shell %}
2017-03-04-lorem-ipsum.md # .md es un alias de .markdown
{% endhighlight %}

Cómo no creo que nadie conozca el texto _Lorem ipsum_ de memoria, mayormente porque es ininteligible. Para generar el texto utilizaremos el siguiente [enlace][lorem-ipsum]. Abajo podemos ver un estracto del _post_.

{% highlight md %}
---
layout: post
title: "Lorem ipsum"
date: 2017-03-04 00:15:37 +0100
categories: lorem
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sagittis molestie orci, a 
convallis mi cursus ut. Curabitur sit amet enim dolor. Mauris accumsan, ipsum blandit 
ultricies pellentesque, arcu sem viverra est, vitae placerat quam enim a ante.
.
.
.
{% endhighlight %}

Si el servidor _Jekyll_ esta corriendo, al guardar el _post_ se genera automáticamente la página web. Para ver el resultado, abriremos en el navegador la página de inicio de nuestro _blog_. Deberíamos ver algo parecido a la imagen siguiente.

{% progressive_picture
  thumbnail: /assets/jekyll-5.thumb.jpg
  src: /assets/jekyll-5.jpg
  height: 1208
  width: 1548
  alt: 'Página de inicio' %}

Como podemos apreciar, hay una nueva entrada en el índice con la fecha correspondiente a la indicada en el _Front Matter_ del _post_ que acabamos de editar.

Por defecto, mientras {% ihighlight shell %}jekyll serve{% endihighlight %} está ejecutándose, cualquier cambio realizado en el proyecto, regenera el mismo archivo que haya sido modificado de manera automática. El resultado es almacenado en el directorio {% ihighlight shell %}_site{% endihighlight %}, lugar desde donde se sirve el sitio web. Este directorio es creado por primera vez cuando ejecutamos {% ihighlight shell %}jekyll serve{% endihighlight %} o {% ihighlight shell %}jekyll build{% endihighlight %}, siendo regenerado cada vez que uno de estos dos comandos se vuelva ejecutar.

En caso que el nuevo _post_ no se mostrase en el índice, podría deberse a que la fecha introducida sea futura, lo que provocaría que _Jekyll_ lo omitiera hasta se cumpliese tal plazo de tiempo.

Vayamos a ver ese flamante nuevo artículo que hemos creado. Si pulsamos sobre el enlace del nuevo _post_ deberíamos ver en el navegador lo siguiente.

{% progressive_picture
  thumbnail: /assets/jekyll-6.thumb.jpg
  src: /assets/jekyll-6.jpg
  height: 1398
  width: 1268
  alt: 'Nuevo post' %}

¡Excelente! Ahora ya sabemos cómo crear un nuevo artículo. Cómo vemos no ha sido necesario demasiada configuración y gracias a un formato de archivo de marcado ligero como _Markdown_, es más sencillo redactar los textos que en _HTML_.

En caso de no saber _Markdown_, podemos leer este [tutorial es castellano][markdown-tut-es]. Si sabemos leer en inglés podemos seguir este otro [tutorial interactivo][markdown-it]. Cuando estemos editando un archivo _Markdown_, recomiendo tener una «chuleta» a mano como referencia. Un ejemplo de chuleta sería esta [página][markdown-cheatsheet]. Como alternativa podemos utilizar un editor _Markdown_, lo cual facilitará la redacción. Hay una lista interesante en el siguiente [enlace][markdown-editors].

Ahora que ya hemos aprendido a escribir artículos, creo que es más fácil entender porque _Jekyll_ es una herramienta orientada a contenido, facilitando la tarea de edición al poner el foco en la redacción de los textos, mientras que por otro lado, también nos permite organizar y editar el contenedor de manera independiente. En definitiva, Jekyll separa ambos entornos de manera efectiva.

Para profundizar más sobre la edición de un _post_ puedes mirar en la [documentación oficial][jekyll-post].

### Borradores
Como su propio nombre indica, son archivos en los que estamos trabajando actualmente y todavía no están listos para ser publicados. Un borrador (_draft_ en inglés) no se diferencia en absoluto de artículo (_post_) excepto en los siguientes puntos.

* Se hallan en la carpeta {% ihighlight shell %}_drafts{% endihighlight %}.
* No es necesario nombrarlos con la fecha como haríamos con un _post_.

{% highlight shell %}
_dratfs/artículo-en-proceso.md
{% endhighlight %}

Cuando consideremos que el borrador ha sido finalizado, lo único que deberemos hacer con el archivo es cambiarlo desde {% ihighlight shell %}_drafts{% endihighlight %} a {% ihighlight shell %}_posts{% endihighlight %} y modificar el nombre del archivo para que incluya la fecha correspondiente.

Por último, si queremos visualizar como están quedando los borradores, ejecutaremos el comando {% ihighlight shell %}jekyll serve{% endihighlight %} con la siguiente opción.

{% highlight shell %}
jekyll serve --drafts
{% endhighlight %}

### Incluir imágenes u otros archivos estáticos
Cualquier blog que se precie no solo contiene texto. Alguna vez querrás incluir alguna imagen o querrás adjuntar enlaces a archivos _pdf_ o cualquier otro formato. A no ser estos archivos sean suministrados desde un [CDN][cdn], los tendrás que almacenar en el propio sitio web.

Cualquier tipo de archivo que no contenga el Front Matter es considerado como un archivo estático. Por lo tanto, imágenes, archivos pdf u de otro tipo son considerados estáticos.

Para hacer más atractivo el artículo que hemos creado previamente añadiremos una imagen. Podemos descargar haz clic [aquí][pixbay]. Normalmente todo el contenido estático me gusta que quede almacenado en un mismo lugar, facilitando la búsqueda y referenciación de los mismos. Por convención, todo este tipo de archivos suele situarse en una carpeta llamada {% ihighlight shell %}assets{% endihighlight %}.

Si ya hemos descargado la imagen, la colocaremos en {% ihighlight shell %}assets/img{% endihighlight %} como puedes ver abajo.

{% highlight shell %}
$ assets/img/staircase-1601133_1920.jpg
{% endhighlight %}

He decidido mantener el mismo nombre del archivo descargado pero puede ser otro si lo prefieres.

Para poder insertar la imagen en el _post_ se debe hacer cómo se especifica en _[Markdown][md-images]_. El archivo queda como se muestra a continuación.

{% highlight md %}
---
layout: post
title: "Lorem ipsum"
date: 2017-03-04 00:15:37 +0100
categories: lorem
---
![Staircase](/assets/img/staircase-1601133_1920.jpg "Staircase")

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sagittis molestie orci, 
a convallis mi cursus ut. Curabitur sit amet enim dolor. Mauris accumsan, ipsum blandit 
ultricies pellentesque, arcu sem viverra est, vitae placerat quam enim a ante.
.
.
.
{% endhighlight %}

El resultado es el siguiente.

{% progressive_picture
  thumbnail: /assets/jekyll-7.thumb.jpg
  src: /assets/jekyll-7.jpg
  height: 823
  width: 784
  alt: 'Artículo con imagen' %}

Esto funcionará correctamente si la carpeta {% ihighlight shell %}assets{% endihighlight %} está situada en el mismo directorio al que apunta el servidor. En caso de econtrarse en un directorio inferior, no se mostrará la imagen puesto que la ruta suministrada el archivo no referenciará donde se halla realmente. Además, es importante saber que cualquier ruta que comience por {% ihighlight shell %}/{% endihighlight %} significa que el archivo se buscará de manera absoluta, es decir desde la raíz del sistema. Tratándose de un servidor será el directorio marcado como contenido web.

Pongamos un ejemplo para entender esto más claramente. Si el blog se titula {% ihighlight shell %}http://mi-pagina.com{% endihighlight %}, nuestro artículo mostrará la imagen correctamente ya que el proyecto colgará desde la misma ruta. Por tanto, la _URL_ completa sería {% ihighlight shell %}http://mi-pagina.com/assets/img/staircase-1601133_1920.jpg{% endihighlight %}. Pero en el caso que el proyecto estivuese alojado en un directorio inferior llamado {% ihighlight shell %}blog{% endihighlight %}, donde estarían todos los archivos pertenecientes a nuestro sitio web, la _URL_ de acceso sería {% ihighlight shell %} http://mi-pagina.com/blog{% endihighlight %}. Esto provocaría que la ruta que señala la imagen (y el resto de archivos) no funcionase puesto que sería incorrecta. La nueva ruta debería contener el nombre del directorio donde se halla actualmente: {% ihighlight shell %}/blog/assets/img/staircase-1601133_1920.jpg{% endihighlight %}. Conformando la _URL_ siguiente {% ihighlight shell %}http://mi-pagina.com/blog/assets/img/staircase-1601133_1920.jpg{% endihighlight %}.

Una solución sería actualizar manualmente todas las rutas que hagan referencia a todos los archivos estáticos, pero a parte de ser una tarea tediosa imagina que el volumen de artículos fuese mayor a 100 y al menos cada uno tuviese una imagen. Llevaría demasiado tiempo cambiarlo todo.

Para solucionar este problema, _Jekyll_ propone dos opciones. Los filtros {% ihighlight shell %}relative_url{% endihighlight %} y {% ihighlight shell %}absolute_url{% endihighlight %}. Estos se utilizarán de la siguiente manera.

{% highlight md %}
![Staircase]({% raw %}{{“/assets/img/staircase-1601133_1920.jpg” | relative_url}}{% endraw %} “Staircase”)

![Staircase]({% raw %}{{“/assets/img/staircase-1601133_1920.jpg” | absolute_url}}{% endraw %} “Staircase”)
{% endhighlight %}

Con {% ihighlight shell %}relative_url{% endihighlight %}, suponiendo que la subruta fuese {% ihighlight shell %}/blog{% endihighlight %}, tras ser procesado el archivo, quedaría de la siguiente manera: {% ihighlight shell %}/blog/assets/img/staircase-1601133_1920.jpg{% endihighlight %}. La función principal de este filtro es prefijar la subruta delante de cualquier ruta suministrada. Esta subruta se especifica en el archivo {% ihighlight yml %}_config.yml{% endihighlight %} con la opción {% ihighlight yml %}baseurl{% endihighlight %}.

{% ihighlight shell %}absolute_url{% endihighlight %} haría lo mismo pero con la ruta completa: {% ihighlight shell %}http://mi-pagina.com/blog/assets/img/staircase-1601133_1920.jpg{% endihighlight %}. Al igual que relative_url también puede ser configurado desde {% ihighlight shell %}_config.yml{% endihighlight %}. La diferencia entre ambos métodos es que {% ihighlight shell %}absolute_url{% endihighlight %} utiliza dos opciones: {% ihighlight yml %}url{% endihighlight %} y {% ihighlight yml %}baseurl{% endihighlight %}. Concatenando respectivamente los valores cada opción se conforma la _url_ absoluta.

Cualquiera de las dos opciones son válidas. Utiliza la que consideres más apropiada. Personalmente suelo utilizar {% ihighlight shell %}relative_url{% endihighlight %} así no tengo que incluir el nombre del dominio en el {% ihighlight shell %}_config.yml{% endihighlight %}, lo cual me proporciona un proyecto agnóstico del dominio que vaya a utilizar. Aunque realmente poco importa, puesto que cada vez que ejecutemos {% ihighlight shell %}jekyll build{% endihighlight %} todas las ruta son contruidas mientras se utilice una de los dos métodos.

## Crear una página
Además de crear artículos también se puede crear páginas estáticas. A diferencia de los _posts_, estas son independientes de la fecha de publicación y la categoría. Exceptuando estos dos requisitos, el resto de opciones de configuración son los mismas.

Podemos crear todas las páginas que deseemos y almacenarlas en cualquier lugar del proyecto. No importa si están en directorios inferiores puesto que la misma estructura de carpetas es replicada en el directorio de salida tras ser procesado por _Jekyll_.

A continuación podemos ver la relación de páginas estáticas en el proyecto con su correspondiente _url_ asociada.

{% highlight shell %}
.
├── _config.yml
├── _posts/
├── _site/
├── about.md      # => http://mi-pagina.com/about.html
├── index.md      # => http://mi-pagina.com/
└── lorem.html    # => http://mi-pagina.com/lorem.html
{% endhighlight %}

Como bien podemos comprobar, el archivo {% ihighlight shell %}lorem.html{% endihighlight %} no existe todavía, así que  vamos a crearlo. Este archivo contendrá un listado con todos los _posts_ que pertenezcan a la categoría lorem, que definimos al crear el anterior artículo. Para ello, tomaremos prestada la estructura definida en la página de inicio ({% ihighlight shell %}index.md{% endihighlight %}).

Al abrir el archivo {% ihighlight shell %}index.md{% endihighlight %} observaremos que está vacío. Si bien recordamos, los _layouts_ nos proveen de un marco contenedor, por lo tanto aunque el archivo no contenga nada, debemos suponer que el _layout_ indicado compone este listado automáticamente. En este caso el _layout_ es {% ihighlight yml %}home{% endihighlight %}. Podemos ver que contiene con el siguiente comando.

{% highlight shell %}
$ cat `bundle show minima`/_layouts/home.html
{% endhighlight %}

A continuación se muestra como queda el archivo {% ihighlight shell %}lorem.html{% endihighlight %}.

{% highlight html %}
---
layout: page
title: Lorem
permalink: /lorem/
---
<ul class="post-list">
{% raw %}{% for post in site.categories.lorem %}{% endraw %}
<li>
  <span class="post-meta">{% raw %}{{post.date | date: "%b %-d, %Y"}}{% endraw %}</span>
  <h2>
    <a class="post-link" href="{{post.url | relaative_url}}">{% raw %}{{post.title | escape}}{% endraw %}</a>
  </h2>
</li>
{% raw %}{% endfor %}{% endraw %}
</ul>
{% endhighlight %}

La dos diferencias fundamentales con {% ihighlight yml %}index.md{% endihighlight %} es la extensión del archivo y el _layout_ utilizado. En este caso hemos usado un archivo _HTML_ ya que nos permite ajustar mas al detalle que un _Markdown_. Por otro el layout es {% ihighlight yml %}page{% endihighlight %}. En caso de haber usado el _layout_ {% ihighlight yml %}home{% endihighlight %}, se mostrarían dos listados: en primer lugar el que acabamos de crear y justo debajo el mismo que muestra la página de inicio. Para evitar este incoveniente usaremos el layout {% ihighlight yml %}page{% endihighlight %} que es el mismo que se define en {% ihighlight shell %}about.md{% endihighlight %}.

Si todo ha sido salido correctamente, en la barra de navegación veremos un nuevo enlace con el nombre lorem.

{% progressive_picture
  thumbnail: /assets/jekyll-8.thumb.jpg
  src: /assets/jekyll-8.jpg
  height: 119
  width: 1600
  alt: 'Cabecera y barra de navegación' %}

Y el resultado de la página es el siguiente.

{% progressive_picture
  thumbnail: /assets/jekyll-9.thumb.jpg
  src: /assets/jekyll-9.jpg
  height: 344
  width: 600
  alt: 'Imagen de la página mostrando las catageríos lorem' %}

¡Genial! Ya tenemos una nueva página creada. Para ver que todo funciona correctamente, te invito a que crees una nueva página bajo la categoría lorem. Verás como automáticamente aparecerá listada aquí.

### Variables
Durante las secciones anteriores hemos estado usando una serie de variables. Estas variables son recopiladas desde el _Front Matter_ y el archivo de configuración global ({% ihighlight shell %}_config.yml{% endihighlight %}) por _Jekyll_, haciéndolas accesibles a través del sistema de plantillas _Liquid_.

Un ejemplo de esto es la siguiente sentencia que devolverá todos los artículos pertenecientes a la categoría _lorem_.

{% highlight liquid %}
{% raw %}{% for post in site.categories.lorem %}{% endraw %}
{% endhighlight %}

En este otro ejemplo desde la variable {% ihighlight liquid %}post{% endihighlight %} se recupera la _URL_ y el título definido en el _post_.

{% highlight html %}
<a class="post-link" href="{% raw %}{{post.url | relaative_url}}{% endraw %}">{% raw %}{{post.title | escape}}{% endraw %}</a>
{% endhighlight %}

Podemos ver la relación completa de estas variables que _Jekyll_ provee en el siguiente [enlace][jekyll-vars].

## _Permalinks_
Los _permalinks_ hacen referencia a la _URL_ permenente de los _posts_ o páginas del blog. _Jekyll_ nos permite configurar cual será esta _URL_ a través de la opción {% ihighlight yml %}permalink{% endihighlight %} mediante el uso de plantillas _URL_ o utilizando un nombre acorde a la especificación _[URI][uri-spec]_ (sin espacios ni diacríticos). Para configurarlo se usaremos la siguiente opción.

{% highlight yml %}
permalink: [variable|estilo|título_que_desees]
{% endhighlight %}

Cómo es de suponer, esta opción se puede incluir en el archivo de configuración global, {% ihighlight shell %}_config.yml{% endihighlight %}, o en el _Front Matter_ al archivo pertinente. Recordemos que la opción _Front Matter_ prevalece ante la configuración global. _Front Matter_ no acepta el uso de plantillas _URL_.

Por defecto, _Jekyll_ utiliza el siguiente la siguiente plantilla.

{% highlight yml %}
permalink: /:categories/:year/:month/:day/:title.html
{% endhighlight %}

Todas los _posts_ del blog tendrán este formato. De hecho este estilo de _permalink_ puede ser modificado por una plantilla predefinida mediante la variable {% ihighlight yml %}date{% endihighlight %} como se muestra a continuación. Podemos consultar todos las variables [aquí][permalink-variables].

{% highlight yml %}
permalink: date
{% endhighlight %}

El valor de {% ihighlight yml %}date{% endihighlight %} equivale a {% ihighlight yml %}/:categories/:year/:month/:day/:title.html{% endihighlight %}.

Personalmente no me gusta este formato de _permalink_, así que lo vamos a cambiar por algo más corto y recordable. Abajo podemos ver un ejemplo.

{% highlight yml %}
permalink: /artículos/:title
{% endhighlight %}

Si configuramos esta opción en el _Front Matter_ de artículo que hemos creado la _URL_ será la siguiente.

{% highlight shell %}
127.0.0.1:4000/articulos/lorem-ipsum
{% endhighlight %}

Esto también modificará el lugar de salida del archivo, situándose bajo la carpeta {% ihighlight shell %}articulos{% endihighlight %}.

Si esta opción es configurada en el {% ihighlight shell %}_config.yml{% endihighlight %}, se atribuirá a todos los _posts_. Abajo podemos ver el resultado del directorio de salida tras cambiar el _permalink_ global.

{% highlight shell %}
_site
├── about
│   └── index.html
├── articulos
│   ├── lorem-ipsum-2.html
│   ├── lorem-ipsum.html
│   └── welcome-to-jekyll.html
├── assets
│   ├── img
│   │   └── staircase-1601133_1920.jpg
│   └── main.css
├── feed.xml
├── index.html
├── lorem
│   └── index.html
└── res.txt
{% endhighlight %}

Para saber más, podemos consultar este [enlace][permalink].

## Configuración
Ahora que ya hemos visto cómo funciona jekyll y cómo crear nuevos artículos y páginas, es hora de saber como se configura. Como vimos antes, en cada uno de _post_ o página podemos especificar las opciones en el _YAML Front Matter_ de manera individual. ALgunas opciones como {% ihighlight shell %}title{% endihighlight %} solo pueden ser declaradas en esta sección. Pero otras se pueden incluir en el archivo de configuración general, {% ihighlight shell %}_config.yml{% endihighlight %}.

Este archivo se halla en la raíz del proyecto. Si no se ha modificado el contenido del archivo es el siguiente.

{% highlight yml %}
title: Your awesome title
email: your-email@domain.com
excerpt: > # this means to ignore newlines until "baseurl:"
  Write an awesome description for your new site here. You can edit this
  line in _config.yml. It will appear in your document head meta (for
  Google search results) and in your feed.xml site description.
baseurl: "" # the subpath of your site, e.g. /blog
url: "" # the base hostname & protocol for your site, e.g. http://example.com
twitter_username: jekyllrb
github_username:  jekyll

# Build settings
markdown: kramdown
theme: minima
gems:
  - jekyll-feed
exclude:
  - Gemfile
  - Gemfile.lock
{% endhighlight %}

Principalmente las opciones se dividen en dos grupos: las relativas al _Front Matter_ y las que _Jekyll_ utilizará para configurar y construir la página web.

En el primer grupo se encontrarían las opciones como que _layouts_ deben utilizarse en todos los _posts_ o el _permalink_ global. Esto evitará que tengamos que incluir estas preferencias en el _Front Matter_ de cada archivo ya que _Jekyll_ lo incluirá por nosotros de manera automática.

Estas opciones se pueden incluir por tipos de archivo como se muestra en la siguiente figura.

{% highlight yml %}
defaults:
  -
    scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
{% endhighlight %}

Con las opciones anteriores estaremos diciendo a _Jekyll_ que el _layout_ por defecto para todos lo artículos sea {% ihighlight shell %}post.html{% endihighlight %}. Cada uno de los {% ihighlight yml %}scope{% endihighlight %} definidos hace referencia al conjunto de archivos filtrados por su tipo (_posts_, _pages_, etcétera). {% ihighlight yml %}path{% endihighlight %} aplicará las preferencias definidas por scope sólo a los archivos que se encuentren bajo la ruta especificada (relativa al proyecto). Si {% ihighlight yml %}path{% endihighlight %} se deja vacío, las preferencias serán aplicadas en todo el proyecto.

Como alternativa, no hace falta escribir la opción y dejarla vacía, simplemente con no incluirla también funcionará. En el siguiente ejemplo podemos ver cómo queda las opciones eliminando las vacías. También se incorpora las páginas.

{% highlight yml %}
defaults:
  -
    scope:
      type: posts
    values:
      layout: post
      permalink: /articulos/:title
  -
    scope:
      types: pages
    values:
      layout: page
{% endhighlight %}

Una vez aplicados estos cambios, las opciones _layout_ pueden ser borradas de los respectivos archivos. Cómo vimos en la sección [permalinks](#permalinks), la opción específica (_Front Matter_) prevalece ante la global ({% ihighlight shell %}_config.yml{% endihighlight %}) por tanto estas preferencias pueden ser sobreescritas en cada archivo.

En el ejemplo anterior también se puede ver la opción {% ihighlight yml %}permalink: /articulos/:title{% endihighlight %} conenido dentro del ámbito de los _posts_.

Otra característica interesante de este archivo de configuración general es poder declarar tantas opciones como así deseemos. Unos ejemplos son las opciones {% ihighlight yml %}title{% endihighlight %}, {% ihighlight yml %}description{% endihighlight %}, {% ihighlight yml %}twitter_username{% endihighlight %} o {% ihighlight yml %}email{% endihighlight %}. Así que si necesitas el uso de alguna variable global, no dudes en crearlas en {% ihighlight shell %}_config.yml{% endihighlight %}. Todas estas opciones están disponibles en la variable global {% ihighlight liquid %}site{% endihighlight %}.

Podemos ver un ejemplo de uso de la {% ihighlight yml %}site.variable{% endihighlight %} title en el _include_ header.html del tema _minima_.

{% highlight html %}
<a class=”site-title” href=”{% raw %}{{ “/” | relative_url }}{% endraw %}”>{% raw %}{{ site.title | escape }}{% endraw %}</a>
{% endhighlight %}

El resto de preferencias pertenecen a cómo _Jekyll_ procesa el proyecto. Entre estas se encuentran opciones como modificiar el directorio de entrada y salida del proyecto, añadir [plugins][jekyll-plugins] o cambiar las opciones del servidor local. Te recomiendo que les eches un vistazo en la [página oficial][jekyll-conf].

**Nota importante**. Debemos tener en cuenta que cualquier modificación realizada en  {% ihighlight shell %}_config.yml{% endihighlight %} requiere que el servidor sea reiniciado para utilizar los nuevos cambios.

### Variables de entorno
En ocasiones hay ciertos contenidos que queremos que solo se muestren en un entorno de desarrollo como los _logs_. También podemos querer incluir una librería analítica, como _google analytics_, cuando la página esté en producción. Para conseguir esto, _Jekyll_ provee una variable de entorno llamada {% ihighlight shell %}JEKYLL_ENV{% endihighlight %}.

Por defecto esta variable se establece como el valor {% ihighlight shell %}development{% endihighlight %} (desarrollo). La otra opción es {% ihighlight shell %}production{% endihighlight %} (producción). Aunque jekyll utiliza estos dos valores por convención, podemos definir tantos como deseemos.

Un ejemplo de esto lo podemos encontrar dentro del tema _minima_. Si abrimos el archivo {% ihighlight shell %}_includes/head.html{% endihighlight %} veremos las siguientes líneas al final del mismo.

{% highlight yml %}
{% raw %}{% if jekyll.environment == 'production' and site.google_analytics %}{% endraw %}
  {% raw %}{% include google-analytics.html %}{% endraw %}
{% raw %}{% endif %}{% endraw %}
{% endhighlight %}

En este caso, se comprueba si la variable de entorno es {% ihighlight liquid %}production{% endihighlight %}` y si en la configuración general ha sido establecida la opción {% ihighlight liquid %}google_analytics{% endihighlight %} con el id como valor. Si bien recordamos, cualquier opción puede ser declarada en {% ihighlight shell %}_config.yml{% endihighlight %}. Por lo tanto si queremos incluir esta librería, tendremos que declarar la variable y cambiar {% ihighlight shell %}JEKYLL_ENV{% endihighlight %} a {% ihighlight shell %}production{% endihighlight %}. Para poder modificarla podemos ejecutar el comando build de la siguiente manera.

{% highlight shell %}
$ JEKYLL_ENV=production jekyll build
{% endhighlight %}

Otra característica importante en _Jekyll_ es poder definir varios archivos de configuración. Estos pueden ser usarlos individualmente o en conjunto. Para ello incluirá la opción {% ihighlight shell %}--config{% endihighlight %} seguida del archivo o archivos (separados por comas) que deseemos utilizar.

{% highlight shell %}
$ jekyll build --config=_config.yml,_config.prod.yml
{% endhighlight %}

Es importante tener en cuenta el orden en que se insertan los archivos. Una misma opción establecida en los dos archivos del ejemplo anterior, tendrá el valor del último archivo concatenado.

## Temas (_Themes_)
Durante todo el taller hemos estado viendo referencias al tema _minima_. Si has seguido el tutorial hasta aquí, sabrás de sobra que este tema se incluye por defecto cada vez que se crea un proyecto nuevo. Este tema se instala junto con el resto de gemas de _Ruby_. Puedes ver como se accede al contenido de esta gema [aquí](#ls-bundle-show).

Puede que nos preguntemos ¿porqué incluir las plantillas y estilos en una librería externa? Y está bien que nos hagas esta pregunta sobre todo teniendo en cuenta que esta caraterística se incluye a partir de la versión [3.2][jekyll-3.2], pues anterior a esta versión el tema se incluía junto al resto de archivos en el proyecto.

La principal ventaja, en el caso que decidamos usar el tema _minima_ o unos de los disponibles, es que estas gemas son mantenidas por una comunidad de desarrolladores. Por lo tanto, cada vez que haya una actualización donde se añaden nuevas características o mejoras, estas se instalarán automáticamente cada vez que ejecutemos el comando {% ihighlight shell %}bundle update{% endihighlight %}. También se pueden actualizar individualmente incluyendo el nombre de la gema al final del mismo comando: {% ihighlight shell %}bundle update minima{% endihighlight %}.

### Instalar un tema
A parte de _minima_ podemos instalar otros temas. Por convención todos los temas tienen el siguiente formato: {% ihighlight shell %}jekyll-theme-nombre{% endihighlight %}. Podemos encontrar todos los disponibles en la de _[RubyGems][jekyll-themes-rubygems]_.

Para exponer como se instala un tema he elegido [cayman][cayman]. Para instalarlo recomiendo crear un nuevo proyecto _Jekyll_ evitando que se ejecute {% ihighlight shell %}bundle install{% endihighlight %}. Para ello incluiremos la opción {% ihighlight shell %}--skip-bundle{% endihighlight %}. Todas la librerías asociadas al proyecto no serán instaladas, entre ellas el propio tema _minima_.

{% highlight shell %}
$ jekyll new --skip-bundle nuevo-proyecto
{% endhighlight %}

Tras esto se deben modificar los archivos {% ihighlight shell %}Gemfile{% endihighlight %} y {% ihighlight shell %}_config.yml{% endihighlight %}. En el primero, buscaremos la línea que contenga la sentencia {% ihighlight ruby %}gem "minima", "~> 2.0"{% endihighlight %} y se cambia por {% ihighlight ruby %}gem "jekyll-theme-cayman", "~> 0.0.3"{% endihighlight %}. En el segundo, modificaremos la opción {% ihighlight yml %}theme: minima{% endihighlight %} por {% ihighlight yml %}theme: jekyll-theme-cayman{% endihighlight %}.

Tras estos pasos, ejecutaremos el comando {% ihighlight shell %}bundle install{% endihighlight %} manualmente para instalar todas las dependecias del proyecto junto con el nuevo tema.

Para poder ver cómo luce el nuevo tema, ejecutaremos el servidor con la instrucción _Jekyll serve_. Pero como veremos, ocurre un error. Esto es debido a que el archivo {% ihighlight shell %}about.md{% endihighlight %} está incluyendo un archivo perteneciente al tema minima que ahora no existe. El error mostrado es el siguiente.

{% highlight shell %}
Liquid Exception: Could not locate the included file 'icon-github.html' in any of
["/Users/enric/Workspace/jekyll-tut/cayman/_includes"]. Ensure it exists in one of those 
directories and, if it is a symlink, does not point outside your site source. in about.md
{% endhighlight %}

Para solucionarlo, debemos editar el archivo en cuestión y borrar las líneas donde se incluya ese archivo. A continuación volvemos a ejecutar el servidor y el proyecto se compilará correctamente. Para verlo, accederemo al siguiente enlace: http://127.0.0.1:4000.

Pero veremos que algo extraño sigue sucediendo. El navegador muestra una página en blanco. La causa de esto es debido a que _minima_ incluía un _layout_ que proporcionaba todo el contenido de la página de inicio. Así que para que este nuevo tema funcione correctamente, se deben crear las plantillas necesarias.

A estas alturas del taller, considero que podrías crear los archivos tú mismo. De hecho te lo recomiendo encarecidamente, es la mejor forma de aprender. Aunque si tuvieses dudas o necesitas ver algunos ejemplos, puedes descargar los fuentes usados en este taller desde [github][jekyll-tut]. Dentro de la carpeta _cayman_ están los archivos usados en esta sección. Vuelvo a insistir que vale la pena que los escribas aunque sea copiándolo a que pegues el archivo directemente.

También podemos encontrar otros temas en diferentes páginas cómo los ejemplos que incluyo a continuación.

* [themes.jekyllrc.org](http://themes.jekyllrc.org/)
* [jekyllthemes.org](http://jekyllthemes.org/)
* [jekyllthemes.io](https://jekyllthemes.io/)

Es importante saber que estos no se instalarán como una gema al igual que hicieramos anteriormente. Normalmente se ofrecen cómo un archivo comprimido que incluirá todos los recursos necesarios para iniciar un proyecto desde cero. La principal diferencia con los temas basados en gemas es que se pierde la ventaja de actualización automática, aunque todos los archivos estarán disponibles en el mismo directorio del proyecto.

### Sobrescribir el tema
Puede que el tema que hayamos elegido al principio nos sirva para la finalidad de nuestro sitio web, pero probablemente, en un momento determinado deseemos extenderlo agregando nuevos estilos o modificando los _layouts_ existentes. Esto es relativamente sencillo, para ello localizaremos cual es el archivo en cuestión para sobrescribir en la carpeta del tema. A continuación, crearemos un archivo con el mismo nombre y lo situaremos en el mismo lugar donde se halle el original en nuestro proyecto. Tras esto ya podremos editar el nuevo archivo.

Esto es debido a que _Jekyll_ busca primero los archivos en el directorio donde se situa el proyecto. En caso de no hallarlos los intenta localizar en la carpeta donde el tema está instalado.

Supongamos que queremos agregar una serie de estilos nuevos en nuestra página. Al abrir el directorio donde está instalado el tema, observamos que el estilo principal se encuentra en la siguiente ruta relativa al tema: {% ihighlight shell %}assets/css/style.scss{% endihighlight %}. Sabiendo esto, debemos crear el mismo archivo bajo la misma ruta en nuestro proyecto. Cuando este se haya reconstruido, utilizará el {% ihighlight shell %}style.scss{% endihighlight %} ubicado en en el proyecto.

Aunque esto tiene un inconveniente: los estilos originales los habremos perdido. Para solucionar este problema deberemos editar este nuevo archivo y añadir la siguiente sentencia.

{% highlight sass %}
---
---
@import "{% raw %}{{ site.theme }}{% endraw %}";

# Agrega aquí tus nuevos estilos
{% endhighlight %}

Con la anterior línea, estaremos indicando a _Jekyll_ que incluya la ruta donde se encuentra el archivo original para que preprocesador de estilos lo pueda importar. Si te has fijado bien, las dos primera líneas son tres guiones consecutivos, esto permite a _Jekyll_ saber que archivo deben ser procesados.

Por defecto, _Jekyll_ soporta _[SASS][sass]_ como generador de estilos, aunque si lo preferimos siempre podemos usar _CSS_. De hecho, incluso, podemos usar ambos formatos.

De la misma manera sobrescribiremos un _layout_ o _include_. La única diferencia es que una vez sobrescrito no habrá manera de poder importarlo como hicimos con los estilos.

Cómo colofón a esta sección, sólo me queda mencionar que podemos crear nuestro propio tema y publicarlo para compartirlo con otros desarrolladores. Aunque por la finalidad del artículo este tema no puede ser tratado, si te interesa puedes saber más en el siguiente [enlace][jekyll-new-theme].

## _Assets_
Durante todo el taller hemos visto que todos los archivos que _Jekyll_ encuentra en el proyecto son procesados si estos llevan al inicio del mismo dos líneas de guiones y son situados en el directorio de salida (por defecto {% ihighlight shell %}_site{% endihighlight %}, aunque esto se puede modicar en el {% ihighlight shell %}_config.yml{% endihighlight %}). También hemos visto que los archivos que empiecen por un guión bajo (_) son omitidos en el resultado de salida. ¿Pero qué pasa con el resto?

El resto de archivos se incluyen en el sitio web resultante. Por lo tanto, todos los recursos como imágenes, estilos y archivos _Javascript_ son importados intactos para su uso. Normalmente por convención estos archivos se situan en el directorio {% ihighlight shell %}assets{% endihighlight %} aunque los podemos ubicar donde queramos.

### Sass
Cómo ya mencioné en el apartado anterior, _Jekyll_ incorpora soporte para _Sass_. Como en todo archivo que _Jekyll_ debe procersar, se deben incluir las dos líneas de tres guiones reglamentarias. Aunque no es necesario incluir estas en el resto de archivos parciales que importan a través de _Sass_. La extensión de estos archivos puede ser {% ihighlight shell %}.scss{% endihighlight %} o {% ihighlight shell %}.sass{% endihighlight %}.

Estos archivos parciales deberán estar situados, una vez más por convención, bajo una carpeta nombrada {% ihighlight shell %}_sass{% endihighlight %} y que colgará en la raíz del proyecto. _Jekyll_ utiliza esta carpeta para «decirle» a _Sass_ donde encontrar los archivos importados. Por supuesto, esta opción puede ser modificada en el {% ihighlight shell %}_config.yml{% endihighlight %} de la siguiente forma.

{% highlight yml %}
sass:
    sass_dir: _sass
    style: compressed
{% endhighlight %}

Cómo podemos ver, también se puede especificar el estilo de salida de los nuevos archivos _CSS_. En este caso los archivos serán comprimidos.

Para ilustrar mejor este proceso supongamos que tenmos la siguiente estructura de carpetas.

{% highlight shell %}
├── _sass
│   ├── _typography.scss
│   ├── _colors.scss
│   └── _welcome-to-jekyll.html
└──css
    ├── main.scss
    └── print.scss
{% endhighlight %}

Tras ser compilado, el contenido de los archivos parciales que hayan sido importados, es agregado en los archivos principales (los que contienen las dos líneas con tres guiones, en este caso {% ihighlight shell %}main.scss{% endihighlight %}) y {% ihighlight shell %}print.scss{% endihighlight %}). El resultado será tal y como se muestra abajo.

{% highlight shell %}
_site
└── css
    ├── main.css
    └── print.css
{% endhighlight %}

En el este [enlace][sass-example] podemos encontrar un ejemplo sobre este proceso.

## Conclusión
Llegados a este punto del taller y con el conocimiento adquirido, deberías poder utilizar _Jekyll_ con cierta soltura. Por supuesto, se que me dejo mucho en el tintero como las [colecciones][jekyll-collections], los [archivos de datos][jekyll-data], los _[plugins][jekyll-plugins]_ o la [paginación][jekyll-pagination] pero he considerado este artículo como una introducción a _Jekyll_ y por tanto el contenido incluido en el taller es más que suficiente para empezar. De hecho, no he incluido esas y otras _features_ por no considerarlas necesarias para la construcción de un blog.

De todas formas, si deseas saber más sobre la herramienta tras estas líneas he incluido una serie de enlaces a los recursos utilizados para elaborar este texto y que puedes usar para ampliar conocimiento.

Te vuelvo a recordar que peudes descargar desde github el [código fuente][jekyll-tut] usado para elaborar este taller y que también puede servirte de ayuda.

## Fuentes
* [jekyllrb.com](https://jekyllrb.com/)
* [jekyll.tips](http://jekyll.tips/)
* [Building a jekyll site](https://css-tricks.com/building-a-jekyll-site-part-1-of-3/)
* [pages.github.com](https://pages.github.com/)
* [Creating project pages using the command line](https://help.github.com/articles/creating-project-pages-using-the-command-line/)
* [Markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
* [Sass guide](http://sass-lang.com/guide)
* [Jekyll on windows](https://davidburela.wordpress.com/2015/11/28/easily-install-jekyll-on-windows-with-3-command* -prompt-entries-and-chocolatey/)
* [Jekyll collections](http://ben.balter.com/2015/02/20/jekyll-collections/)



[html]: https://es.wikipedia.org/wiki/HTML5
[css]: https://es.wikipedia.org/wiki/Hoja_de_estilos_en_cascada
[js]: https://es.wikipedia.org/wiki/JavaScript
[google-search]: https://www.google.es/?gws_rd=ssl#safe=active&q=curso+de+html+y+css&*
[web-course-1]: https://devcode.la/cursos/html-css/
[web-course-2]: https://www.codecademy.com/es/tracks/html-css-traduccion-al-espanol-america-latina-clone
[web-course-3]: http://www.aulafacil.com/cursos/t2204/informatica/crear-paginas-web/html
[web-course-4]: http://blogthinkbig.com/20-cursos-programacion-gratuitos-tomar-linea/
[medium]: https://medium.com/
[wordpress]: https://es.wordpress.com/
[librosweb]: http://librosweb.es
[motivaciones]: /motivaciones
[project]: https://github.com/emoriarty/jekyll-tut
[scroll]: https://es.wikipedia.org/wiki/Scroll
[pag-sta-dyn]: https://es.wikipedia.org/wiki/P%C3%A1gina_web#P.C3.A1ginas_est.C3.A1ticas_versus_p.C3.A1ginas_din.C3.A1micas
[generators]: https://github.com/pinceladasdaweb/Static-Site-Generators
[jekyll]: http://jekyllrb.com/
[github-pages]: https://pages.github.com/
[ruby]: https://www.ruby-lang.org/es/
[git]: https://git-scm.com/
[code]: https://code.visualstudio.com/
[sublime]: https://www.sublimetext.com/
[atom]: https://atom.io/
[vim]: http://www.vim.org/
[notepad]: https://notepad-plus-plus.org/
[web-sites-generator]: https://er1x.github.io/2015/12/generadores-web-estaticas/
[middleman]: https://middlemanapp.com/
[jekyll-current-version]: https://jekyllrb.com/news/2017/03/02/jekyll-3-4-1-released/
[github-co-founder]: https://en.wikipedia.org/wiki/Tom_Preston-Werner
[rvm]: https://rvm.io/
[rbenv]: https://github.com/rbenv/rbenv
[brew]: https://brew.sh/index_es.html
[rbnev-install]: https://github.com/rbenv/rbenv#installation
[chocolatey]: https://chocolatey.org/
[ruby-installer]: https://rubyinstaller.org/
[certificate-issue]: http://guides.rubygems.org/ssl-certificate-update/
[liquid]: https://help.shopify.com/themes/liquid/basics
[markdown]: http://daringfireball.net/projects/markdown/
[minima]: https://github.com/jekyll/minima
[3.2.0]: https://github.com/jekyll/jekyll/pull/4595
[rss]: https://es.wikipedia.org/wiki/RSS
[yaml]: http://yaml.org/
[liquid]: https://shopify.github.io/liquid/
[liquid-doc]: https://shopify.github.io/liquid/basics/introduction/
[lorem-ipsum]: http://es.lipsum.com/
[markdown-tut-es]: https://markdown.es/
[markdown-it]: http://www.markdowntutorial.com/
[markdown-cheatsheet]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
[markdown-editors]: https://markdown.es/editores-markdown/
[jekyll-post]: https://jekyllrb.com/docs/posts/
[cdn]: https://es.wikipedia.org/wiki/Red_de_entrega_de_contenidos
[pixbay]: https://pixabay.com/es/escalera-berl%C3%ADn-arquitectura-1601133/
[md-images]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#images
[jekyll-vars]: http://jekyllrb.com/docs/variables/
[uri-spec]: https://tools.ietf.org/html/rfc3986#section-2
[permalink-variables]: https://jekyllrb.com/docs/permalinks/#template-variables
[permalink]: https://jekyllrb.com/docs/permalinks/
[jekyll-plugins]: https://jekyllrb.com/docs/plugins/
[jekyll-conf]: https://jekyllrb.com/docs/configuration/
[jekyll-3.2]: https://jekyllrb.com/news/2016/07/26/jekyll-3-2-0-released/
[jekyll-themes-rubygems]: https://rubygems.org/search?utf8=%E2%9C%93&query=jekyll-theme
[cayman]: https://github.com/pages-themes/cayman
[jekyll-tut]: https://github.com/emoriarty/jekyll-tut
[sass]: http://sass-lang.com/
[jekyll-new-theme]: https://jekyllrb.com/docs/themes/#creating-a-gem-based-theme
[jekyll-collections]: https://jekyllrb.com/docs/collections/
[jekyll-data]: [jekyll-collections]
[jekyll-plugins]: https://jekyllrb.com/docs/plugins/
[jekyll-pagination]: https://jekyllrb.com/docs/pagination/
[sass-example]: https://github.com/jekyll/jekyll-sass-converter/tree/master/example

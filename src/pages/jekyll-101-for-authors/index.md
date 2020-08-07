---
title: Jekyll 101 for Authors
date: "2020-08-05T00:00:00.284Z"
language: "en"
---
The purpose of this guide is to help those people who wants to have a personal or company website, a blog or just whatever kind of website.

No matter the approach chosen to build a website, a minimal technical knowledge is required. This means that someone must help you to build a site. You can hire someone or a friend can give you a hand. In the vast majority of cases, everyone ends up with a wordpress site. Which is good. But sometimes it is a bit overwhelming using wordpress to build a simple static website.

Wordpress processes requests using a php engine in order to build the required page. Each time a user makes a new page request, the server where wordpress is installed executes a new task to build just in time the page. While this behaviour is interesting on complex sites, it seems a bit overwhelming for the most websites and blogs around the globe.

Unlike Wordpress, Jekyll is a static site generator. What does it mean? It means, the website, is generated before its use. Once the content is built, it can be deployed without the need of any engine at all. Servers (Apache, Nginx) know how to handle these files.

Basically, what a browser needs is an HTML file with its style (CSS) and script (Javascript) counterparts. After requesting a web page, that is what a browser gets: a simple (or complex) HTML file. There's no need for extra time processing.

This difference makes also cheaper the required resources to host and maintain a website.

Of course, both tools cannot be compared. While Jekyll is a small fast boat that makes possible creating simple websites, wordpress is such a big ship which offers much more than the building (compilation) process.

One of the drawbacks in Jekyll is that it makes the author to  work very close to the technical side. Sometimes, you'll find yourself struggling how to add a picture in some blog post. But the necessary know-how is not as hard as it may seems. In fact, it can be quite rewarding changing by yourself the look of the website.

Just like wordpress, Jekyll should be installed by someone who knows about. He/She is the responsible to let you how to run the Jekyll website in your local machine. So, leaving aside technical matters, let's dive into Jekyll.

*If you are one of those who likes to fiddle around with things, you can check [how to install Jekyll]((https://jekyllrb.com/docs/installation/)) in the official docs.*

## Jekyll Folder Structure

The first big difference with wordpress is that you're not going to use the browser to access any of its elements. Most of the time you're going to be using the file explorer of your OS. Before getting into the different available features, it's worth taking a look at the structure of a Jekyll website.

```bash
├── Gemfile
├── _config.yml
├── _data
├── _drafts
├── _includes
├── _layouts
├── _posts
├── _sass
└── index.md
```

The default installation comes with a [preinstalled theme](https://jekyll.github.io/minima/). A Jekyll theme is a set of all the resources (HTML, style and script files) required to build a website. You can know more about themes [here](https://jekyllrb.com/docs/themes/). Perhaps you can find one theme that fits for your website.

`Gemfile` and `_config.yml` are configuration files. Most probably, you’re not going to use them after being set. They are out of scope of this guide but sometimes we’ll get into them, specifically `_config.yml`, to set some options like the website title and description among other things.

## Structure folders

`_layouts` folder keeps the templates used in your website. Basically it is source code that you won't touch very much. 

A layout file describes the whole structure of an specific page like a post. Even the content between posts is different, the page design is the same: a header, a title, the body content, a footer, sidebar options, etcetera.

Another layout example can be the homepage. Usually differs from the rest of the site. 

The About page can have its own layout too.

The `_includes` folder stores reusable parts that compose a webpage. The header (with the navigation links) is a clear example. Instead of copying the same HTML markup among different layouts, the header can be included from another file called `_includes/header.html`. So there’s no need for repeating.

An include file may receive arguments, too. This way, some parts of the file can change according to the context where it has been used: a post page can show one description while the homepage shows another.

`_sass` directory keeps the stylesheets used in the website. Again, this is another folder that is good to know for what it is for, but you're not going to fiddle with too much.

So far, we've seen the files related with the site's structure. Let's check site's content pertinent folders . The ones you're actually interested in.

## Pages


Basically, a website is composed of pages and posts. A post is no more than another page meant to be read like an article in a magazine or journal, indeed.

A web page is an HTML file. Jekyll allows authors to write pages a format file called markdown. The markdown format permits authors focus in content without losing the structure design capability. A typical markdown file extension is `.md` or `.markdown`. E.g. `about.md`. This file is transformed into an HTML after the site has been built.

A web page can be stored anywhere in a Jekyll folder. Most commonly you want to keep them at the root folder. This way, files are accessible by appending the file name in the url: `https://mywebsite.com/about.html`.

Remember, the `index.html` is the default page shown when a url is accessed: `https://mywebsite.com`.

This server feature can be used to prettify the url. Not only works with root folders, it's possible to create an `index.html` within nested folders. Carry on with the `about.md` example, instead creating an `about.html` right in the Jekyll root, it can be generated within a folder named `about` containing an `index.html`. When reaching the about page, the url will look like `https://mywebsite.com/about`.

This option may be set globally or by page using the `permalink` variable. We'll see in a bit.

An example of a markdown file looks like the figure shown below.

```markdown
---
layout: default
title: About
---
Lorem ipsum dolor sit amet...
```

The file starts with three dashes in what looks like a set of options and ends with another three dashes. This is what is called the **frontmatter**.
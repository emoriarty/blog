---
title: The Hoisting Madness in Monorepos (a Case Study)
date: "2020-04-04T00:00:00.284Z"
language: "en"
---

I know, I know. The title is a bit hyperbolic. But it is about catching your attention. So if you're reading then it worked. Anyway, when hoisted dependencies problems come up, maybe it is not a total madness, but at least it is going to be a good headache as the case here mentioned.

Recently, in the project I’m currently working on, a bug was introduced and some forms stopped working. Looking closely at the stack trace revealed the formik library was doing something it never did before: the `formik` object was undefined were isn't supposed to be.

Mysteriously, not each form stopped working. It looked like some crazy random bug that didn't happen the day before. Meaning the last changes had something to do. Always are the last changes.

The quick fix was to revert where it was working.

But here is the funny fact: even present forms before the merge were not working either. Then the only thing that could happen is the formik library was updated when it was not supposed to.


## Monorepo

We're working on a monorepo basis: each package is self-contained with its dependencies set. yarn manages the shared stuff through the [workspaces](https://classic.yarnpkg.com/en/docs/workspaces) feature.

In the last commits, one of those packages introduced a new dependency on formik. Let's call it `X`. In the `X` package, the formik version used was the `^2.1.2`. While the rest of the packages were relying on version `^1.5.8`. Well, not all the packages. The same search revealed a second package `Y` was also including another formik version: `^2.0.5`. Immediately we'll see how this third package can break the balance.

Packages `X` and `Y` are web apps. We also use shared libs. One of them is where common user interface components are stored. Let's called it `UI`. `UI` includes form components depending on formik.

The monorepo was keeping up the formik version `1.5.8`. All the `UI` form components relied on that version. After the conflicting merge, the new package `X` was added and the new hoisted version changed to `2.1.2`. Remember the `Y` package? Well, packages `X` and `Y` managed to move the new formik upwards and move the old version into context packages. Nothing would happen if `Y` did not include an updated formik version. `1.5.8` would keep hoisted.

Nevertheless, this should not be an issue at all if each package had declared fomik as a dependency. But that wasn't the case for the UI package.

## Node Module Resolution

What happened here is because of how the node module resolution works. When the node runtime machine finds the `require` (`import` from es6) sentence, the resolver starts by first looking at the directory where the file currently is. If it is no there, it goes to the parent directory. And so on until it finds the dependency or reaches the root directory and throws an error.

There's a difference when the imported file is relative (`'./module'`, `'../module'`) or is a package name (`'package-name'`). For the last, it will look for the `node_modules` folder. In both apply the resolution ascent. Anyway, you can read more on this topic in the [node modules documentation](https://nodejs.org/api/modules.html). Also, the [Typescript documentation](https://www.typescriptlang.org/docs/handbook/module-resolution.html) is really good on this matter.

Yarn relies on this behavior to do the hoisting for the workspaces feature.

## Missing dependency

Now we have a grip on how node resolves for modules. Let's see the specific issue with the missing dependency.

`UI` package did not declare the formik dependency. So what was supposed to be the `1.5.8` version is now `2.1.2`. This is the expected behavior when the installed dependency on monorepo root folder has been hoisted to `2.1.2`.

This happened because a new package, `X`, has been introduced in the monorepo. `X`, instead of declaring the formik dependency to the `1.5.8` version, yarn fetches the most recent version. This change made the yarn to hoist to the new most spread formik version, `2.1.2`.

Everything would be fine if the `UI` package had declared the `formik` dependency. Because it didn't, the node module resolver did not find anything in the nested `node_modules` folder, so it goes up on the folder tree to look for it. Bingo, formik was found in the workspace root `node_modules` folder. But not the good version.

## Installing the dependency

Once knowing the reason why an issue like this can happen, the fix seems pretty easy. On first thought, we decide to install the formik dependency in the `UI` package. Let's do it.

```
$ cd UI
$ yarn add formik@1.5.8
```

The `package.json` now includes the dependency installed in its internal `node_modules` folder. Well, that's not true at all. Remember the workspace hoisting. Now it is again the `1.5.8` the most widespread `formik` dependency. It is installed again in the root `node_modules` folder. But in this case, it doesn't mind. What's important is that each package declares its version of formik.

Now, when running the `X` package, the one including `UI`, it should work fine. Shouldn't it?

The answer is **no**. After testing a bit a new error like the one below happens.

```
ERROR in /Users/enriquearias/Workspace/monorepo/packages/X/src/components/Forms/OneRandomForm.tsx(21,10):
21:10 Module '"../../../../../../../../../../Users/enriquearias/monorepo/packages/X/node_modules/formik/dist"' has no exported member 'FormikActions'.
```

Can you see why the problem remains?

**Quick answer: there are two formik versions sharing the same context.**

The error above is one of the many unexpected results that can be found in a corrupted environment like this.

Let's see how to fix it properly.

## The Solution

The first question we must ask is if a library should include a third party dependency or should be managed by the hosting package?

Well, roughly speaking, that depends on the library's target.

If the library is supposed to be a companion, or simply adding new elements based on another library, it seems a good candidate to not be added as a dependency. These kinds of packages are also called *plugins*.


On the other hand, if the external dependency is used internally, it is appropriate to be set as a required dependency.

Based on this premise, it looks appropriate not adding formik as a dependency of the `UI` package.

Of course, perhaps we want to do some testing using formik. For that purpose, the dependency should be added as a development dependency. That will prevent the `UI` package from being packed by bundlers like webpack which relies on how dependencies are declared in the `package.json`.

```
{
...
“devDependencies”: {
  “formik”: “^1.5.8”,
  ...
  },
}
```

To prevent those other packages, like `X`, adding an incompatible version of the `formik` library, `UI` must warn on what formik version relies. It can be done by declaring a peer dependency.

## Enter the Peer Dependencies.

To help package managers to be aware of what versions a hosting package should use, plugin packages must declare on its `package.json` what dependencies and their versions are based upon. For this matter, the `peerDependencies` property was [introduced quite some time ago](https://nodejs.org/en/blog/npm/peer-dependencies/).

As you expect, peer dependencies are meant to be used as we'd do for development or required dependencies. Following the formik issue, the `UI` `package.json` looks like below.

```
{
...
“peerDependencies”: {
  “formik”: “^1.5.8”,
  ...
  },
}
```

After updating the `package.json`, the next time yarn is executed in the workspace, it will raise a warning like below to remind what versions should be installed alongside the `UI` dependency.

```
warning "workspace-aggregator... > @monorepo/UI@0.1.0" has unmet peer dependency "formik@^1.5.8".
```

From now on, each time `UI` is used a warning will remind us to install the proper `formik` version. What it rest to do is changing the current formik version to the one required: `1.5.8`. And everything is fine.

## Conclusions

Preventing any node project ending up being a total madness dependency nightmare goes through a good comprehension of how dependencies are managed. Even more important when working on a monorepo basis. Below these lines there are some interesting links can help to gain a better comprehension of this subject.

But we’re not alone figuring out what version of a package has been hoisted. Yarn offers a command to check what dependencies have been hoisted and which packages are using it. The command in question is called `why`.


```
$ yarn why formik
=> Found "formik@1.5.8"
info Has been hoisted to "formik"
info Reasons this module exists
   - "workspace-aggregator-ec62dbed-443f-486a-b6f7-896c9473a3a4" depends on it
   - Hoisted from "_project_#@monorepo#X#formik"
   - Hoisted from "_project_#@monorepo#Z#formik"
info Disk size without dependencies: "1.15MB"
info Disk size with unique dependencies: "8.99MB"
info Disk size with transitive dependencies: "22.58MB"
info Number of shared dependencies: 23
=> Found "@monorepo/Y#formik@2.1.2"
info This module exists because "_project_#@monorepo#Y" depends on it.
info Disk size without dependencies: "960KB"
info Disk size with unique dependencies: "8.8MB"
info Disk size with transitive dependencies: "8.93MB"
info Number of shared dependencies: 12
✨  Done in 2.67s.
```
The example shows the output after asking `yarn why formik` is on the monorepo folder. As we see, the formik hoisted version is `1.5.8` used along packages `X`, and `Z`. On the other hand, package `Y` is using the version `2.1.2`, isolated in its context-dependency tree.

Even the command is helpful enough, I miss not having a detailed entire view of all the shared dependencies across the monorepo. Perhaps one day, if I find enough time, I can give it try to build a dependency tree explorer.

## External Resources
* [Peer depdencencies at node blog](https://nodejs.org/en/blog/npm/peer-dependencies/)
* [Yarn dependency types](https://classic.yarnpkg.com/en/docs/dependency-types/)
* [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces)
* [Node modules](https://nodejs.org/api/modules.html)
* [Typescript - Node modules resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)

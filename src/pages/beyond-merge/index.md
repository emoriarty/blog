---
title: Beyond Merge
date: "2019-05-01T16:31:03.284Z"
language: "en"
translations: [ "es", "es/mas-alla-de-merge" ]
---

Everyone who has spent some time working with git irremediably knows about
merging. Suppose we have a branch called *A* coming from master. The `merge`
command brings the changes carried in *A* into *master*.

```bash
71a621b (HEAD -> master) (A) A file updated
2dc6065 (A) new A file
76a1097 Demo file updated
a31e004 README updated
44d4c5b New README file
ee42779 New demo file
```

It does works fine, changes are placed ahead the *master* branch.

```bash
1———2———3———A1———A2
```

The log reflects an incremental order of commits, or put in other words,
the commits are shown in the same order were added. A timeline of changes.

When these modifications have happened at the same time in a *B* branch, which
is not as rarely as it seems, the merge strategy cannot do a fast-forward
update (bring changes ahead).

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

Because changes did happened in the same time frame, the merge command makes
use of a recursive strategy intertwining *A* and *B* commits.

```bash
1———2———3———B1———A1———B2———A2
```

Interlaced commits don’t keep proper track of branching blocks. Indeed, as seen
above, the *B* commits precede the ones from *A*, when in fact they were introduced
after. Besides, the commits are not aligned by meaning, each belonging commit to A
should be placed before the *B* ones.

There is a way to prevent this scenario once a feature is completed. Instead of
merging the whole bunch of commits, a better option is pushing the changes into
*master* (or develop) as a unique commit with a descriptive message. This
approach improves the git log traceability.

Perhaps for personal or one-man sized projects is not too important (it is better
to keep at good habits, though) having a strict sorted timeline of events.
But when comes to big teams where each feature needs to be perfectly isolated and
tagged, an unsorted log history would make the difference between mayhem and
harmony in the enterprise.

For those newbies in git (and whose did not find much time to dive into) 
there’s more than only merging.

Let’s go beyond merge.

## Rebase

Unlike merge, rebase allows to do a merge based on a feature branch keeping
track of those related commits blocks in the same slot.

```bash
1———2———3———A1———A2———B1———A2
```

The above picture shows how the the origin branch conserves a linear order
according to the working blocks and not by timestamps.

A convenient way to prevent conflicts while working on a feature branch is to
bring frequently the latest changes from origin branch.

```git
git rebase <origin-branch> 
```

Given the next branching state.

```bash
        B1———B2
       /
A1———A2———A3———A4
```

`rebase` permits removing momentarily the current commits (the ones that are not
present in the origin branch), put in place the new changes and install on top
feature commits again.

```bash
                  B1———B2
                 /
A1———A2———A3———A4
```

While updating the branch is intended to be carried out as often as possible,
sometimes the differences between both branches are too complex that conflicts
arise. As with merge, conflicts must be resolved but interactevely. `rebase` let
us decide what to do in case of conflicts: fix them and continue or abort. Below
there's a list of available actions when conflicts occur.

```bash
git rebase --continue # follow rebase
git rebase --skip     # jump current conflict
git rebase —-abort    # stop rebase and leave things as they were
git rebase --quit     # like abort but keeping the committed changes
```

## Forcing push for rebased branches

It can happen when rebasing, sometimes, the remote repository rejects new 
changes because of the rebase itself. The rejection message will read something 
about our local branch is behind the remote one.

When the rebase is executed, the new changes coming from the origin branch,
are placed before the current branch commits stack, desynchronising
with the remote picture. In this particular case, the message is confusing, 
git asks to update from the remote when, actually, we don’t want.

In order to solve this problem, the push command can be forced by passing the 
`--force` option.

```bash
git push --force
```

__Never, ever, force a push on a collaborative branch__. It will destroy 
modifications being carried out by other repository members and you will 
become a hatred object among colleagues. Only use `--force` with your own 
branches exclusively and under your own risk.

To prevent possible overwritings on the remote branch, there is the 
`--force-with-lease` option. Whilst the `--force` option will push changes no 
matter what, `--force-with-lease` won’t allow any update if some other 
collaborator has added changes to the remote branch.

So, remember, always is preferable not forcing a push action but if there's no
other way, then make use of `--force-with-lease`.

```bash
git push --force-with-lease
```

## Choosing commits

While working in a branch we don't pay much attention how the the commit 
history looks like. In fact we are focused on development. But when the current 
work is already completed, is time to sort the log.  By accumulating all those
non-useful commits, we will end up looking like we’re suffering Diogenes syndrome.

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

The upper log shows a log history where the master branch (*d9ad32e*) and the 
local HEAD (*259aff2*) points to different commits. Except the first commit 
(*2dc6065*) there are no meaningful descriptions between them. Since each commit 
refers to the same feature, a suitable solution to arrange the log is to use 
`rebase` to join them into one commit. 

`rebase` is not only an alternative to the merge command. Actually, the command 
is meant to rewrite the project history. With that notion in mind, `rebase` is 
able to be used in the same branch. Instead of specifying a branch name, a 
previous commit is passed in. Actually a branch name is not more that a 
meaningful name pointing to a commit.

There is more regarding the rebase. It can be executed automatically by default 
or interactively by passing the `-i` option. The Interactive mode gives the 
possibility to rearrange the log by modifying each commit with a specific command.

```bash
g rebase -i d9ad32e
```

After running the previous command, the default editor pops out opening the 
next file. In my case, vim is the default editor but you can set out yours 
by using the git config [core.editor][coreditor] option.

```bash
reword 2dc6065 new A file
fixup 71a621b A file updated
fixup 7a48555 wip: body content
fixup 259aff2 body edit

# Rebase d9ad32e..259aff2 onto d9ad32e (4 commands)
```

`fixup` or `f` for short, merges in bulk the marked commits with the previously 
picked one. In difference with `squash`, `fixup` don't reuse the provided message.

`reword` allows to rewrite the commit message. `rebase` executes the provided 
actions after saving the file and closing the editor. When the task has been 
completed, the editor jumps again, allowing us to introduce the new commit description. 

Once the rebase has completed, the next log looks like below.

```bash
2569f57 (HEAD -> A) feature A
d9ad32e (master) A new commit is introduced while previous changes are in stash
13b16a5 Revert "README updated"
76a1097 Demo file updated
a31e004 README updated
44d4c5b New README file
ee42779 New demo file
```
## Lots of related commits

Sometimes it happens to have a sudden idea while working on in a total different 
subject. You stop working immediately what you're at and start on that new idea. 
Damn serendipity!

The next steps from a git perspective are (1) saving things up and (2) create a 
new branch. Now, we are able to work in whatever is that brilliant idea. The 
git loop starts: Work. Test things up. Save progress. And back to the beginning
of the loop until the job is done.

Finally we go back to the unfinished branch and start working again in the same loop.

Lots of commits are created during this process. All of them refers to the same
topic. So, why keeping all these commits when actually only one commit per branch
will do? Is it not easier to search in the log for a commit with a one nice and
concise message than looking for a bunch of different commits? Are they in the
same slot? Do they got interlaced among unrelated commits?

All right, we can pick and merge commits by doing a rebase, but why bother when
we already know everything relates to the same piece? Why not “squash” all of
them in the same first commit? Sure we can.

Let’s tackle the *autosquash* feature.

### Autosquash (or how to keep a clean log while working)

```bash
1a9bfea (HEAD -> A) New A file
d9ad32e (master) A new commit is introduced while previous changes are in stash
13b16a5 Revert "README updated"
76a1097 Demo file updated
a31e004 README updated
44d4c5b New README file
ee42779 New demo file
```

After the first commit (*1a9bfea*), we see that we're going to work over the same
file, so the next ones can be coerced up to be part of the first commit in the
current branch by using the option `--fixup`. 

```bash
git commit —fixup=1a9bfea
```

As you recall *fixup* is one of the actions present in the *rebase* command.
Similarly, this *fixup* option allows merging the current commit into the
provided one. But first let's see the resulting log.

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

Have you noticed the “fixup!” prefix in the last commit message? Also the
message is the same of the previous commit. Wait! wasn’t supposed to be merged
into the provided commit? Yes, it is. But don’t worry. It’s imperative to keep
the changes in the log, otherwise they could get lost. Later on will see how
they are merged.

There is another way to *fixup* commits. Instead providing a specific commit hash,
a commit message can be look through by a matching text. The first match will
be used as entry point for the *fixup*.

```bash
git commit —fixup=:/A\ file
```

Now, let’s say we change and commit the *README* file. Then work again in the
previous file a commit with the *fixup* option again. The resulting log should
look like the picture below.

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

At this point, the feature branch is completed. Let’s rebase from where the
new log series was established, the commit hash *d9ad32e*.

```bash
git rebase -i —-autosquash d9ad32e 
```

The `—-autosquash` option automatically moves every commit message beginning with
“fixup!” right before the commit marked to be modified.

```bash
pick 7eadcf3 New A file
fixup c913bb3 fixup! New A file
fixup e8bd977 fixup! fixup! New A file
fixup 77ca177 fixup! fixup! fixup! New A file
pick e8fe7f6 README updated

# Rebase d9ad32e..77ca177 onto d9ad32e (5 commands)
```

We can appreciate how git automatically has replaced the default pick command
by *fixup*. git knows how to do so because we previously marked the commits were
going to be squashed into the selected commit. The way the order was kept is by
adding a new "fixup!" prefix to the commit message. The more prefixes,
the next in line.

After saving the file the rebase takes action and the resulting log would look
like this.

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

In order to have a more complete example both files are separate commits. The
`README` file update could be part of the same commit, keeping a tighter and
coherent log.

## Squashing a branch into master

The last way we are going to see how to squash non-useful commits (at least
from a global perspective) can be done by passing the `--squash` option when
executing a merge command.

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

By looking at the current log, we see branch *A*, *B* and *master* are  pointing to
commits *d571d6c*, *1ac6aff* and *d9ad32e*, respectively. We decide it is time to
squash *A* and *B* branches into *master* but we don’t want to keep the current
commits from both branches. With one commit will be enough to bring both
features. Remember the examples depicted here have an informational purpose,
in real world we will do a commit per branch in order to preserve a succinct
but complete log.

Let’s merge first the *B* branch.

```bash
git merge --squash B
```

If we check the log again, will see no new commit. A squashing merge does not
complete the operation at all. The index state is modified with the changes from
*B* branch but the pending commit is left for the user. At this point let’s
also merge by squashing the *A* branch and commiting the changes.

```bash
git merge --squash A && git commit
```

The resulting log do not leave a trace of the individual commits from branches
*A* and *B* merged in *master*. Only one commit stands for changes done in both
branches.

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

The last thing to do after is removing the feature branches. Once merged, there's no need for them.

And this is the final log without feature branches.

```bash
* ee34439 - (HEAD -> master) Squashed commit of the following: (12 hours ago) <Enrique Arias>
* d9ad32e - A new commit is introduced while previous changes are in stash (3 weeks ago) <Enrique Arias>
* 13b16a5 - Revert "README updated" (3 weeks ago) <Enrique Arias>
* 76a1097 - Demo file updated (3 weeks ago) <Enrique Arias>
* a31e004 - README updated (3 weeks ago) <Enrique Arias>
* 44d4c5b - New README file (3 weeks ago) <Enrique Arias>
* ee42779 - New demo file (3 weeks ago) <Enrique Arias>
```

Hope these advices on how git can be used so to maintain an incremental, readable
and clean log are helpful. Perhaps it does not look too important keeping a
sorted log but, believe me, the repo maintaner will be grateful. And also by
doing these practices day by day will have an positive impact in your
professional career. So don’t have a messy log, let the work talk for you.

[coreditor]: https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration#_code_core_editor_code

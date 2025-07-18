---
title: VSCode and Git
sequence: 2
description: Shortcuts and useful features that you should know about the tools you use everyday
languages:
  - vscode
  - git
---


VSCode is extremely powerful software and it's frankly amazing that it's free. But the courses we take never really go over how to take advantage of what VSCode can do, particularly when it comes to interacting with Git. So I wanted to go over some of the features I use that help me in my work.

## VSCode Features

### 1. Git Integration
VSCode's integration with Git is by far the most common feature I use. Knowing how to use `git` in the command line is important and all, but it's so much faster to use a UI sometimes, particularly for complicated actions.

`commit`, `push`, `pull` and `branch` are the most common things I do, all of which are available in the "Source Control" sidebar menu in VSCode.

### 2. Extensions
VSCode has a wide library of community made extensions that are really powerful. Some of the extensions I most use are:
- Code Spell Checker - Spell check for code files
- Prettier - A one-click code formatter for Javascript/Typescript
- Git Graph - Visually see commits and branches
- GitLens Free - See metadata on who last edited a line of code and when right in the file editor
- Indent Rainbow - Colourize tabs and spaces for indentation
- Live Share - Remotely connect to someone else's VSCode. It's better than screen share
- Bookmarks - "Bookmark" a certain line of code so you can jump back to it

## Git & GitHub
We also made extensive use of GitHub in the project, and it's important to remember the distinction between the two.
1) Git is a **Source Control Manager**, meaning it helps you manage iterations of software and see changes made over time. Git on its own is **decentralized**, meaning all git clients, such as your computers, (typically) have the full history of the git repo downloaded.

2) GitHub is **Software as a Service (SaaS)**. It integrates with Git to manage a **centralized** location to store, track, and manage changes to your repository. Git clients can connect with GitHub to `pull` and `push` commits to one central place.

A tool similar GitHub is effectively essential in corporate projects. As a basic example, if you were managing a multi-million dollar project, you probably would want to limit who was allowed to issue new builds of your software, and GitHub allows you to do that, whereas barebones Git does not. 

Plus, GitHub offers additional features to Git, such as Issues, Pull Requests (Branch Merge Requests) and **Continuous Integration/Continuous Development (CI/CD)**. I am using a CI pipeline in our project to automatically build new versions of this website whenever changes are made to the `web` folder. You can see what that looks like [here](https://github.com/SFU-CMPT353-S25-DBS/Project/blob/main/.github/workflows/deployWeb.yaml).

### 1. Pull Requests
Especially in industry, you often have a "main" branch, being the branch that has the latest changes. We call this branch "stable", meaning "the most bug-free" (ideally bugless (imagine haha)) branch we have.

When you're developing a new feature though, you're going to go through multiple iterations of instability and partial-completion. To avoid gunking up the main branch, we use **feature branches**.

Once your new feature is ready to go, how do you merge it back to main in a way that alerts everyone what you're about to do? GitHub (and most similar software) will have a concept of a "Pull Request"/"Merge Request"/etc. 

Pull requests are a declaration of intent. Plus, in the GitHub world, this let's you link your feature branch to a "work item" like an issue in GitHub. They give others a chance to review your work before merging, and a chance for automated checks to run and validate that your code doesn't *look* like it will break anything.

### 2. Git Bisect
When you start working at a Job, you'll eventually be asked to fix a bug that cropped at *at some point*. So how do you track it down?

One option is to go back in time to before the issue existed and try to figure out what commit introduce it. That's where `git bisect` comes in.

Bisect uses a Binary Search (yes, that one, from first year algorithms) to quickly zoom in on the specific commit that created the bug. You tell a git a commit that is "definitely good" and a commit that is "definitely bad" and then Git will start stepping through the commit tree to find the problem. 

If your good and bad commits are separated by say, 500 commits (which isn't that outlandish), you can narrow in on the problematic commit in about 9 steps (`log_2(500)`)

Here's a good post on this: https://stackoverflow.com/questions/4713088/how-do-i-use-git-bisect

Unfortunately, VSCode doesn't have a UI for using bisect, but the command interface isn't too hard:

1. Make sure you don't have any uncommitted changes

2. Run `git bisect start`. If this doesn't work, you might have started a bisect previously and never finished it. Run `git bisect reset` then try again.

3. Go find a bad commit. If you aren't currently on the bad commit, check it out via `git checkout`. Then run `git bisect bad`
> Alternatively, you can directly use the [Commit Hash](https://github.com/SFU-CMPT353-S25-DBS/Project/commits/main/) (being the string of characters on the right of the linked page) and run `git bisect bad commitHash`

4. Go find a good commit and check it out via `git checkout`, then run `git bisect good`, or use the commit hash directly like before

5. Git bisect will now go an check out a commit. **Manually check if the error you had still exists here**. If it does, run `git bisect bad`, otherwise run `git bisect good`.

6. Repeat until finished. When done, bisect will leave you on the offending commit. Before making a patch, make sure to jump back to the latest commit on the branch (or run `git bisect reset`)

7. If at any point you need to abort, run `git bisect reset`


### 3. Git Stash
Imagine you're working on something in a feature branch but need to switch to something else. You might not want to make a commit if your changes are still very unstable, so what do you do? I use stashes.

A stash is like a commit, but doesn't exist in the commit tree in the same way. I can throw my uncommitted, in-progress work into a stash and jump elsewhere. When I return, I can "pop" the stash to get my changes back. Nice and easy.

VSCode has a UI to create and retrieve stashes somewhere in the "Source Control" sidebar. You'll probably want to use "Stash (included untracked)".  Otherwise it will only stash changes made to pre-existing files, not brand new files.

### I don't know what else to put here
Git is something where you just kinda learn how to use as you need too. I think the most important note here is to **take advantage of the features of the tools you use**, especially VSCode's Git UI. University doesn't necessarily teach you the "best way" to do something (the best way being the method that works best for you).
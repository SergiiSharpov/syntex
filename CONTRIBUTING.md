# Contributing to Syntex

Thanks for your interest in Syntex. Our goal is to create a fast, scalable, open-source library for code parsing.

## Getting Started

An easy way to get started helping the project is to *file an issue*. You can do that on the issues tab by clicking on the green button at the right. Issues can include bugs to fix, features to add, or documentation that looks outdated. 

## Contributions

Syntex welcomes contributions from everyone.

Contributions to Syntex should be made in the form of GitHub pull requests. Each pull request will
be reviewed by a core contributor (someone with permission to land patches) and either landed in the
main tree or given feedback for changes that would be required.

## Pull Request Checklist

- Branch from the master branch and, if needed, rebase to the current master
  branch before submitting your pull request. If it doesn't merge cleanly with
  master you may be asked to rebase your changes.

- Commits should be as small as possible while ensuring that each commit is
  correct independently (i.e., each commit should compile and pass tests). 

- Don't put submodule updates in your pull request unless they are to landed
  commits.

- If your patch is not getting reviewed or you need a specific person to review
  it, you can @-reply a reviewer asking for a review in the pull request or a
  comment.

- Add tests relevant to the fixed bug or new feature.

- Run `npm run test` to ensure that all tests are passed.

- Run `npm run lint` to ensure that your code is linted correctly.

All code in this repository is under the MIT License.

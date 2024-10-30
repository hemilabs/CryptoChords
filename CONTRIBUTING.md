# Contributing to Crypto Chords

## Thank you for your interest in contributing!

The following describes the guidelines to contribute to the Crypto Chords dapp, documentation, API reference and code examples.
The purpose of this document is to create a contribution process that:

- Encourages new community contributions.
- Encourages contributors to remain involved.
- Avoids unnecessary processes and bureaucracy whenever possible.
- Creates a transparent decision making process that makes it clear how contributors can be involved in - decision making.

## Table of contents

How can I contribute?

1. Fork and Edit
2. About the Code
3. Reporting Bugs
4. Suggesting Enhancements
5. Pull Requests
6. Issue and Pull Request labels

### 1. Fork and edit

To contribute to this repository, you will need to fork it, make changes and submit a pull request. This section is a brief guide on how to do this whilst making sure your forked repository stays up to date the with the official one.

- Fork this repository to your own GitHub account and then clone it to your local device.
- Create a new branch: `git checkout -b MY_BRANCH_NAME`
- Follow the next steps detailed in the README.md file

### 2. About the Code

You don't need to set any special code styling, since our repos already includes ESLinting once you clone it. Every time you commit and push your contributions, all code is stylized according to our standards.

- Start reading our code and you'll get the hang of it. We optimize it for readability.
- This is a monorepo repository managed by [Turborepo](https://turbo.build/repo/docs)
- There is a [API](./apps/api/), a [WEB](./apps/web/) applications and both are following the [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) principles.
- There is also a [Shared](./packages/shared/) package that contains code that both apps can use.

### Documentation Styleguide

Use [Markdown](https://daringfireball.net/projects/markdown)

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### 3. Reporting bugs

First of all make sure that the bug was not already reported by searching on GitHub under `Issues`.
When you are creating a bug report, please include as many details as possible.

General tips:

- If you're unable to find an open issue addressing the problem, open a new one. Be sure to include a title and clear description, as much relevant information as possible, and a code sample or an executable test case demonstrating the expected behaviour that is not occurring.
- Determine which repository the problem should be reported in.
- Perform a cursory search to see if the problem has already been reported. If it has and the issue is still open, add a comment to the existing issue instead of opening a new one.
- Provide a step-by-step description of the suggested enhancement in as many details as possible.
- Provide specific examples to demonstrate the steps. Include copy/pasteable snippets (when applicable) which you use in those steps, as Markdown code blocks.
- Describe the current behaviour and explain which behaviour you expected to see instead and why.
- Include screenshots and/or animated GIFs which help you demonstrate the steps or point out the part of Crypto Chords which the issue is related to. You can use this tool to record GIFs on macOS and Windows, and [this tool](https://github.com/raiseerco/peek) on Linux.
- Specify the name and version of the OS/Browser/other applicable software you're using.

### 4. Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Crypto Chords, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion and find related suggestions.

Note: Please don't file an issue to ask a question. You'll get faster results by using the resources below.

Before submitting an enhancement suggestion, check if there is already a filed one which provides that enhancement.

First of all, you can validate it with the community, our official channels are:

- [Discord](https://discord.gg/hemixyz)
- [Twitter](https://twitter.com/hemi_xyz)

How Do I Submit A (Good) Enhancement Suggestion?

General tips:

- Use a clear and descriptive title to identify the suggestion.
- Provide a step-by-step description of the suggested enhancement in as many details as possible.
- Provide specific examples to demonstrate the steps. Include copy/pasteable snippets which you use in those examples, as Markdown code blocks.
- Describe the current behaviour and explain which behaviour you expected to see instead and why.
- Include screenshots and/or animated GIFs which help you demonstrate the steps or point out the part of Crypto Chords which the suggestion is related to. You can use this tool to record GIFs on macOS and Windows, and [this tool](https://github.com/raiseerco/peek) on Linux.
- Explain why this enhancement would be useful to most Crypto Chords users.
- Specify the name and version of the OS/Browser/other applicable software you're using.

### 5. Pull Requests

The process described here has several goals:

- Maintain repository quality
- Fix problems that are important to users
- Engage the community in working toward the best possible product
- Enable a sustainable system for Crypto Chords's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

- Follow the styleguides as stated in step [#2](#2-code-styleguides)
- If the pull request features a UI improvement, please include a screenshot in order to let maintainers to have a glimpse of it.
- After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing.

`If a status check is failing, and you believe that the failure is unrelated to your change, please leave a comment on the pull request explaining why you believe the failure is unrelated. A maintainer will re-run the status check for you. If we conclude that the failure was a false positive, then we will open an issue to track that problem with our status check suite.`

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

### 6. Issue and Pull Request Labels

#### Type of Issue and Issue State

| Label name    | Description                                                               |
| ------------- | ------------------------------------------------------------------------- |
| `enhancement` | Feature requests.                                                         |
| `bug`         | Confirmed bugs or reports that are very likely to be bugs.                |
| `question`    | Questions more than bug reports or feature requests (e.g. how do I do X). |
| `feedback`    | General feedback more than bug reports or feature requests.               |


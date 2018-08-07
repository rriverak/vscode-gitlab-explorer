# VS Code - Gitlab Explorer

[![](http://vsmarketplacebadge.apphb.com/version-short/jasonn-porch.gitlab-mr.svg
)
![](http://vsmarketplacebadge.apphb.com/installs-short/jasonn-porch.gitlab-mr.svg
)
![](http://vsmarketplacebadge.apphb.com/rating-short/jasonn-porch.gitlab-mr.svg
)](https://marketplace.visualstudio.com/items?itemName=jasonn-porch.gitlab-mr)

VS Code extension for working with Gitlab Project Items, supporting both Gitlab.com and self-hosted Gitlab EE/CE Servers.

## Features

* Explore your GitLab hierarchy with Groups, Projects, etc..
* View Issues and Discssions in VSCode

## Planned
* Show Gitlab Todos and Jump in TreeView 
* Create / Edit Issues in VSCode
* Create / Edit Comment in VSCode

## Extension Settings

* `gitlab-explorer.serverAddress`: GitLab Server URL. (HTTPS is Required!)
* `gitlab-explorer.personalToken`: Personal access token to use the Gitlab API.

### Settings Example

**Gitlab.com Example**
```json
"gitlab-explorer.personalToken": "MY_PERSONAL_TOKEN"
```

**SelfHosted Example**
```json
"gitlab-explorer.serverAddress": "https://mydomain.com/relativepath/gitlab"
"gitlab-explorer.personalToken": "MY_PERSONAL_TOKEN"
```

 

## Links

* Visual Studio Marketplace: [https://marketplace.visualstudio.com/items?itemName=jasonn-porch.gitlab-mr](https://marketplace.visualstudio.com/items?itemName=jasonn-porch.gitlab-mr)
* Repo: [https://github.com/rriverak/vscode-gitlab-explorer](https://github.com/rriverak/vscode-gitlab-explorer)
* Known Issues: [https://github.com/rriverak/vscode-gitlab-explorer/issues](https://github.com/rriverak/vscode-gitlab-explorer/issues)
* Change Log: [https://github.com/rriverak/vscode-gitlab-explorer/blob/master/CHANGELOG.md](https://github.com/rriverak/vscode-gitlab-explorer/blob/master/CHANGELOG.md)

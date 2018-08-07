# VS Code - GitLab Explorer

[![](http://vsmarketplacebadge.apphb.com/version-short/jasonn-porch.gitlab-mr.svg
)
![](http://vsmarketplacebadge.apphb.com/installs-short/jasonn-porch.gitlab-mr.svg
)
![](http://vsmarketplacebadge.apphb.com/rating-short/jasonn-porch.gitlab-mr.svg
)](https://marketplace.visualstudio.com/items?itemName=jasonn-porch.gitlab-mr)

VS Code extension for working with GitLab Project Items, supporting both GitLab.com and custom GitLab Servers.

## Features

* Explore your GitLab hierarchy with Groups, Projects, etc..
* View Issues and Discssions in VSCode

## Planned
* Show Gitlab ToDos and Jump in TreeView 
* Create / Edit Issues in VSCode
* Create / Edit Comment in VSCode

## Extension Settings

* `gitlab-explorer.serverAddress`: GitLab Server URL.
* `gitlab-explorer.personalToken`: Personal access token to use the GitLab API.

To create a `gitlab-explorer.personalToken` with `api` Scope follow the instructions in the Gitlab documentation.   
- [[Gitlab.com] Creating a personal access token](https://docs.gitlab.com/ce/user/profile/personal_access_tokens.html#creating-a-personal-access-token)

### Settings Example

#### Gitlab.com Example
```json
"gitlab-explorer.personalToken": "MY_PERSONAL_TOKEN"
```
*If `gitlab-explorer.serverAddress` is not set, it use Gitlab.com by default.*

#### Custom Server Example  
```json
"gitlab-explorer.serverAddress": "https://gitlab.mydomain.com" 
"gitlab-explorer.personalToken": "MY_PERSONAL_TOKEN"
```
Its also possible to use a ReverseProxy or SSL Offloading.

```json
"gitlab-explorer.serverAddress": "https://mydomain.com/someSegement/gitlab" 
"gitlab-explorer.personalToken": "MY_PERSONAL_TOKEN"
```
>*For Security Reasons Gitlab-Explorer serves only HTTPS Resources. Including Uploads and Assets in Markdown*


## Links

* Visual Studio Marketplace: [https://marketplace.visualstudio.com/items?itemName=jasonn-porch.gitlab-mr](https://marketplace.visualstudio.com/items?itemName=jasonn-porch.gitlab-mr)
* Repo: [https://github.com/rriverak/vscode-gitlab-explorer](https://github.com/rriverak/vscode-gitlab-explorer)
* Issues: [https://github.com/rriverak/vscode-gitlab-explorer/issues](https://github.com/rriverak/vscode-gitlab-explorer/issues)
* Change Log: [https://github.com/rriverak/vscode-gitlab-explorer/blob/master/CHANGELOG.md](https://github.com/rriverak/vscode-gitlab-explorer/blob/master/CHANGELOG.md)

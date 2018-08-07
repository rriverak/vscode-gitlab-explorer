# VS Code - GitLab Explorer

VS Code extension for working with GitLab Project Items, supporting both GitLab.com and custom GitLab Servers.

![image](https://user-images.githubusercontent.com/7319154/43791222-4f2006ae-9a75-11e8-855c-08e9c53dff0a.png)

## Features

* Explore your GitLab hierarchy with Groups, Projects, etc..
* View Issues and Discssions in VSCode

## Planned
* Improve UI in Views
* Show Gitlab ToDos and Jump in TreeView 
* Create / Edit Issues in VSCode
* Create / Edit Comment in VSCode

## Extension Settings

* `gitlab-explorer.serverAddress`: GitLab Server URL.
* `gitlab-explorer.personalToken`: Personal access token to use the GitLab API.

To create a `gitlab-explorer.personalToken` with `api` Scope follow the instructions in the Gitlab documentation.   
- [[Gitlab.com] Creating a personal access token](https://docs.gitlab.com/ce/user/profile/personal_access_tokens.html#creating-a-personal-access-token)

### Required Settings

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

* Visual Studio Marketplace: [https://marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=rrivera.vscode-gitlab-explorer)
* Repo: [https://github.com/rriverak/vscode-gitlab-explorer](https://github.com/rriverak/vscode-gitlab-explorer)
* Issues: [https://github.com/rriverak/vscode-gitlab-explorer/issues](https://github.com/rriverak/vscode-gitlab-explorer/issues)
* Change Log: [https://github.com/rriverak/vscode-gitlab-explorer/blob/master/CHANGELOG.md](https://github.com/rriverak/vscode-gitlab-explorer/blob/master/CHANGELOG.md)

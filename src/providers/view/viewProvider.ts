import * as vscode from 'vscode';
import { AssetProvider } from '../asset-provider';
import { IView } from './IView';
import { ITreeNode } from '../gitlab/ITreeNode';
import { CommentView } from '../../templates/commentView';
import { Comment } from '../../Models/Comment';
import { GitlabAPIProvider } from '../gitlab/api';
import { Issue } from '../../Models/Issue';
import { IssueView } from '../../templates/issueView';

export class GitlabView {
	private viewProvider: ViewProvider;
    
	constructor(context: vscode.ExtensionContext, assetProvider:AssetProvider, private apiProvider:GitlabAPIProvider) {
        this.viewProvider = new ViewProvider(assetProvider, apiProvider);


		vscode.commands.getCommands(true).then((cmds)=>{
			cmds = cmds.filter((cmd)=>{
				if(cmd === 'gitlabView.openView'){
					return true;
				}
			});
			if(cmds.length === 0){
                let openViewDispatcher = vscode.commands.registerCommand('gitlabView.openView', (element:ITreeNode) => this.OpenViewCommand(element));
				context.subscriptions.push(openViewDispatcher);
			}
		});
    }
    
    OpenViewCommand(element:ITreeNode){
        let view:IView|undefined;
        switch (element.GetContextValue()) {
            case "Issue":
                let issue:Issue = element as Issue;
                view = new IssueView(issue, issue.ProjectRef);            
            break;
            case "Comment":
                let comment:Comment = element as Comment;
                view = new CommentView(comment, comment.ProjectRef);            
            break;
        }
        if(view){
            this.viewProvider.CreateView(view);
        }
    }
}

export class ViewProvider {
    private assetProvider: AssetProvider;
    private panel:vscode.WebviewPanel | undefined;
    constructor(assetProvider:AssetProvider, private apiProvider:GitlabAPIProvider){
        this.assetProvider = assetProvider;
    }

    CreateView(view:IView){
        if(!this.panel){
            const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
            this.panel = vscode.window.createWebviewPanel('gitlabProjetViewType', view.GetPanelTitle(), column || vscode.ViewColumn.One, {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(this.assetProvider.GetBasePath()),
                    vscode.Uri.file(this.assetProvider.GetBasePathCSS()),
                    vscode.Uri.file(this.assetProvider.GetBasePathJS())
                ]
            });

            this.panel.onDidDispose(()=>{
                this.panel = undefined;
            });
        }  
        this.SetPanelAsync(view);
    }

    private async SetPanelAsync(view?:IView){
        if(view && this.panel){
            this.panel.title = view.GetPanelTitle();
            let content = await view.GetHTMLAsync(this.apiProvider);
            this.panel.webview.html = this.WrapHTMLContent(content, this.apiProvider.GetAbsoluteUrl(view.GetProjectRef()));
        }
    }

    WrapHTMLContent(content:string, baseUrl:string):string{
        return `
        <html>
            <head>
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: vscode-resource: https: http:; script-src 'unsafe-inline' https: vscode-resource:; style-src 'unsafe-inline' https: vscode-resource:;">
                ${this.GetStyleTagForUri("markdown.base.css")}
                ${this.GetScriptTagForUri("jquery-3.3.1.slim.min.js")}
                <script>
                    $(function(){
                        window.LazyImageBaseUrl = '${baseUrl}';
                        window.MardownStyleLightTag = '${this.GetStyleTagForUri("markdown.light.css")}';
                        window.MardownStyleDarkTag = '${this.GetStyleTagForUri("markdown.dark.css")}';
                    })
                </script>
            </head>
            <body>
                ${content}

                ${this.GetScriptTagForUri("themeSelector.js")}           
                ${this.GetScriptTagForUri("lazyImages.js")}           
            </body>    
        </html>
        `;
    }

    GetStyleTagForUri(filename:string):string{
        return `<link rel="stylesheet" type="text/css" href="${this.assetProvider.GetUriCSS(filename).with({ scheme: 'vscode-resource' })}">`;
    }
    GetScriptTagForUri(filename:string):string{
        return `<script src="${this.assetProvider.GetUriJS(filename).with({ scheme: 'vscode-resource' })}"></script>`;
    }
}
'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { GitlabAPIProvider } from './Providers/gitlab/api';
import { GitlabExplorer } from './Providers/gitlab/explorer';
import { AssetProvider } from './providers/asset-provider';
import { GitlabView } from './providers/view/viewProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('"vscode-gitlab" is now active!');

    const configuration = vscode.workspace.getConfiguration();
    InitExtensionWithConfiguration(context,configuration);

    vscode.workspace.onDidChangeConfiguration((e: vscode.ConfigurationChangeEvent)=>{
        InitExtensionWithConfiguration(context,configuration);
    });
}

export function InitExtensionWithConfiguration(context:vscode.ExtensionContext, configuration:vscode.WorkspaceConfiguration){
    configuration = vscode.workspace.getConfiguration();        
    const serverAddress:string = configuration.get('gitlab-explorer.serverAddress') || "https://gitlab.com";
    const personalToken:string = configuration.get('gitlab-explorer.personalToken') || "";
    
    if(serverAddress && personalToken){
        InitExtension(context, configuration, serverAddress, personalToken);
    }else{
        vscode.window.showWarningMessage('GitLab Explorer: Please set your "Personal API Token" in Configuration!');
    }
}
export function InitExtension(context:vscode.ExtensionContext, configuration:vscode.WorkspaceConfiguration, serverAddress:string, personalToken:string){
        try{

            const apiProvider = new GitlabAPIProvider(serverAddress, personalToken);    
            const assetProvider = new AssetProvider(context);
            const explorer = new GitlabExplorer(context, apiProvider);
            const view = new GitlabView(context, assetProvider, apiProvider);
                
            nop(view);
            nop(explorer);
        }catch(error){
            console.log(error);
        }
}

export function nop(obj:any){}

export function deactivate() {
}
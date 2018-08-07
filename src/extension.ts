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
    //URL => https://gitlab.com
    //Token => Jq2TXjTmU8Zxn-tzzy1m

    //MailPro
    //https://www.mailprofessionals.de/git
    //N2JF3Nfy5F3cmusiYbEw
    const apiProvider = new GitlabAPIProvider("https://www.mailprofessionals.de/git","N2JF3Nfy5F3cmusiYbEw");    
    const assetProvider = new AssetProvider(context);
    const explorer = new GitlabExplorer(context, apiProvider);
    const view = new GitlabView(context, assetProvider, apiProvider);
    nop(view);
    nop(explorer);
}

export function nop(obj:any){}

export function deactivate() {
}
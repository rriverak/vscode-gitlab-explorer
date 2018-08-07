import * as vscode from 'vscode';
export interface ITreeNode{
    GetTreeItemLabel():string;
    GetTreeItemIcons():IconPath;
    GetTreeItemCommand():vscode.Command | undefined;
    GetTreeItemID():string;
    GetTreeItemCollapsibleState():vscode.TreeItemCollapsibleState;
    GetContextValue():string;
}

export interface IconPath{
    light:string;
    dark:string;
}
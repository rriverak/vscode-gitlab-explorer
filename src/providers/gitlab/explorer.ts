import * as vscode from 'vscode';
import { ITreeNode } from './ITreeNode';
import { GitlabAPIProvider } from './api';
import { Group } from '../../Models/Group';
import { Issue } from '../../Models/Issue';
import { IssueLabel } from '../../Models/IssueLabel';
import { Project } from '../../Models/Project';

export class GitlabExplorer {

	private gitlabExplorerProvider: GitlabExplorerProvider;

	constructor(context: vscode.ExtensionContext, apiProvider:GitlabAPIProvider) {
        this.gitlabExplorerProvider = new GitlabExplorerProvider(apiProvider);
        vscode.window.registerTreeDataProvider('gitlabExplorer', this.gitlabExplorerProvider);

		vscode.commands.getCommands(true).then((cmds)=>{
			cmds = cmds.filter((cmd)=>{
				if(cmd === 'gitlabExplorer.refresh'){
					return true;
				}
			});
			if(cmds.length === 0){
				let cmdRefresh = vscode.commands.registerCommand('gitlabExplorer.refresh', () => this.RefreshTreeView(), this);
				context.subscriptions.push(cmdRefresh);
			}
		});
    }
    
    public RefreshTreeView(){
        vscode.window.showInformationMessage('Refresh Gitlab-Tree!');
        this.gitlabExplorerProvider.refresh();
    }
}

export class GitlabExplorerProvider implements vscode.TreeDataProvider<ITreeNode> {

	private _onDidChangeTreeData: vscode.EventEmitter<ITreeNode | undefined> = new vscode.EventEmitter<ITreeNode | undefined>();
	readonly onDidChangeTreeData: vscode.Event<ITreeNode | undefined> = this._onDidChangeTreeData.event;

	constructor(private apiProvider:GitlabAPIProvider) {
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: ITreeNode): vscode.TreeItem {
		let node =  new vscode.TreeItem(element.GetTreeItemLabel(), element.GetTreeItemCollapsibleState());
        node.id = element.GetTreeItemID();
        node.iconPath = element.GetTreeItemIcons();
        node.command = element.GetTreeItemCommand();
		node.contextValue = element.GetContextValue();
        return node;
    }

	getChildren(element?: ITreeNode): Thenable<ITreeNode[]> {
		return new Promise((resolve, reject)=>{

			if(!element){
				this.apiProvider.GetGroupsAsync().then((data)=>{
					resolve(data);
				});
			}else{
				this.getChildrenForNode(element).then((data)=>{
					resolve(data);
				}); 
			}
		});
	}
	
	getChildrenForNode(element: ITreeNode):Promise<Array<ITreeNode>>{
		switch (element.GetContextValue()) {
			case "Group":
				return this.apiProvider.GetProjectOrSubgroup(element as Group);
				break;
			case "Project":
				return this.apiProvider.GetProjectLabelsAsync(element as Project);
				break;
			case "IssueLabel":
				return this.apiProvider.GetIssueByLabelsAsync(element as IssueLabel);
				break;
			case "Issue":
				return this.apiProvider.GetCommentsAsync(element as Issue);
				break;
			default:
				return new Promise((resolve)=>{
					resolve([]);
				});
		}
	}
}



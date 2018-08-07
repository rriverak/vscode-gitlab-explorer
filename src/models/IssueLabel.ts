import * as vscode from 'vscode';
import { ITreeNode, IconPath } from '../providers/gitlab/ITreeNode';
import { ItemTypeEnum } from './Enum';
import { AssetProvider } from '../providers/asset-provider';
import { IRequestable } from '../providers/gitlab/IRequestable';
import { Project } from './Project';

export class IssueLabel implements ITreeNode, IRequestable {
        public ParentProject:Project;
        private raw_data: any;
        constructor(raw: any, parentProject:Project) {
                this.raw_data = raw;
                this.ParentProject = parentProject;
        }

        GetRequestID(){
                return this.raw_data["id"];
        }

        GetProjectRequestID(){
                return this.raw_data["board"]["project"]["id"];
        }

        //TreeNode

        GetTreeItemIcons(): IconPath {
                if(AssetProvider.current){
                        return AssetProvider.current.GetSVGPathByType(ItemTypeEnum.IssueLabel);
                }
                return { light: "", dark: "" };
        }
        GetTreeItemLabel(): string {
                return this.raw_data["label"]["name"];
        }
        GetTreeItemCommand(): vscode.Command  | undefined {
                return {
                        title:"Open View",
                        command:"gitlabView.openView",
                        arguments:[this]
                };             
        }
        GetTreeItemID(): string {
                return `${ItemTypeEnum[ItemTypeEnum.Project]}_${this.raw_data["id"]}`;
        }
        GetTreeItemCollapsibleState(): vscode.TreeItemCollapsibleState {
                return vscode.TreeItemCollapsibleState.Collapsed;
        }

        GetContextValue():string{
                return ItemTypeEnum[ItemTypeEnum.IssueLabel];
        }
}
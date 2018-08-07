import * as vscode from 'vscode';
import { ITreeNode, IconPath } from '../providers/gitlab/ITreeNode';
import { ItemTypeEnum } from './Enum';
import { AssetProvider } from '../providers/asset-provider';
import { IRequestable } from '../providers/gitlab/IRequestable';
import { Group } from './Group';

export class Project implements ITreeNode, IRequestable {
        private raw_data: any;
        public ParentGroup:Group;
        constructor(raw: any, parentGroup:Group) {
                this.raw_data = raw;
                this.ParentGroup = parentGroup;
        }

        GetProjectRef(){
                return this.raw_data["path_with_namespace"];
        }

        GetRequestID(): string {
                return this.raw_data["id"];
        }
        //TreeNode
        GetTreeItemIcons(): IconPath {
                if(AssetProvider.current){
                        return AssetProvider.current.GetSVGPathByType(ItemTypeEnum.Project);
                }
                return { light: "", dark: "" };
        }
        GetTreeItemLabel(): string {
                return this.raw_data["name"];
        }
        GetTreeItemCommand(): vscode.Command  | undefined {
                return undefined;         
        }
        GetTreeItemID(): string {
                return `${ItemTypeEnum[ItemTypeEnum.Project]}_${this.raw_data["name"]}_${this.raw_data["id"]}`;
        }
        GetTreeItemCollapsibleState(): vscode.TreeItemCollapsibleState {
                return vscode.TreeItemCollapsibleState.Collapsed;
        }

        GetContextValue():string{
                return ItemTypeEnum[ItemTypeEnum.Project];
        }
}
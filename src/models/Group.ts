import * as vscode from 'vscode';
import { ITreeNode, IconPath } from '../providers/gitlab/ITreeNode';
import { ItemTypeEnum } from './Enum';
import { AssetProvider } from '../providers/asset-provider';
import { IRequestable } from '../providers/gitlab/IRequestable';

export class Group implements ITreeNode, IRequestable {
        private raw_data: any;

        constructor(raw: any) {
                this.raw_data = raw;
        }

        GetRequestID():string{
                return this.raw_data["id"];
        }

        GetParentID():string|null{
                return this.raw_data["parent_id"];
        }

        //TreeNode
        GetTreeItemIcons(): IconPath {
                if(AssetProvider.current){
                        return AssetProvider.current.GetSVGPathByType(ItemTypeEnum.Group);
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
                return `${this.GetContextValue()}_${this.raw_data["path"]}_${this.raw_data["id"]}`;
        }
        GetTreeItemCollapsibleState(): vscode.TreeItemCollapsibleState {
                return vscode.TreeItemCollapsibleState.Collapsed;
        }
      
        GetContextValue():string{
                return ItemTypeEnum[ItemTypeEnum.Group];
        }
}
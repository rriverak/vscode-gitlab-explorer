import * as vscode from 'vscode';
import { ITreeNode, IconPath } from '../providers/gitlab/ITreeNode';
import { ItemTypeEnum } from './Enum';
import { AssetProvider } from '../providers/asset-provider';
import { IRequestable } from '../providers/gitlab/IRequestable';
import { IMarkdownConvertable } from '../providers/gitlab/IMarkdownConvertable';
import { Issue } from './Issue';

export class Comment implements ITreeNode, IRequestable, IMarkdownConvertable {
        private raw_data: any;
        public ParentIssue:Issue;

        constructor(raw: any, parent:Issue) {
                this.raw_data = raw;
                this.MarkdownContent = this.raw_data["body"]; 
                this.HTMLContent = ""; 
                this.ParentIssue = parent;
                this.ProjectRef = this.ParentIssue.ParentIssueLabel.ParentProject.GetProjectRef();
        }

        GetAuthor():string{
                return this.raw_data["author"]["name"];
        }

        GetAuthorAvatarURL():string{
                return this.raw_data["author"]["avatar_url"];
        }
        
        GetAuthorDate():string{
                let dateTime = new Date(this.raw_data["created_at"]);

                return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()} UTC`;
        }
        
        GetBody():string{
                return this.raw_data["body"];
        }

        GetHTMLBody():string{
                return this.GetBody();
        }

        GetCreated():string{
                return this.raw_data["created_at"];
        }

        GetAttachments(){
                return this.raw_data["attachment"];
        }

        //Mardown Remote Convert
        public MarkdownContent:string;
        public ProjectRef:string;
        public HTMLContent:string;
        //GitlabAPI

        GetRequestID(){
                return this.raw_data["id"];
        }

        //TreeNode

        GetTreeItemIcons(): IconPath {
                if(AssetProvider.current){
                        return AssetProvider.current.GetSVGPathByType(ItemTypeEnum.Comment);
                }
                return { light: "", dark: "" };
        }
        GetTreeItemLabel(): string {
                return this.raw_data["body"];
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
                return vscode.TreeItemCollapsibleState.None;
        }

        GetContextValue():string{
                return ItemTypeEnum[ItemTypeEnum.Comment];
        }
}


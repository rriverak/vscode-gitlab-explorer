import * as vscode from 'vscode';
import { ITreeNode, IconPath } from '../providers/gitlab/ITreeNode';
import { ItemTypeEnum } from './Enum';
import { AssetProvider } from '../providers/asset-provider';
import { IRequestable } from '../providers/gitlab/IRequestable';
import { IssueLabel } from './IssueLabel';
import { IMarkdownConvertable } from '../providers/gitlab/IMarkdownConvertable';

export class Issue implements ITreeNode, IRequestable, IMarkdownConvertable {
        private raw_data: any;
        public ParentIssueLabel:IssueLabel;
        constructor(raw: any, parentIssueLabel:IssueLabel) {
                this.raw_data = raw;
                this.ParentIssueLabel = parentIssueLabel;
                this.MarkdownContent = this.raw_data["description"];
                this.ProjectRef = this.ParentIssueLabel.ParentProject.GetProjectRef();
                this.HTMLContent = "";
        }

        GetAuthor():string{
                return this.raw_data["author"]["name"];
        }
        GetAuthorAvatarURL():string{
                return this.raw_data["author"]["avatar_url"];
        }
        GetTitle():String{
                return this.raw_data["title"];
        }

        GetBody():string{
                return this.raw_data["description"];
        }

        GetHTMLBody():string{
                return this.GetBody();
        }

        GetCreated():string{
                return this.raw_data["created_at"];
        }


        //GitlabAPI

        GetRequestID(){
                return this.raw_data["id"];
        }

        GetRequestIID(){
                return this.raw_data["iid"];
                
        }
        GetRequestProjectID(){
                return this.raw_data["project_id"];
        }

        //Mardown Remote Convert
        public MarkdownContent:string;
        public ProjectRef:string;
        public HTMLContent:string;
        
        //TreeNode

        GetTreeItemIcons(): IconPath {
                if(AssetProvider.current){
                        return AssetProvider.current.GetSVGPathByType(ItemTypeEnum.Issue);
                }
                return { light: "", dark: "" };
        }
        GetTreeItemLabel(): string {
                return this.raw_data["title"];
        }
        GetTreeItemCommand(): vscode.Command  | undefined {
                return {
                        title:"Open View",
                        command:"gitlabView.openView",
                        arguments:[this]
                }; 
        }
        GetTreeItemID(): string {
                return `${ItemTypeEnum[ItemTypeEnum.Project]}_${this.raw_data["title"]}_${this.raw_data["id"]}`;
        }
        GetTreeItemCollapsibleState(): vscode.TreeItemCollapsibleState {
                return vscode.TreeItemCollapsibleState.Collapsed;
        }

        GetContextValue():string{
                return ItemTypeEnum[ItemTypeEnum.Issue];
        }
}
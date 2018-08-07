import axios, {AxiosRequestConfig, AxiosInstance} from 'axios';
import { Group } from '../../Models/Group';
import { Project } from '../../Models/Project';
import { Issue } from '../../Models/Issue';
import { Comment } from '../../Models/Comment';
import { IssueLabel } from '../../Models/IssueLabel';
import { IMarkdownConvertable } from './IMarkdownConvertable';
import * as vscode from 'vscode';

export class GitlabAPIProvider {
    static current: GitlabAPIProvider;

    private httpClient:AxiosInstance; 
    private apiBaseUrl:string;
    constructor(apiBase:string, privateToken:string){
        
        let cfg:AxiosRequestConfig = {
            baseURL: apiBase + '/api/v4',
            headers: {'Private-Token': privateToken}          
        };
        
        this.apiBaseUrl = apiBase;
        this.httpClient = axios.create(cfg);
    }

    public Init(apiBase:string, privateToken:string){
        let cfg:AxiosRequestConfig = {
            baseURL: apiBase + '/api/v4',
            headers: {'Private-Token': privateToken}          
        };
        
        this.apiBaseUrl = apiBase;
        this.httpClient = axios.create(cfg);
    }

    public GetAbsoluteUrl(relPath:string):string{
        return this.apiBaseUrl + '/' + relPath;
    }

    async GetGroupsAsync():Promise<Array<Group>>{
        let groups:Array<Group> = [];
        try {
            let response = await this.httpClient.get('/groups');
            groups = response.data.map((group:any)=>{
                return new Group(group);
            }) as Array<Group>;
            groups = groups.filter((g)=>{ return g.GetParentID() === null; }); //Only Root Groups
        } catch (error) {
            this.HandleError(error);
        }
        return groups;            
    }
    async GetSubGroupsAsync(group:Group):Promise<Array<Group>>{
        let groups:Array<Group> = [];
        try {
            let response = await this.httpClient.get(`/groups/${group.GetRequestID()}/subgroups`);
            groups = response.data.map((group:any)=>{
                return new Group(group);
            }) as Array<Group>;
        } catch (error) {
            this.HandleError(error);
        }
        return groups;
    }
    async GetProjectsAsync(group:Group):Promise<Array<Project>>{
        let projects:Array<Project> = [];
        try {
            let response = await this.httpClient.get(`/groups/${group.GetRequestID()}/projects`);
            projects = response.data.map((project:any)=>{
                return new Project(project, group);
            }) as Array<Project>;
        } catch (error) {
            this.HandleError(error);
        }
        return projects;
    }

    async GetProjectOrSubgroup(group:Group):Promise<Array<any>>{
        let result:Array<any> = [];
        let projects = await this.GetProjectsAsync(group);
        let groups = await this.GetSubGroupsAsync(group);
        result = result.concat(groups);
        result = result.concat(projects);
        return result;
    }

    async GetProjectLabelsAsync(project:Project):Promise<Array<IssueLabel>>{
        let labels:Array<IssueLabel> = [];
        try {
            let response = await this.httpClient.get(`/projects/${project.GetRequestID()}/boards`);
            response.data.map((board:any)=>{
                let lists = board["lists"] || [];
                lists.map((label:any)=>{
                        label["board"] = board;
                        labels.push(new IssueLabel(label, project));
                });
            });


        } catch (error) {
            this.HandleError(error);
        }
        return labels;
    }
    async GetIssuesAsync(issueLabel:IssueLabel):Promise<Array<Issue>>{
        let issues:Array<Issue> = [];
        try {
            let response = await this.httpClient.get(`/projects/${issueLabel.GetProjectRequestID()}/issues?state=opened`);
            issues = response.data.map((issue:any)=>{
                return new Issue(issue, issueLabel);
            }) as Array<Issue>;
        } catch (error) {
            this.HandleError(error);
        }
        return issues;
    }
    async GetCommentsAsync(issue:Issue):Promise<Array<Comment>>{
        let comments:Array<Comment> = [];
        try {
            let response = await this.httpClient.get(`/projects/${issue.GetRequestProjectID()}/issues/${issue.GetRequestIID()}/discussions`);
            response.data.map((comment:any)=>{
                let notes = comment["notes"] || [];
                notes.map((note:any)=>{
                    if(!note["system"]){
                        let commentNode = new Comment(note, issue);
                        comments.push(commentNode);
                    }
                });
            });
        } catch (error) {
            this.HandleError(error);
        }
        return comments;
    }
    

    async GetIssueByLabelsAsync(issueLabel:IssueLabel):Promise<Array<Issue>>{
        let issues:Array<Issue> = [];
        try {
            let response = await this.httpClient.get(`/projects/${issueLabel.GetProjectRequestID()}/issues?labels=${issueLabel.GetTreeItemLabel()}&state=opened`);
            issues = response.data.map((issue:any)=>{
                return new Issue(issue, issueLabel);
            }) as Array<Issue>;
        } catch (error) {
            this.HandleError(error);
        }
        return issues;
    }

    
    async Markdown2HtmlAsync(content:IMarkdownConvertable):Promise<string>{
        let html:string = '';
        this.httpClient.defaults.headers.post['Content-Type'] = 'application/json';

        try {
            let data:any = { "text": content.MarkdownContent, "gfm":true };
            if(content.ProjectRef.length > 0){
                data["project"] = content.ProjectRef;
            }
            let response = await this.httpClient.post('/markdown', data);
            html = response.data["html"];
            content.HTMLContent = html;
        } catch (error) {
            this.HandleError(error);
        }
        return html;
    }
    
    HandleError(error:any){
        vscode.window.showWarningMessage(`GitLab Explorer: Error => ${error.message}`);
        console.log(error);
    }

    

}
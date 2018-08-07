import { IView } from "../providers/view/IView";
import { GitlabAPIProvider } from "../Providers/gitlab/api";
import { Issue } from "../Models/Issue";

export class IssueView implements IView {
    constructor(private issue:Issue, private projectRef:string) {
    }
    GetProjectRef(){
        // Group/Project
        return this.projectRef;
    }

    GetPanelTitle(){
        return `Issue - [${this.issue.GetRequestID()}]`;
    }
    
    async GetHTMLAsync(apiProvider:GitlabAPIProvider):Promise<string>{
        await apiProvider.Markdown2HtmlAsync(this.issue);
        return `
            <div class="comment">
                <div class="comment-head">
                    <span class="comment-author">${this.issue.GetAuthor()}</span>
                </div>
                <hr>
                <div class="comment-content">
                    ${this.issue.HTMLContent}
                </div>
            </div>
        `;
    }
}

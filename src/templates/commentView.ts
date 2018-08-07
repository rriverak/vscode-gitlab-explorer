import { Comment } from "../Models/Comment";
import { IView } from "../providers/view/IView";
import { GitlabAPIProvider } from "../Providers/gitlab/api";

export class CommentView implements IView {
    constructor(private comment:Comment, private projectRef:string) {
    }
    GetProjectRef(){
        // Group/Project
        return this.projectRef;
    }

    GetPanelTitle(){
        return `Comment - [${this.comment.GetRequestID()}]`;
    }
    
    async GetHTMLAsync(apiProvider:GitlabAPIProvider):Promise<string>{
        await apiProvider.Markdown2HtmlAsync(this.comment);
        return `
            <style>
              .comment-head{
                    display: inline;
              }            
              .comment-head img {
                    vertical-align:middle;
                    object-fit: cover;
                    border-radius:50%;
                    line-height: 40px;
               }     
               .comment-head-author{
                    line-height: 40px;
                    display: inline;
               }
               .comment-head-date{
                    line-height: 40px;
                    display: inline;
                    float:right;
                }
                .comment-content pre {
                    font-size: 13px;
                    line-height: 1.6em;
                    overflow-x: auto;
                    font-family: "Menlo", "DejaVu Sans Mono", "Liberation Mono", "Consolas", "Ubuntu Mono", "Courier New", "andale mono", "lucida console", monospace;
                    word-break: break-all;
                    word-wrap: break-word;
                }
            </style>
            <div class="comment">
                <div class="comment-head">
                    <img width="40" hight="40" src="${this.comment.GetAuthorAvatarURL()}" alt="${this.comment.GetAuthor()}">                   
                    
                    <div class="comment-head-author">
                        ${this.comment.GetAuthor()}
                    </div>
                    
                    <div class="comment-head-date">
                        <span>${this.comment.GetAuthorDate()}</span>
                    </div>
 
                </div>
                <hr>
                <div class="comment-content">
                    ${this.comment.HTMLContent}
                </div>
            </div>
        `;
    }
}

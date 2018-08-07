import { GitlabAPIProvider } from "../gitlab/api";

export interface IView{
    GetPanelTitle():string;
    GetHTMLAsync(apiProvider:GitlabAPIProvider):Promise<string>;
    GetProjectRef():string;
}
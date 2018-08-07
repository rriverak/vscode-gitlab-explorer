import * as vscode from 'vscode';
import * as path from 'path';
import { ItemTypeEnum } from '../Models/Enum';
import { timingSafeEqual } from 'crypto';

export class AssetProvider {
    static current: AssetProvider;


    private context: vscode.ExtensionContext;
    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        AssetProvider.current = this;
    }
    private getBasePath(): string {
        return path.join('src','assets');
    }
    GetSVGPathByFileName(fileName: string): IconPath {
        return {
            light: this.context.asAbsolutePath(path.join(this.getBasePath(), 'svg', 'light', fileName)),
            dark: this.context.asAbsolutePath(path.join(this.getBasePath(), 'svg', 'dark', fileName))
        };
    }

    GetSVGPathByName(name: string): IconPath {
        return this.GetSVGPathByFileName(`${name}.svg`);
    }

    GetSVGPathByType(type: ItemTypeEnum): IconPath {
        switch (type) {
            case ItemTypeEnum.Group:
                return this.GetSVGPathByName("folder");
                break;
            case ItemTypeEnum.Project:
                return this.GetSVGPathByName("book");
                break;
            case ItemTypeEnum.IssueLabel:
                return this.GetSVGPathByName("bookmark");
                break;
            case ItemTypeEnum.Issue:
                return this.GetSVGPathByName("message-circle");
                break;
            case ItemTypeEnum.Comment:
                return this.GetSVGPathByName("file-text");
                break;
            default:
                return {} as IconPath;
                break;
        }
    }

    GetUriCSS(fileName:string):vscode.Uri{
        return vscode.Uri.file(path.join(this.GetBasePathCSS(), fileName));
    }
    GetBasePathCSS(): string {
        return this.context.asAbsolutePath(path.join(this.GetBasePath(), 'css'));
    }
    GetUriJS(fileName:string):vscode.Uri{
        return vscode.Uri.file(path.join(this.GetBasePathJS(), fileName));
    }
    GetBasePathJS(): string {
        return this.context.asAbsolutePath(path.join(this.GetBasePath(), 'js'));
    }

    GetBasePath(): string {
        return this.getBasePath();
    }
}

interface IconPath{
    light:string;
    dark:string;
}
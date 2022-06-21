export interface BaseChangeLog {
    userId: number;
    usernameResp: string;
    caseId: number;
    caseRef: string;
    changeDate: Date;
    caseDiff: string;
}

export interface ChangeLog extends BaseChangeLog {
    caseId: number;
}

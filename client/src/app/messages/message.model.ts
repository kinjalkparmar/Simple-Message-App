export class Message{
    content: String;
    username: String;
    messageId?: String;
    userId?: String;


    constructor(content: string,username: string, messageId?: string, userId?: string){
        this.content= content;
        this.username= username;
        this.messageId=messageId;
        this.userId= userId;
    }
}


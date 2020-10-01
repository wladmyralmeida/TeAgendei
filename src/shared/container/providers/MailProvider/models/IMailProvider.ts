export default interface IMailProvider {
    sendMail(to: string, body: string): Promise<void>;
}

//KISS - Keep it simple and stupid;

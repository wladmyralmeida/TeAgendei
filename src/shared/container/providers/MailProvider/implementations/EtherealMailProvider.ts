import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        //Fazendo um provider depender de outro, pois não faz sentido esse sem o mailProvider;
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider) {
        //Como não se pode usar await no constructor, foi feito dessa forma;
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            this.client = transporter;
        });
    }

    public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
        const message = await this.client.sendMail({
            from: {
                name:
                    from?.name || 'Equipe Te Agendei <equipe@teagendei.com.br>',
                address: from?.email || 'equipe@teagendei.com.br',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            //Lidando com o provider de template diretamente no provider de email;
            html: await this.mailTemplateProvider.parse(templateData),
        });

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

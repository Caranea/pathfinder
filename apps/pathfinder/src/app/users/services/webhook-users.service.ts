import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/clerk-sdk-node';
import { UsersService } from './users.service';

export enum WebhookType {
    userCreated = 'user.created',
    userDeleted = 'user.deleted',
    userUpdated = 'user.updated',
}

@Injectable()
export class WebhookUsersService {
    private readonly secret = this.configService.get('WEBHOOK_SECRET')

    constructor(private configService: ConfigService, private usersService: UsersService) { }

    public verify(req: Request): WebhookEvent {
        const wh = new Webhook(this.secret);
        const headers = req.headers as any;
        const svixHeaders = {
            'svix-id': headers['svix-id'],
            'svix-timestamp': headers['svix-timestamp'],
            'svix-signature': headers['svix-signature'],
        };

        try {
            return wh.verify(
                JSON.stringify(req.body),
                svixHeaders
            ) as WebhookEvent;
        } catch {
            throw new UnauthorizedException();
        }
    }

    public async dispatch(webhook: WebhookEvent) {
        switch (webhook.type) {
            case WebhookType.userCreated: {
                await this.usersService.create({
                    username: webhook.data.username,
                    email: webhook.data.email_addresses.find(m => m.id === webhook.data.primary_email_address_id)
                        .email_address,
                    clerkId: webhook.data.id
                });
                break;
            }
            default:
                break;
        }
    }
}

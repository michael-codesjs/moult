import { ApiGwDomainCommandAdapter } from "@adapters/secondary/api-gw";
import { UserDomainCommandAdapter } from "@interfaces";

type SendCreateUserCommandParams = { id: string, [k: string]: string };
type SendUserWithUsernameAttributeExistsParams = { phoneNumber: string, email: string };

export class UserDomainCommandsRepositroy {

    private adapter: UserDomainCommandAdapter = new ApiGwDomainCommandAdapter();

    async sendCreateUserCommand(params: SendCreateUserCommandParams) {
        return await this.adapter.sendCreateUserCommand(params);
    }

    async sendUserWithUsernameAttributeExistsCommand(params: SendUserWithUsernameAttributeExistsParams) {
        return await this.adapter.sendCheckIfUserWithUsernameAttributeExistsCommand(params);
    }

}

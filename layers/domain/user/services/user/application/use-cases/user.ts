import { injectable, inject } from 'inversify'
import { UserAggregateRepository, UserUseCase } from '@interfaces'
import { dependencies } from '@dependencies'
import { UserDTO } from '@domain/models'
import { User as UserEntity } from '@domain/aggregate'
import { UsernameAttributeInUseError } from '../errors'
import { EventsRepositrory } from '@repositories/events'
import { USER_SNAPSHOT_DOMAIN_EVENT } from '@domain/events'

type CreateUserParams = {
  id?: string
  username?: string
  email?: string
  phoneNumber?: string
  password: string
}

type UpdateUserParams = {
  id: string
  username?: string
  email?: string
  phoneNumber?: string
}

type UpdateUsernameParams = {
  id: string
  username: string
}

@injectable()
export class User implements UserUseCase {
  @inject(dependencies.UserRepository)
  private repository: UserAggregateRepository
  @inject(dependencies.EventsRepositrory) private events: EventsRepositrory

  /** Throws a 'UsernameAttributeInUseError' if a user other than the specified current user exists with the supplied username attributes. */
  private async failIfUserWithEitherUsernameAttributesExists(params: {
    currentUser: string
    email?: string
    phoneNumber?: string
    username?: string
  }) {
    //  if("email" in params) {
    //     const user = await this.repository.getByEmail(params.email);
    //     if(!user) return;
    //     if(user && user.toDTO().id !== params.currentUser) throw new UsernameAttributeInUseError("email");
    // }
    // if("phoneNumber" in params) {
    //     const user = await this.repository.getByPhoneNumber(params.phoneNumber);
    //     if(!user) return;
    //     if(user && user.toDTO().id !== params.currentUser) throw new UsernameAttributeInUseError("phone number");
    // }
    // if("username" in params) {
    //     const user = await this.repository.getByUsername(params.username);
    //     if(!user) return;
    //     if(user && user.toDTO().id !== params.currentUser) throw new UsernameAttributeInUseError("phone number");
    // }
  }

  async createUser(params: CreateUserParams): Promise<UserDTO> {
    try {
      // this.failIfUserWithEitherUsernameAttributesExists({ currentUser: params.id, ...params });
      const user_credential = UserEntity.create(params)
      const events = user_credential.getDomainEvents()

      console.log('events:', events)

      await this.events.write(events)
      await this.events.publish(events)

      return user_credential.toDTO()
    } catch (error) {
      console.error('error', error)
      throw error
    }
  }

  async getUser(id: string): Promise<UserDTO> {
    const userCredentials = await this.repository.get(id)
    return userCredentials.toDTO()
  }

  async updateUsername(params: UpdateUsernameParams): Promise<UserDTO> {
    const { id, username } = params

    const user = await this.repository.get(id)

    console.log('user_id:', { input: id, output: user.toDTO().id })
    user.updateUsername(username)
    console.log('user_id:', { input: id, output: user.toDTO().id })

    const events = user.getDomainEvents()

    console.log('final events:', events)

    const snapshot_versions = await this.events.write(events)
    console.log('snapshot_versions:', snapshot_versions)

    await this.handleTakeSnapshot(snapshot_versions, user)

    await this.events.publish(events)

    return user.toDTO()
  }

  async updateUser(params: UpdateUserParams): Promise<UserDTO> {
    return {} as any
  }

  async deleteUser(id: string): Promise<void> {
    // await this.repository.delete(id);
    return {} as any
  }

  async handleTakeSnapshot(snapshot_versions: Array<number>, user: UserEntity) {
    // with current use case, we only expect 1 snapshot version
    const snapshot_version = snapshot_versions[0]

    if (snapshot_version) {
      console.log('taking snapshot')
      user.takeSnapshot(snapshot_version)
      const snapshot_event =
        user.getDomainEvents()[0] as USER_SNAPSHOT_DOMAIN_EVENT
      console.log('snapshot_event:', snapshot_event)
      console.log('final:', {
        ...snapshot_event,
        version: snapshot_version,
      })
      await this.events.writeSnapshotEvents([
        {
          ...snapshot_event,
          version: snapshot_version,
        },
      ])
      console.log('snapshot_event written')
    }
  }
}

export const dependencies = Object.freeze({
    UserUseCases: Symbol.for("UserUseCases"),
    EventsUseCases: Symbol.for("EventsUseCases"),
    UserRepository: Symbol.for("UserRepository"),
    EventsRepositrory: Symbol.for("EventsRepositrory"),
    UserDatabaseAdapter: Symbol.for("UserDatabaseAdapter"),
    EventsAdapter: Symbol.for("EventsAdapter")
});
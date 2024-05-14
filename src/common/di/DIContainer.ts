/* eslint-disable @typescript-eslint/no-explicit-any */
export class DIContainer {
  private static registry = new Map<any, () => any>();
  private static instances = new Map<any, any>();

  // Register a service with a factory function for lazy instantiation
  static register<T>(
    constructor: new (...args: any[]) => T,
    factory?: () => T,
  ): void {
    DIContainer.registry.set(
      constructor,
      factory
        ? factory
        : () => {
            const parameters =
              Reflect.getMetadata('design:paramtypes', constructor) || [];

            const dependencies = parameters.map((param: any) =>
              DIContainer.resolve(param),
            );

            return new constructor(...dependencies);
          },
    );
  }

  // Resolve a service, instantiating it if necessary
  static resolve<T>(constructor: new (...args: any[]) => T): T {
    if (!DIContainer.instances.has(constructor)) {
      if (!DIContainer.registry.has(constructor)) {
        throw new Error(`Service ${constructor.name} has not been registered.`);
      }

      const factory = DIContainer.registry.get(constructor);

      if (!factory) {
        throw new Error(
          `Factory for service ${constructor.name} is not defined.`,
        );
      }

      const instance = factory();

      // console.log(`instance of ${constructor.name} created`)

      DIContainer.instances.set(constructor, instance);
    }

    return DIContainer.instances.get(constructor);
  }
}

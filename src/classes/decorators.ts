export function freeze(p: string) {
    return function (constructor: Function): void {
        console.log(`Freezing the constructor : ${p}`);

        Object.freeze(constructor);
        Object.freeze(constructor.prototype);
    };
}

export function logger<TFunction extends Function>(constructor: TFunction): TFunction {
    const newConstructor: Function = () => {
        console.log('Creating ne instance');
        console.log(constructor.name);

        this.age = 30;
    };

    constructor.prototype = Object.create(constructor.prototype);
    Object.setPrototypeOf(newConstructor.prototype, constructor.prototype);

    newConstructor.prototype.printLibrarian = function (): void {
        console.log(`Linrarian name : ${this.name}`);
    };

    return newConstructor as TFunction;
}

export function writable(isWritable: boolean) {
    return function (target: Function | object, methodName: string, descriptor: PropertyDescriptor): void {
        console.log(`Method decorator is called with param ${isWritable}`);
        console.log({ target, methodName, descriptor });

        descriptor.writable = isWritable;
    };
}

export function timeout(ms: number) {
    return function (target: Function | object, methodName: string, descriptor: PropertyDescriptor): void {
        console.log(`Method decorator timeout for ${methodName}`);

        const originalMethod = descriptor.value;

        descriptor.value = function (...args: unknown[]) {
            if (window.confirm('Are you sure ?')) {
                setTimeout(() => {
                    originalMethod.apply(this, args);
                });
            }
        };
    };
}

export function getParameter(target: Function | object, methodName: string, index: number): void {
    const key = `${methodName}_decor_prams_indexes`;
    const proto = typeof target === 'function' ? target.prototype : target;

    (proto[key] ??= []).push(index);
}

export function logMethod(
    target: Function | object,
    methodName: string,
    descriptor: PropertyDescriptor,
): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
        const key = `${methodName}_decor_prams_indexes`;
        const proto = typeof target === 'function' ? target.prototype : target;
        const indexes = proto[key];

        if (Array.isArray(indexes)) {
            args.forEach((value, index) => {
                if (indexes.includes(value)) {
                    console.log(`Method ${methodName}, ParamsIndex ${index}, PaarmsValue ${value}`);
                }
            });
        }

        const result = originalMethod.apply(this, args);

        return result;
    };

    return descriptor;
}

export function format(pref: string = 'Mr./Mrs.') {
    return function (target: Function | object, propertyName: string) {
        makeProperty(
            target,
            propertyName,
            value => `${pref} ${value}`,
            value => value,
        );
    };
}

function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer?: (value: any) => T,
    setTransformer?: (value: any) => T,
) {
    const values = new Map<any, T>();
    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        return values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true,
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true,
    });
}

export function positiveInteger(target: Function | object, methodName: string, descriptor: PropertyDescriptor) {
    const originSet = descriptor.set;

    descriptor.set = function (value: number) {
        if (value < 1 || !Number.isInteger(value)) {
            throw new Error('Invalid value');
        }

        if (originSet) {
            originSet.call(this, value);
        }
    };

    return this;
}

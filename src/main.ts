export function helloWorld(lang = 'Typescript'): string {
    return `🦁 I love ${lang}!`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function devNull(): any {
    return { hello: 'Efrei' };
}

console.log(helloWorld());

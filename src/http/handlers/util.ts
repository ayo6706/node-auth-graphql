// eslint-disable-next-line import/prefer-default-export
export function fieldIsNotEmpty(...args: (string | number)[]): Boolean {
    for (let i = 0; i < args.length; i++) {
        if (!args[i]) {
            return false;
        }
    }
    return true;
}

export function failedPromise(data: any): Promise<any> {
    return Promise.reject(data);
}

export function passedPromise(data: any): Promise<any> {
    return Promise.resolve(data);
}


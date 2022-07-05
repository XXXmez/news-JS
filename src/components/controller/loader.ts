type resAnswer = {
    json(): {};
    ok: boolean,
    status: number,
    statusText: string
}
type option = {sources: string}

class Loader {
    constructor(public baseLink: string, public options: {apiKey: string}) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options }: {endpoint: string, options?: {sources: string} },
        callback = ([]):void => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: resAnswer) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: {sources: string}, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method:string, endpoint:string, callback: ({}) => {} | void, options: option) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;

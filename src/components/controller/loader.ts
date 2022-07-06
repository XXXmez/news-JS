type resAnswer = {
    json(): {};
    ok: boolean,
    status: number,
    statusText: string
}


type baseLink = string;
type options = { [key: string]: string }

class Loader {
    constructor(public baseLink: baseLink, public options: options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: { endpoint: string, options?: options },
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res:resAnswer):resAnswer {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: options, endpoint:string):string {
        
        const urlOptions: options = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        return url.slice(0, -1);
    }

    load<T>(method:string, endpoint:string, callback: (data: T) => void, options: options):void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res:resAnswer) => res.json())
            .then((data: T) => {
                return callback(data);
            })
            .catch((err) => console.error(err));
    }
}
 
export default Loader;

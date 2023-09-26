import * as https from 'https';

const url = 'https://www.googleapis.com/customsearch/v1?';
const apiKey: string = 'API_KEY';
const searchEngineID: string = 'SEARCH_ENGINE_ID';

const params: URLSearchParams = new URLSearchParams({
    'key': apiKey,
    'cx': searchEngineID,
    'q': '',
    'searchType': 'image',
    'alt': 'json'
});

export function getFirstImage(query: string): Promise<string> {
    params.set('q', query); 
    const fullUrl = url + params.toString();
    
    return new Promise<string>((resolve, reject) => {
        https.get(fullUrl, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                const imgUrl: string = JSON.parse(data).items[0].link;
                resolve(imgUrl);
            });

            response.on('error', (error) => {
                console.log(error);
                reject(error);
            });
        });
    });
}
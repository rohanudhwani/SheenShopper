import { createClient } from "@sanity/client"; 
import { fetchQuery } from "./utils/supports";

const client = createClient({
    projectId: "3033w841",
    dataset: "production",
    apiVersion: "2023-12-14",
    useCdn: true,
    
});

export const fetchFeeds = async () => {
    let data = await client.fetch(fetchQuery).then(feeds => {
        return feeds
    });
    return data;
}
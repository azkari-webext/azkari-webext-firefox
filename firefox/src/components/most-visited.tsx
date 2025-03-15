import { useEffect, useState } from "react";
import { getTopVisitiedSites } from "./browser-utils";

export interface SiteInfo {
    title?: string,
    url: string,
    favicon ?: string,
}
function TopVisited() {
    const [sites, setSites] = useState<SiteInfo[]>([]);

    useEffect(() => {
        getTopVisitiedSites().then((data) => {
            console.log(data);
        setSites(data);
    });

    }, []); // Does not run again (except once in development)

    function getFirstWord(url: string) {
        const str = url.replace(/((http(s)?(:\/\/))?)((www.)?)/i, '');
        const matcher = str.match(/[a-zA-Zء-ي]+/)
        return matcher?matcher[0]:str;
    }

    function getIcon(site) {
        if (site.favicon) {
            return (<img src={site.favicon} className="link-image"/>);
        } else {
            return (<div className="link-icon">{getFirstWord(site.url).charAt(0).toUpperCase()}</div>);
        }
    }
    
    return (    
    <div className="top-visited-container">
        <div className="w-layout-hflex quick-link-docker">
            {sites.slice(0, 8).map((s) => 
                <a href={s.url} className="link-block w-inline-block">
                   {getIcon(s)}
                    <div className="link-text">{getFirstWord(s.url)}</div> 
                </a>)}
        </div>
    </div>
    );
}


export default TopVisited;

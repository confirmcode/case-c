const fs = require('fs');

const cache_xml_file = '/app/cache_habr_rss.xml';
const cache_json_file = '/app/cache_habr_rss.json';
const habr_url_rss = 'https://habr.com/ru/rss/articles/?fl=ru'

const upd_minutes = 15
const upd_frequency = 1 * upd_minutes // frequency not more than once at 15 min

const load = () => {
    
    let rawData = '';
    
    const https = require('https');
    
    fs.stat(cache_xml_file, function(err, stats){
        let need_upd = false;
        if (err) {
            need_upd = true;
            // throw err
        } else {
            let seconds = (new Date().getTime() - stats.mtime) / 1000;
            need_upd = seconds > upd_frequency ? true : false;
        }


        if ( need_upd ) { // frequency not more than once at 15 min
            https.get( habr_url_rss, (res) => {
                process.stdout.write("\n\nLOAD\n\n");
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    try {
                        fs.writeFileSync(cache_xml_file, rawData, {flag:'w+'});
                        parse();
                    } catch (e) {
                        console.error(e.message);
                    }
                });
            }).on('error', (e) => {
                console.error(e);
            }); 
        }
    })
    
}

const parse = () => {
    const xml2js = require('xml2js');
    const parser = new xml2js.Parser();
    let rawData = fs.readFileSync( cache_xml_file, {encoding:'utf8'});
    let data_arr = [];
    parser.on('error', function(err) { console.log('Parser error', err); });
    parser.parseString(rawData, function(err, data) {
        data.rss.channel[0].item.map(article=>{
            let a_id = article.link[0].replace(/\?.*/,'').replace(/.*\/(\d+)\/.*/,"$1")
            data_arr.push({
                id: a_id,
                pubDate: article.pubDate[0],
                title: article.title[0],
                link: article.link[0].replace(/\?.*/,''),
                categories: article.category,
                description: article.description[0],
            })
        })
        fs.writeFileSync(cache_json_file, JSON.stringify(data_arr) )
    })
}


const article_list = () => {
    return fs.readFileSync(cache_json_file, {encoding:'utf8'} );
}

exports.get = function(req,res) {
    let article = {}
    try{
        let articles = JSON.parse(fs.readFileSync(cache_json_file, {encoding:'utf8'} ));
        [article] = articles.filter(i=>i.id == req.params.id);
    } catch(e) {
        console.log(e);
    }
    res.json(article);
}

exports.list = function(req,res) {
    try{
        load();
    } catch(e) {
        console.log(e);
    }
    res.set('Content-Type', 'application/json');
    res.send( article_list() );
}
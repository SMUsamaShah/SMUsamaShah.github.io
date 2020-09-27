/**
 * Retrieve dynalist node from a file and convert it to text
 * 
 * > Install zeit/ncc by running this command in your terminal. npm i -g @zeit/ncc
 * > Compile your index.js file. ncc build index.js
 * 
 * author: smusamashah
 */
const https = require("https");
const fs = require("fs");
const core = require('@actions/core');
const github = require('@actions/github');
const { log } = require("console");

const readDynalistFileURL = "https://dynalist.io/api/v1/doc/read";
const dynalistToken = core.getInput('DYNALIST_TOKEN');
core.setSecret(dynalistToken);

const dl = new Dynalist(dynalistToken);

const articles = JSON.parse(fs.readFileSync("action-dynalist/articles.json", "utf8"));
// https://dynalist.io/d/arYPsTPWYxTQ0exGcIX-onPE#z=DtixSbw8DyzSLtZmjLwA8_EB

(async function main(){
    log(`Procesing ${articles.dynalist.length} articles from dynalist`);
    for (let article of articles.dynalist) {
        let node = await dl.findNode(article.nodeID, article.fileID);
        let list = await dl.toMarkdownList(node, article.fileID);

        let txt = generateArticle(article.frontMatter, node, list);

        let blogpostFile = "./content/blog/" + article.outputFile;
        fs.writeFile(blogpostFile, txt, (err) => {
            if (err) throw err;
            log("file created: " + blogpostFile);
        });
    }
})();

function generateArticle(frontMatterData, mainNode, body) {
    let frontMatter = "---\n";
    for (let txt of frontMatterData) {
        frontMatter += txt + "\n";
    }
    frontMatter += "---\n";

    const heading = ""; //`# ${parentNode.content}`;
    const description = `${mainNode.note}`;

    const dynalistWatermark = "---\n<small>This list is being maintained with Dynalist</small>";

    return `${frontMatter}\n${heading}\n${description}\n\n${body}\n\n${dynalistWatermark}`;
}

function Dynalist(token) {
    const TOKEN = token;
    const readURL = "https://dynalist.io/api/v1/doc/read";
    const editURL = "https://dynalist.io/api/v1/doc/edit";
    const dlFiles = {};

    async function fetchFile(dlFileID) {
        if (!dlFiles[dlFileID]) {
            const dynFile = await requestFileJson(dlFileID);
            dlFiles[dlFileID] = transformDLFile(dynFile);
        }

        return dlFiles[dlFileID];
    }

    this.findNode = async function(dlNodeID, dlFileID) {
        let dlFile = await fetchFile(dlFileID);
        let resultNode = dlFile.nodes[dlNodeID];
        return resultNode;
    }

    this.toMarkdownList = async function(dlNode, dlFileID, level = 0) {
        let str = '';
        let indent = "";

        for (let i = 0; i < level; i++) {
            indent += "   "; // 3 spaces
        }

        for (let nodeID of dlNode.children) {
            let node = await this.findNode(nodeID, dlFileID);
            str += indent + "1. " + node.content + "  \n";
            str += indent + node.note.replace(/[\n\r]/g, "  \n");
            str += "\n";

            if (node.children) {
                str += await this.toMarkdownList(node, dlFileID, level + 1);
            }
        }
        return str;
    }

    function transformDLFile(dlFileObject) {
        dlFileObject.nodes = arrayToMap(dlFileObject.nodes);
        return dlFileObject;
    }

    // convert nodes array to map of key value where key will be "id".
    function arrayToMap(nodes) {
        if (!nodes) {
            log("no nodes provided to convert")
            return [];
        }

        let fileNodes = {};
        for (let node of nodes) {
            // node id as key
            fileNodes[node.id] = node;
            delete node.id; // because now its a key of this object
        }
        return fileNodes;
    }

    // convert each string id in idArray to respective object from dataSource
    function expandIDList(idArray, db) {
        for (let i = 0; i < idArray.length; i++) {
            let id = idArray[i];
            idArray[i] = db[id]; // replace id with actual retreived node
        }
    }

    function requestFileJson(dlFileID) {
        return httpRequestJson(readURL, JSON.stringify({
            "token": TOKEN,
            "file_id": dlFileID
        }));
    }

    function httpRequestJson(url, postData) {
        return new Promise((resolve, reject) => {
            const params = {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            };

            const req = https.request(url, params, function (res) {
                 // reject on bad status
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error('statusCode=' + res.statusCode));
                }

                // collect response
                const responseChunks = [];
                res.on("data", function (chunk) {
                    responseChunks.push(chunk);
                });

                // 
                res.on("end", function () {
                    let json;
                    try {
                        json = JSON.parse(Buffer.concat(responseChunks).toString());
                    } catch (e) {
                        reject(e);
                    }
                    resolve(json);
                });
            });
            if (postData) {
                req.write(postData);
            }
            req.end();
        });
    }
}
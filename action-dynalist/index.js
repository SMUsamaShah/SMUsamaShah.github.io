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
const articles = require('./articles.json');

const readDynalistFileURL = "https://dynalist.io/api/v1/doc/read";
const dynalistToken = core.getInput('DYNALIST_TOKEN');
core.setSecret(dynalistToken);

// https://dynalist.io/d/arYPsTPWYxTQ0exGcIX-onPE#z=DtixSbw8DyzSLtZmjLwA8_EB
let fileID = "";
let nodeID = "";
let fileData = {}; // file data from dynalist
//let articles = JSON.parse(fs.readFileSync("articles.json", "utf8"));

const args = process.argv.slice(2);
if (args[0]) {
    fileID = args[0];
}
if (args[1]) {
    nodeID = args[1];
}

for (let article of articles.dynalist) {
    fetchDynalistNode(article.fileID, article.nodeID, (parentNode, childNodes) => {
        let frontMatter = "";
        for (let txt of article.frontMatter) {
            frontMatter += txt + "\n";
        }
        const title = `# ${parentNode.content}`;
        const description = `${parentNode.note}`;
        const body = toMarkdownList(childNodes);

        const articleContent = `${frontMatter}\n${title}\n${description}\n\n${body}`;

        fs.writeFile("../../content/blog/" + article.outputFile, articleContent, (err) => {
            if (err) throw err;
            console.log("file created");
        });
        console.log(articleContent);
    });
}


function fetchDynalistNode(fileID, nodeID, nodesCallback) {
    // create request object
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    };

    const requestBody = JSON.stringify({
        "token": dynalistToken,
        "file_id": fileID
    });

    const req = https.request(readDynalistFileURL, requestOptions, function (res) {
        const chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        res.on("end", function () {
            const responsebody = Buffer.concat(chunks);
            fileData = JSON.parse(responsebody.toString());

            // transform data converting [items, ...] to separate objects (itemId: data, ...)
            fileData.nodes = arrayToMap(fileData.nodes);

            let parentNode = getNode(nodeID);
            let childNodes = expandChildren(nodeID);
            nodesCallback(parentNode, childNodes);
        });
    });
    req.write(requestBody);
    req.end();
}

// convert nodes array to map of key value where key will be "id".
function arrayToMap(nodes) {
    if (!nodes) {
        console.log("no nodes provided to convert")
        return [];
    }

    let fileNodes = {};
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        // node id to key
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

function getNode(nodeID) {
    return fileData.nodes[nodeID];
}

function expandChildren(nodeID) {
    const node = getNode(nodeID);
    if (!node || !node.children) {
        console.error('no node found for given node ID: '+nodeID);
        return null;
    }

    if (node.children.length > 0 && typeof node.children[1] === 'string') {
        // expand children ids to their objects
        expandIDList(node.children, fileData.nodes);
    }

    return node.children;
}

function toMarkdownList(nodesArray) {
    if (!nodesArray) {
        console.error('no nodes to convert to text');
        return null;
    }
    let text = "";
    for (const node of nodesArray) {
        text += "- ";
        text += node.content + "  \n"; // title
        text += node.note.replace(/[\n\r]/g, "  \n"); // description, append double space in lines in description
        text += "\n";
    }
    return text;
}

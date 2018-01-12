import getNewFolderID from './getNewFolderID';
const drive = {};
module.exports = async function getFolderID(path, parentID = 'root') {
    return new Promise(resolve => {
        console.log(path, path.length);
        if (path.length == 0) resolve(parentID);
        else drive.files.list({
            q: `'${parentID}' in parents and name = '${path[0]}' and trashed = false`
        }, async function(err, response) {
            if (response.files.length > 1) throw 'Có nhiều hơn 1 thư mục';
            const folder_id = response.files.length == 0
                ? await getNewFolderID(path[0], parentID)
                : response.files[0].id;
            path.shift();
            resolve(await getFolderID(path, folder_id));
        });
    });
};
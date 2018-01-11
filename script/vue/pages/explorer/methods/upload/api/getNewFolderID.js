module.exports = async function getNewFolderID(folderName, parentID) {
    return new Promise(resolve => {
        drive.files.create({
            resource: {
                name: folderName,
                parents: [parentID],
                mimeType: 'application/vnd.google-apps.folder'
            }
        }, (err, folder) => {
            resolve(folder.id);
        });
    });
};
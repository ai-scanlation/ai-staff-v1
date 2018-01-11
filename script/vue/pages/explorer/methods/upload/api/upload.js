async function upload(localFile, folderID) {
    return new Promise(resolve => {
        drive.files.create({
            resource: {
                name: localFile[2].name,
                parents: [folderID]
            },
            media: {
                body: fs.createReadStream(localFile[0].path, parent)
            },
            fields: 'thumbnailLink'
        }, (err, cloudFile) => {
            if (err) {
                console.error('Lỗi: ' + localFile[2].name + ' - Đang thử lại');
                resolve(undefined);
            } else {
                resolve(cloudFile);
            }
        });
    });
}
import fs from 'fs';
import path from 'path';

import Loki from 'lokijs';

// Hàm này sẽ khởi tạo CSDL dù cho tập
module.exports = function initDatabase(callback) {
    if (!fs.existsSync(this.databasePath)) {
        callback('[Lỗi khi khởi tạo CSDL] Không tồn tại đường dẫn chứa CSDL');
    }
    const db = new Loki(path.join(this.databasePath, 'database.json'), {
        env: 'NODEJS'
    });
    db.loadDatabase({}, (err) => {
        if (err) throw err;
        db.saveDatabase();
        callback(db);
    });
};

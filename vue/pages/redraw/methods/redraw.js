import fs from 'fs';
import path from 'path';

module.exports = function initRedraw() {
    if (!this.databasePath || !fs.existsSync(path.join(this.databasePath, 'database.json'))) {
        this.logs = 'Không tồn tại tập tin cơ sở dữ liệu';
        // Người dùng có thể gọi initDatabase() để khởi tạo và nạp CSDL
    } else {
        // 
    }
};

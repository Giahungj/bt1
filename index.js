import http from 'http';
import getURL from './getURL.js'; 
import date from './date.js';
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write(date() + "<br>"); // Gọi hàm trong date.js để hiển thị ngày
    res.write(getURL.getPath(req) + "<br>");
    res.write(getURL.getParamsURL(req) + "<br>");
    res.write('Hello KTPM0121, chúc bạn thành công với Node.js'); // Thông điệp tùy chỉnh
    res.end();
}).listen(8080);

console.log('Server đang chạy tại http://localhost:8080');
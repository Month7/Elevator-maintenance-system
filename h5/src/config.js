export default function getUrl(){
    // 0本地 1上线
    var type = 0;
    if(type == 0) return 'http://localhost:3000'
    return 'http://140.143.34.162:3000'
}
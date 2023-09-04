// ip校验规则
export function validateIPAddress(value: string) {
    let regexp = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/;
    let valdata = value.split(',');
    let isCorrect = true;
    if (valdata.length) {
        for (let i = 0; i < valdata.length; i++) {
            if (regexp.test(valdata[i]) == false) {
                isCorrect = false;
            }
        }
    }
    if (value == '') {
        return '请输入IP地址';
    } else if (!isCorrect) {
        return false;
    } else {
        return true;
    }
}

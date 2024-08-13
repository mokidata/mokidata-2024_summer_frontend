export function getWeekOfMonth(date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDay.getDay();
    const weekNumber = Math.ceil((date.getDate() + dayOfWeek) / 7);
    return weekNumber;
}

export function formatYear(dateString){
    const date = new Date(dateString);
    const year = 1900+ date.getYear(); 
    return `${year}년`
    
}

export function formatMonth(dateString){
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    return `${month}월`
}

export function formatWeek(dateString){
    const date = new Date(dateString);
    const weekNumber = getWeekOfMonth(date);
    return `${weekNumber}주`;
}

export function formatDateNum(dateString){
    const date = new Date(dateString);
    const dayNum = date.getDate()
    return `${dayNum}일`;
}

export function formatDay(dateString){
    const date = new Date(dateString)
    const dayIndex = date.getDay();
    const daysOfWeek = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
    return daysOfWeek[(dayIndex + 6) % 7];
}

function formatDateToWeekString(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    const weekNumber = getWeekOfMonth(date);
    return `${month}월 ${weekNumber}째 주`;
}

export function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const local_Date = date.toLocaleDateString('ko-KR', options)
        .split('.')
        .map(part => part.trim())
        .join('-');
    return local_Date.endsWith('-') ? local_Date.slice(0, -1) : local_Date;
}

export default function DateConVerter(dateValue){
    // 예시: 2024-07-24 -> 7월 4째 주"
    const result = formatDateToWeekString(dateValue);
    return result;
};


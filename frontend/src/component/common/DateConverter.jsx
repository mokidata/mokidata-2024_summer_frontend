function getWeekOfMonth(date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDay.getDay();
    const weekNumber = Math.ceil((date.getDate() + dayOfWeek) / 7);
    return weekNumber;
}

export function formatMonth(dateString){
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    return `${month}월`
}

export function formatWeek(dateString){
    const date = new Date(dateString);
    const weekNumber = getWeekOfMonth(date);
    return `${weekNumber}째 주`;
}


function formatDateToWeekString(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    const weekNumber = getWeekOfMonth(date);
    return `${month}월 ${weekNumber}째 주`;
}

export default function DateConVerter(dateValue){
    // 예시: 2024-07-24 -> 7월 4째 주"
    const result = formatDateToWeekString(dateValue);
    return result;
};


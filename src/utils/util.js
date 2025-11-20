export function prepareIncomeLineCharData(transactions = []) {
    const data = {};
    {
        console.log(transactions)
    }

    transactions.forEach(item => {
        const date = item.date?.split("T")[0]; // take YYYY-MM-DD
        if (!date) return;

        if (!data[date]) {
            data[date] = Number(item.amount) || 0;
        } else {
            data[date] += Number(item.amount) || 0;
        }
    });

    // convert object → array
    return Object.keys(data).map(date => ({
        date,
        amount: data[date]
    }));
}

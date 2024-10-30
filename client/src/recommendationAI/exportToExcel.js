import * as XLSX from 'xlsx';

export const exportToExcel = async (method, data, trainingTime, fileName) => {
    const workbook = XLSX.utils.book_new();

    const transformedData = data[0].epoch.map((epochValue, index) => ({
        epoch: epochValue,
        loss: data[0].loss[index],
    }));

    const transformedDataWithTime = [...transformedData, {trainingTime: trainingTime}]

    // Преобразуем данные в формат массива
    const worksheet = XLSX.utils.json_to_sheet(transformedDataWithTime);

    if (workbook.SheetNames.includes(method)) {
        // Если существует, удаляем его
        workbook.Sheets[method] = undefined;
        workbook.SheetNames = workbook.SheetNames.filter(sheetName => sheetName !== method);
    }

    // Добавляем новый лист с данными
    XLSX.utils.book_append_sheet(workbook, worksheet, method);

    // Создаем файл Excel
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
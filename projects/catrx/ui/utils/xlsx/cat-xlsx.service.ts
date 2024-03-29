import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

import { Injectable } from '@angular/core';
import { CatXlsxConfig } from './xlsx.config';
import { klString } from '@koalarx/utils/operators/string';

@Injectable({ providedIn: 'any' })
export class CatXlsxService {
  public async convertJsonToXlsx(
    tabs: {
      sheetName: string;
      json: any[];
    }[],
    filename: string
  ) {
    const config = CatXlsxConfig.config;
    const workbook: Workbook = new Workbook();

    for (const tab of tabs.values()) {
      const header = [];
      Object.keys(tab.json[0] ?? {}).forEach((name) => {
        header.push(
          config.normalizeHeader === true ||
            config.normalizeHeader === null ||
            config.normalizeHeader === undefined
            ? klString(name).normalize().getValue().toUpperCase()
            : name
        );
      });

      if (header.length > 0) {
        const worksheet = workbook.addWorksheet(tab.sheetName);
        if (config.password) {
          await worksheet.protect(config.password, {
            selectLockedCells: true,
            selectUnlockedCells: true,
            scenarios: true,
          });
        }

        const headerRow = worksheet.addRow(header);
        headerRow.eachCell((cell) => {
          if (config.headerBackgroundColor) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: config.headerBackgroundColor.replace('#', '') },
              bgColor: { argb: config.headerBackgroundColor.replace('#', '') },
            };
          }
          if (config.headerFontColor) {
            cell.font = {
              color: { argb: config.headerFontColor.replace('#', '') },
            };
          }
        });

        tab.json.forEach((item) => {
          const data = [];
          Object.values(item).forEach((value) => data.push(value));
          worksheet.addRow(data);
        });
      }
    }

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, filename + '.xlsx');
    });
  }
}

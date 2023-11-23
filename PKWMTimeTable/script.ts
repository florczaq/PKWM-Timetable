/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable curly */
import axios from 'axios';
const cheerio = require('cheerio');
const alterHTML = (data = '') => {
  return data
    .replaceAll('<br>', ' ')
    .replaceAll('</span>-(N)', '-(N)</span>')
    .replaceAll('</span>-(P)', '-(P)</span>')
    .replaceAll('</span>-(p.', '-(p.</span>')
    .replaceAll('</span>-(n.', '-(n.</span>')
    .replaceAll('<span style="font-size:85%">', '')
    .replaceAll('<a', '<span')
    .replaceAll('</a>', '</span>');
};

//Zczytywanie godzi z planu lekcji
const getHours = ($: any): string[] => {
  const hours: string[] = [];
  $('td.g')
    .contents()
    .toArray()
    .forEach((e: any, i: number) => {
      hours.push(e.data.trim());
    });
  return hours;
};

const oddzialList = [
  {
    name: '11K1',
    link: 'http://podzial.mech.pk.edu.pl/stacjonarne/html/plany/o7.html',
  },
  {
    name: '11K2',
    link: 'http://podzial.mech.pk.edu.pl/stacjonarne/html/plany/o8.html',
  },
  {
    name: '11K3',
    link: 'http://podzial.mech.pk.edu.pl/stacjonarne/html/plany/o9.html',
  },
];

/**
 * @param setDataState
 * @returns data, hours
 */
export const getData = (setDataState: any, oddzial: string) => {
  const src = oddzialList.filter(x => {
    return x.name === oddzial;
  });
  console.log(src, oddzial);
  axios
    .get(src[0].link)
    .then((response: {data: string}) => {
      const $ = cheerio.load(alterHTML(response.data));
      const hours = getHours($);
      const table = $('table');
      const data: [] = [];

      table
        .find('table tbody tr td table tbody tr')
        .each((i: any, row: any) => {
          let rowData: [] = [];
          if (i === 0) return;
          $(row).each((j: any, cell: any) => {
            $(cell)
              .find('td.l')
              .each((k: any, td: any) => {
                const temp: [] = [];
                let s = '';
                $(td)
                  .find('span')
                  .each((m: any, span: any) => {
                    const text = $(span).text();
                    if (text.indexOf('#') === -1 && text.length !== 2) {
                      if (s === '') s = text;
                      else {
                        temp.push({name: s, classroom: text});
                        s = '';
                      }
                    }
                  });
                rowData.push(temp);
              });
            data.push(rowData);
          });
        });
      setDataState({data: data, hours: hours});
    })
    .catch(err => console.error(err));
};

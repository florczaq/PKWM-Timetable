/* eslint-disable prettier/prettier */
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

const getHours = ($: any): string[] => {
  const hours: string[] = [];
  $('td.g')
    .contents()
    .toArray()
    .forEach((e: any, i: number) => hours.push(e.data.trim()));
  return hours;
};

const getOddzialURL = (oddzial: any, res: any) =>
  res.filter((x: any) => x.name === oddzial)[0]?.link;

type OddzialType = {
  name: string;
  link: string;
};

export const getOdzialList = new Promise((resolve, reject) => {
  const list: OddzialType[] = [];
  axios
    .get('http://podzial.mech.pk.edu.pl/stacjonarne/html/lista.html')
    .then((res: any) => {
      const $ = cheerio.load(res.data);
      $('#oddzialy .el a')
        .toArray()
        .forEach((e: any, i: number) =>
          list.push({
            name: $(e).text(),
            link: $(e).attr('href'),
          }),
        );
      resolve(list);
    })
    .catch((e: any) => {
      console.error(1, e);
      reject([]);
    });
  return list;
});

//REDO: make async
//TODO clear the code
export const getData = (setDataState: any, oddzial: string) => {
  let src = '';
  getOdzialList
    .then((res: any) => (src = getOddzialURL(oddzial, res))) //-
    .then(r => {
      axios
        .get(`http://podzial.mech.pk.edu.pl/stacjonarne/html/${src}`)
        .then((response: {data: string}) => {
          const $ = cheerio.load(alterHTML(response.data));
          const hours = getHours($);
          const table = $('table');
          const data: any[] = [];

          table
            .find('table tbody tr td table tbody tr')
            .each((i: any, row: any) => {
              let rowData: any[] = [];
              if (i === 0) return;
              $(row).each((j: any, cell: any) => {
                $(cell)
                  .find('td.l')
                  .each((k: any, td: any) => {
                    const temp: any[] = [];
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
        }
      )
        .catch(err => console.error('#GET DATA:', err.message));
    });
};

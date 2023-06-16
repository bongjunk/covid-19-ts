import React from 'react';
import corona from '../../public/assets/data/corona.json';

export default function Home() {
  // const data = require('/public/assets/data/corona.json');

  // console.log(
  //   'data',
  //   data.map((el) => {
  //     console.log('el', el);
  //   }),
  // );
  console.log(
    'corona',
    corona.map((el) => {
      console.log('el', el);
    }),
  );

  const title = corona.map((el) => el.API.apiName);
  const updateTime = corona.map((el) => el.API.updateTime);

  console.log('title', title);
  return (
    <>
      <article className="w-full h-full">
        <div className="w-full h-20 bg-[#4D4BE9] flex items-center justify-center">
          <h1 className="text-white text-[1.5rem]">{title}</h1>
        </div>
        <div className="px-[7.75rem]">
          <div className="mt-16">
            <h2 className="font-bold text-[1.3rem] mb-2">국내현황</h2>
            <p>{updateTime}</p>
          </div>
          <table>
            <tbody>
              <tr>
                <td>
                  <p>확진환자</p>
                </td>
                <td>격리해제</td>
                <td>사망자</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

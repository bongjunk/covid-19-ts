import React from 'react';
import corona from '../../public/assets/data/domestic.json';
import province from '../../public/assets/data/data.json';

export default function Home() {
  const numReg = (num: number | any) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const region: string[] = [];

  Object.keys(province) && region.push(...Object.keys(province));

  console.log('region', region);

  region.map((el: string | any) => {
    // const ell: Record<string, number> = province[el];
    console.log('province[el]', province[el].countryName);
    console.log('el', el);
  });

  // for (let key in province) {
  //   province[key]
  // }

  // for (let key in province) {
  //   if (province[key].countryName !== un defined) {
  //     areaName.push({
  //       "kr": province[key].countryName,
  //       "en": key
  //     })
  //   }
  // }

  const title = corona.map((el: any) => el.API.apiName);
  const updateTime = corona.map((el: any) => el.API.updateTime);
  const total = corona.map((el: any) => el.korea.totalCnt);
  const qur = corona.map((el: any) => el.korea.qurRate);
  const death = corona.map((el: any) => el.korea.deathCnt);

  const areaChange = () => {
    console.log('123213');
  };

  console.log('title', title);
  return (
    <>
      <article className="w-full h-full">
        <div className="w-full h-20 bg-[#4D4BE9] flex items-center justify-center">
          <h1 className="text-white text-[1.5rem]">{title}</h1>
        </div>
        <div className="px-[7.75rem]">
          <div className="mt-16">
            <h2 className="font-bold text-[1.3rem] mb-3">국내현황</h2>
            <p className="text-[0.9rem]">{updateTime}</p>
          </div>
          <table className="w-full text-center">
            <tbody>
              <tr className="h-28">
                <td className="border-2 w-[33%]">
                  <p className="font-bold">확진환자({numReg(total)})</p>
                </td>
                <td className="border-2 w-[33%]">
                  <p className="font-bold">코로나19 발생률({numReg(qur)})</p>
                </td>
                <td className="border-2 w-[33%]">
                  <p className="font-bold">사망자({numReg(death)})</p>
                </td>
              </tr>
              <tr className="h-10 mt-4 bg-gray-100">
                <td className="border-2 w-[33%]">
                  <p className="text-[0.9rem]">일일확진자({numReg(total)})</p>
                </td>
                <td className="border-2 w-[33%]">
                  <p className="text-[0.9rem]">국내발생({numReg(qur)})</p>
                </td>
                <td className="border-2 w-[33%]">
                  <p className="text-[0.9rem]">해외유입({numReg(death)})</p>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-40">
            <h2 className="font-bold text-[1.3rem] mb-3">지역현황</h2>
            <div className=" bg-gray-100 py-5">
              <p>※ 원하시는 지역을 선택해주세요.</p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

// <select onChange={() => areaChange()}>
//   {corona.map((el) => {
//     return (
//       <option key={el.} value={el.}>
//         {el.kr}
//       </option>
//     );
//   })}
// </select>

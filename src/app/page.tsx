'use client';

import React, { useEffect, useState } from 'react';
import corona from '../../public/assets/data/domestic.json';
import province from '../../public/assets/data/data.json';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function Home() {
  const [data, setData] = useState<any>();
  const [city, setCity] = useState<string>('korea');
  const region: any[] = [];

  const numReg = (num: number | any) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  for (const key in province) {
    region.push({
      kr: province[key as keyof typeof province].countryName,
      en: key,
    });
  }

  // region.map((el: string) => {
  //   // const ell: Record<string, number> = province[el];
  //   // const name = <T extends object, U extends key of T>(key) => (obj:T ) => obj[key];
  //   const reg = province[el as keyof typeof province].countryName;
  //   options.push(reg);
  // });

  const title = corona.map((el: any) => el.API.apiName);
  const updateTime = corona.map((el: any) => el.API.updateTime);
  const total = corona.map((el: any) => el.korea.totalCnt);
  const qur = corona.map((el: any) => el.korea.qurRate);
  const death = corona.map((el: any) => el.korea.deathCnt);

  const areaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCity(value);
  };

  useEffect(() => {
    const totalCase = parseInt(
      province[city as keyof typeof province].totalCase.replaceAll(',', ''),
    );
    const newCase = province[city as keyof typeof province].newCase;
    const recovered = parseInt(
      province[city as keyof typeof province].recovered.replaceAll(',', ''),
    );
    const death = parseInt(
      province[city as keyof typeof province].death.replaceAll(',', ''),
    );
    const percentage = province[city as keyof typeof province].percentage;

    setData([
      {
        name: '확진자',
        인원: totalCase,
        추가: newCase,
      },
      {
        name: '완치자',
        인원: recovered,
      },
      {
        name: '사망자',
        인원: death,
      },
      {
        name: '발생률',
        인원: percentage,
      },
    ]);
  }, [city]);

  return (
    <>
      <article className="w-full h-full">
        <div className="w-full h-20 bg-[#4D4BE9] flex items-center justify-center">
          <h1 className="text-white text-[1.5rem]">{title}</h1>
        </div>
        <div className="desktop:px-[7.75rem] tablet:px-[5rem] mobile:px-[2.5rem]">
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
          <div className="w-full mt-40 text-center">
            <h2 className="font-bold text-[1.3rem] mb-3">지역현황</h2>
            <div className="border-2 bg-gray-100 p-14">
              <div>
                <select
                  onChange={areaChange}
                  className="border bg-white w-48 px-2 py-2"
                >
                  {region?.map((el: string | any, idx: number) => {
                    console.log('el', el, 'idx', idx);
                    return (
                      <option key={idx} value={el.en}>
                        {el.kr}
                      </option>
                    );
                  })}
                </select>
                <p className="mt-1 mb-5 text-sm">
                  ※ 원하시는 지역을 선택해주세요.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-full">
                  <p className="font-bold text-3xl">
                    {province[city as keyof typeof province]?.countryName}
                  </p>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <td className="border border-black font-bold py-2 px-10 w-[25%]">
                          확진자
                        </td>
                        <td className="border border-black font-bold py-2 px-10 w-[25%]">
                          완치자
                        </td>
                        <td className="border border-black font-bold py-2 px-10 w-[25%]">
                          사망자
                        </td>
                        <td className="border border-black font-bold py-2 px-10 w-[25%]">
                          발생률
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black p-2">
                          {province[city as keyof typeof province]?.totalCase}명
                          (+
                          {province[city as keyof typeof province]?.newCase})
                        </td>
                        <td className="border border-black p-2">
                          {province[city as keyof typeof province]?.recovered}명
                        </td>
                        <td className="border border-black p-2">
                          {province[city as keyof typeof province]?.death}명
                        </td>
                        <td className="border border-black p-2">
                          {numReg(
                            province[city as keyof typeof province]?.percentage,
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="text-center w-full h-[500px] my-10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="인원" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="추가" stackId="a" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

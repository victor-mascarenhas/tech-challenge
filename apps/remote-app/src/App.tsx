import React from "react";
import PieChartComponent from "./PieChart";


const InvestimentsApp: React.FC = () => {

  return (
    <>
      <div className="flex relative max-sm:flex-col w-full bg-fiap-light-gray rounded-[8px]">
        <div className="z-20 px-8 py-6 w-full h-auto">
          <div className="flex flex-col pb-8">
            <h2 className="text-lg text-black font-bold pb-5">Investimentos</h2>

            <span className="text-fiap-navy-blue text-2xl pb-8">Total: R$ 50.000,00</span>

            <div className="flex max-sm:flex-col w-full gap-6">
              <div className="flex flex-col justify-center items-center h-24 rounded bg-fiap-navy-blue w-full gap-2">
                <span className="text-base text-white">Renda fixa</span>
                <span className="text-xl text-white">R$ 36.000,00</span>
              </div>

              <div className="flex flex-col justify-center items-center h-24 rounded bg-fiap-navy-blue w-full gap-2">
                <span className="text-base text-white">Renda variável</span>
                <span className="text-xl text-white">R$ 14.000,00</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col pt-14">
            <h2 className="text-xl text-black pb-5">Estatísticas</h2>

            <div className="rounded bg-fiap-navy-blue">
            <PieChartComponent/>
            </div>
          </div>
        </div>

        <img
          className="absolute top-0 right-0"
          src="/pixels-nova-transacao.svg"
          width={180}
          height={177}
          alt="pixels"
        />
        <img className="absolute bottom-0" src="/pixels-nova-transacao.svg" width={180} height={177} alt="pixels" />
      </div>
    </>
  );
};

export default InvestimentsApp;




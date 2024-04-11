import React, { useState } from "react";
import expandMore from "../../assets/Laporkan/expand_more.svg";

const FAQItem = ({ idx, question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <li className="bg-greenMain text-[#FCDC2A] md:px-8 pl-2 py-3 shadow-md md:mt-4 mt-1 rounded-t-lg" onClick={handleClick}>
        <h2 className="flex justify-between items-center font-semibold p-3 cursor-pointer text-secondary">
          <span className="2xl:text-2xl lg:text-body sm:text-[18px] w-4/5 text-normal">{question}</span>
          <img src={expandMore} alt="expandMore" className={`md:w-8 w-6 transform transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
        </h2>
      </li>
      <div className={`border-l-2 border-greenMain md:pl-8 pl-4 mb-4 rounded-b-lg  border-greenuin overflow-hidden max-h-0 duration-500 transition-all  text-black  ${isOpen ? "max-h-screen sm:p-8 p-4 text-black bg-[#CEFFEF]" : ""}`}>
        <p className="2xl:text-2xl lg:text-body sm:text-[18px] text-normal font-semibold">{answer}</p>
      </div>
    </div>
  );
};

const Faq = () => {
  const faqData = [
    {
      question: "Ecotection itu web apa?",
      answer: "Ecotection adalah web dimana anda bisa melihat dan memberi laporan tentang kerusakan alam disekitar anda.",
    },
    {
      question: "Laporan seperti apa saja yang bisa saya laporkan?",
      answer: "Anda bisa melaporkan yang mencakup kekerasan pada hewan, penjualan hewan ilegal, sampah, polusi, penebangan liar, dan penebangan liar.",
    },
    {
      question: "Saya ingin melaporkan, tapi takut akan keamanan saya apabila ada pelaku yang melihat laporan dari saya.",
      answer: "Tidak perlu khawatir, kami menyediakan opsi untuk merahasiakan identitas ketika anda melaporkan dengan cara memilih opsi 'Private'.",
    },
    {
      question: "Seberapa jauh jangkauan kami bisa melakukan laporan?",
      answer: "Laporan akan diterima dari seluruh Indonesia. Selama anda masih berada di wilayah Indonesia, jangan ragu untuk melaporkannya!",
    },
  ];

  return (
    <section>
      <div className="sm:p-20 p-4 mb-32">
        <div className="2xl:translate-y-[-220px] sm:translate-y-[-120px] translate-y-[-10px]">
          <div>
            <h2 className="2xl:text-headline2 md:text-[48px] text-3xl  font-extrabold  md:mb-10 mb-4 text-center md:leading-normal leading-normal">Frequently Asked Questions</h2>
            <div className="flex justify-center items-start">
              <div className="w-[1000px]">
                <ul className="flex flex-col">
                  {faqData.map((item, idx) => (
                    <FAQItem key={idx} idx={idx + 1} question={item.question} answer={item.answer} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;

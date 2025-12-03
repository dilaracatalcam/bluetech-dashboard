 import Navigation from "../components/Navigation.jsx";
 import { useState } from "react";

 
 function Home() {

  const [input1, setInput1] = useState(""); //input değerlerini tutacak stateler
  const [input2, setInput2] = useState("");

  const [lastJson, setLastJson] = useState(null); //json verisi örneğini göstermek için state (debug)

  const handleSend = (type) => { //json oluşturma fonksiyonu
    const jsonData = {
      commandtype: type,
      message: type === "send" ? input1 : input2,
      data: null,
    };

    console.log("JSON verisi:", jsonData);
    setLastJson(jsonData); //debug için json verisini state'e kaydet
    
  }

  return (
   <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex flex-col items-center justify-center flex-1 py-12">
        <h1 className="text-4xl font-bold mb-10">Input Paneli</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Input 1 */}
          <div className="flex flex-col items-center">
            <label className="text-lg mb-2">Input 1</label>
            <input
              type="text"
              placeholder="Metin giriniz..."
              className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded mt-4 hover:bg-blue-700 transition">
              Gönder
            </button>
          </div>
           {/* Input 2 */}
          <div className="flex flex-col items-center">
            <label className="text-lg mb-2">Input 2</label>
            <input
              type="text"
              placeholder="Metin giriniz..."
              className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button className="bg-green-600 text-white px-6 py-2 rounded mt-4 hover:bg-green-700 transition">
              Oku
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
export default Home
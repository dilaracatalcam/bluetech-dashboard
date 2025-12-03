 import Navigation from "../components/Navigation.jsx";
 import { useState } from "react";

 
 function Home() {

  const [input1, setInput1] = useState(""); //input değerlerini tutacak stateler
  const [input2, setInput2] = useState("");

  const [lastJson, setLastJson] = useState(null); //json verisi örneğini göstermek için state (debug)

  const [mac, setMac] =useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMacSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/update-target', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newTarget: mac })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(` Hata: ${data.error || 'Sunucu hatası'}`);
      } else {
        setMessage(` Başarılı! Yeni hedef: ${data.newTarget}`);
        setMac('');
      }
    }catch (err) {
      console.error(err);
      setMessage('Sunucuya ulaşılamadı.');
    } finally {
      setLoading(false);
    }
  };

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

        <form
          onSubmit={handleMacSubmit}
          className="bg-white shadow-xl rounded-2xl p-6 w-96 border border-gray-200 mb-10"
        >
          <input
            type="text"
            value={mac}
            onChange={(e) => setMac(e.target.value)}
            placeholder="AA:BB:CC:DD:EE:FF"
            className="w-full border p-2 rounded mb-3 text-center"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-70"
          >
            {loading ? 'Gönderiliyor...' : 'Bağlan'}
          </button>
        </form>

        {message && (
          <p
            className={`text-sm mb-8 ${
               message.startsWith("") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
          

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
        
        {/* Debug: JSON çıktısı */}
        {lastJson && (
          <pre className="mt-10 text-sm bg-gray-100 p-4 rounded border border-gray-300 w-[400px]">
            {JSON.stringify(lastJson, null, 2)}
          </pre>
        )}

      </main>
    </div>
  )
}
export default Home
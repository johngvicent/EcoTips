import { useState, useEffect } from 'react';
import { WASTE_DATA } from '../constants';
import { motion } from 'framer-motion';
import { FaSearch, FaRecycle } from 'react-icons/fa';

const WasteSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [bgColor, setBgColor] = useState('bg-white dark:bg-gray-900');

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setBgColor('bg-white dark:bg-gray-900');
      return;
    }

    const filtered = WASTE_DATA.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);

    if (filtered.length > 0) {
      setBgColor(filtered[0].color.replace('bg-', 'bg-').replace('-500', '-100') + ' dark:bg-gray-900');
    } else {
      setBgColor('bg-white dark:bg-gray-900');
    }
  }, [query]);

  return (
    <motion.div
      className={`min-h-screen transition-colors duration-500 ${bgColor}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          <FaSearch className="inline mr-2" />
          Buscador de Residuos
        </h2>
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Escribe un objeto (ej. Bombilla)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
        {results.length > 0 && (
          <motion.div
            className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {results.map((item, index) => (
              <div key={index} className="text-center">
                <div className={`inline-block w-16 h-16 rounded-full ${item.color} mb-4 flex items-center justify-center`}>
                  <FaRecycle className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  Contenedor: {item.container}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{item.tip}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default WasteSearch;
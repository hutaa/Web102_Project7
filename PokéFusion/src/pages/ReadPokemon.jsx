// import React, { useEffect, useState } from 'react';
// import PokeCard from '../components/PokeCard';
// import { supabase } from '../client';

// const ReadPokemon = () => {
//   const [pokemonList, setPokemonList] = useState([]);

//   useEffect(() => {
//     const fetchPokemon = async () => {
//         const { data, error } = await supabase
//             .from('Pokemon')
//             .select('*')
//             .order('created_at', { ascending: false });

//         console.log("Fetched Pokémon:", data); // 👀 Add this
//         if (error) console.error("Error fetching Pokémon:", error);
//         else setPokemonList(data);
//     };
//     fetchPokemon();
//   }, []);

//   const handleEdit = (id) => {
//     window.location.href = `/edit/${id}`;
//   };

//   const handleDelete = async (id) => {
//     const { error } = await supabase.from('Pokemon').delete().eq('id', id);
//     if (!error) setPokemonList(pokemonList.filter(p => p.id !== id));
//   };

//   return (
//     <div className="pokemon-list">
//       <h1>Your PokéFusion Team</h1>
//       <div className="card-grid">
//         {pokemonList.map(pokemon => (
//           <PokeCard
//             key={pokemon.id}
//             pokemon={pokemon}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ReadPokemon;

import React, { useEffect, useState } from 'react';
import { supabase } from '../client'; // ✅ adjust path if needed
import PokeCard from '../components/PokeCard';
import './ReadPokemon.css'; // ✅ your CSS

const ReadPokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      const { data, error } = await supabase
        .from('Pokemon') // ✅ use exact table name
        .select() // OR .select('*')
        .order('created_at', { ascending: false });

      console.log("Fetched Pokémon:", data); // ✅ DEBUG

      if (error) {
        console.error("Error fetching Pokémon:", error.message);
      } else {
        setPokemonList(data);
      }

      setLoading(false);
    };

    fetchPokemon();
  }, []);

  const handleEdit = (id) => {
    window.location.href = `/edit/${id}`;
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('Pokemon').delete().eq('id', id);
    if (error) {
      console.error("Delete error:", error.message);
    } else {
      setPokemonList(pokemonList.filter(p => p.id !== id));
    }
  };

  return (
    <div className="pokemon-list">
      <h1>Your PokéFusion Team</h1>

      {loading ? (
        <p>Loading...</p>
      ) : pokemonList.length === 0 ? (
        <p>No Pokémon found! Try creating one.</p>
      ) : (
        <div className="card-grid">
          {pokemonList.map((pokemon) => (
            <PokeCard
              key={pokemon.id}
              pokemon={pokemon}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadPokemon;

